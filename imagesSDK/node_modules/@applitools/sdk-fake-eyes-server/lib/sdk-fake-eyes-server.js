'use strict'

const {promisify} = require('util')
const express = require('express')
const UAParser = require('ua-parser-js')
const fs = require('fs')
const path = require('path')
const filenamify = require('filenamify')
const uuid = require('uuid/v4')
const fetch = require('node-fetch')

function fakeEyesServer({expectedFolder, updateFixtures, port, logger = console, hangUp} = {}) {
  const runningSessions = {}
  let serverUrl
  let renderCounter = 0
  const renderings = {}
  const resources = {}

  const app = express()
  const jsonMiddleware = express.json()
  const rawMiddleware = express.raw({limit: '100MB'})

  app.use((req, _res, next) => {
    if (hangUp) {
      req.socket.destroy()
    } else {
      next()
    }
  })

  // renderInfo
  app.get('/api/sessions/renderinfo', (_req, res) => {
    res.send({
      serviceUrl: serverUrl,
      accessToken: 'access-token',
      resultsUrl: `${serverUrl}/api/resources/__random__`,
    })
  })

  // render
  app.post('/render', jsonMiddleware, (req, res) => {
    res.send(
      req.body.map(renderRequest => {
        const renderId = renderRequest.renderId || `r${renderCounter++}`
        renderings[renderId] = renderRequest
        return {
          renderId,
          renderStatus: renderRequest.renderId ? 'rendering' : 'need-more-resources',
          needMoreDom: !renderRequest.renderId,
        }
      }),
    )
  })

  // render status
  app.post('/render-status', jsonMiddleware, (req, res) => {
    res.send(
      req.body.map(renderId => {
        const rendering = renderings[renderId]
        if (rendering) {
          const regions = rendering.selectorsToFindRegionsFor || []
          return {
            status: 'rendered',
            imageLocation: `imageLoc_${renderId}`,
            domLocation: `domLoc_${renderId}`,
            selectorRegions: regions.map(() => ({x: 1, y: 2, width: 3, height: 4})),
          }
        }
      }),
    )
  })

  // put resource
  app.put('/resources/sha256/:hash', rawMiddleware, (_req, res) => {
    res.send({success: true})
  })

  app.get('/user-agents', (_req, res) => {
    res.send({
      chrome: 'chrome-ua',
      'chrome-1': 'chrome-1-ua',
      'chrome-2': 'chrome-2-ua',
      firefox: 'firefox-ua',
      'firefox-1': 'firefox-1-ua',
      'firefox-2': 'firefox-2-ua',
      safari: 'safari-ua',
      'safari-2': 'safari-2-ua',
      'safari-1': 'safari-1-ua',
      edge: 'edge-ua',
      ie: 'ie-ua',
      ie10: 'ie10-ua',
    })
  })

  // matchSingleWindow
  app.post('/api/sessions', jsonMiddleware, (req, res) => {
    const {startInfo, appOutput} = req.body
    const runningSession = createRunningSessionFromStartInfo(startInfo)
    runningSession.steps = [{asExpected: true, appOutput}] // TODO
    runningSessions[runningSession.id] = runningSession
    res.set(
      'location',
      `${serverUrl}/api/tasks/matchsingle/${encodeURIComponent(runningSession.id)}`,
    )
    res.status(202).send({success: true})
  })

  app.get('/api/tasks/:method/:id', (req, res) => {
    res.set(
      'location',
      `${serverUrl}/api/tasks/${req.params.method}/${encodeURIComponent(req.params.id)}`,
    )
    res.status(201).send({success: true})
  })

  app.delete('/api/tasks/:method/:id', (req, res) => {
    const runningSessionId = decodeURIComponent(req.params.id)
    const runningSession = runningSessions[runningSessionId]
    const testResults = createTestResultFromRunningSession(runningSession)
    res.send(testResults)
  })

  // startSession
  app.post('/api/sessions/running', jsonMiddleware, (req, res) => {
    try {
      const runningSession = createRunningSessionFromStartInfo(req.body.startInfo)
      runningSessions[runningSession.id] = runningSession

      const {id, sessionId, batchId, baselineId, url} = runningSession
      res.send({id, sessionId, batchId, baselineId, url})
    } catch (ex) {
      logger.log('bad request for startSession', ex.message)
      res.status(400).send(ex.message)
    }
  })

  function createRunningSessionFromStartInfo(startInfo) {
    const {appIdOrName, scenarioIdOrName, batchInfo, environment} = startInfo
    const {displaySize: _displaySize, inferred} = environment
    const {id: batchId, name: _batchName} = batchInfo
    const {browser, os} = UAParser(inferred)

    const sessionId = `${appIdOrName}__${scenarioIdOrName}`
    const runningSessionId = `${sessionId}__running`
    const baselineId = `${sessionId}__baseline`
    const url = `${sessionId}__url`

    return {
      id: runningSessionId,
      startInfo: startInfo,
      baselineId,
      sessionId,
      url,
      steps: [],
      hostOS: `${os.name}${os.version ? `@${os.version}` : ''}`,
      hostApp: `${browser.name}@${browser.major}`,
      batchId,
    }
  }

  // postDomSnapshot
  app.post('/api/sessions/running/data', rawMiddleware, (req, res) => {
    const id = uuid()
    resources[id] = req.body
    res.set('location', `${serverUrl}/api/resources/${id}`)
    res.send({success: true})
  })

  app.put('/api/resources/:id', rawMiddleware, (req, res) => {
    resources[req.params.id] = req.body
    res.status(201).send()
  })

  app.get('/api/resources/:id', (req, res) => {
    const resource = resources[req.params.id]
    if (!resource) {
      res.status(404).send()
    } else {
      res.send(resource)
    }
  })

  // matchWindow
  app.post(
    '/api/sessions/running/:id',
    (req, res, next) => {
      if (req.headers['content-type'] === 'application/octet-stream') {
        return rawMiddleware(req, res, next)
      } else {
        return jsonMiddleware(req, res, next)
      }
    },
    async (req, res) => {
      const runningSession = runningSessions[req.params.id]
      const {steps, hostOS, hostApp} = runningSession
      const {matchWindowData, screenshot} = await getMatchWindowDataFromRequest(req)
      logger.log('matchWindowData', matchWindowData)
      const {appOutput: _appOutput} = matchWindowData

      const expectedPath = path.resolve(
        expectedFolder,
        `${filenamify(`${req.params.id}__${hostOS}__${hostApp}`)}.png`,
      )

      if (updateFixtures) {
        logger.log('[sdk-fake-eyes-server] updating fixture at', expectedPath)
        fs.writeFileSync(expectedPath, screenshot)
      }

      const expectedBuff = fs.readFileSync(expectedPath)
      const asExpected = screenshot.compare(expectedBuff) === 0
      steps.push({matchWindowData, asExpected})
      res.send({asExpected})
    },
  )

  async function getMatchWindowDataFromRequest(req) {
    if (Buffer.isBuffer(req.body)) {
      const buff = req.body
      const len = buff.slice(0, 4).readUInt32BE()
      const matchWindowData = JSON.parse(buff.slice(4, len + 4))
      const screenshot = buff.slice(len + 4)
      return {matchWindowData, screenshot}
    } else {
      const {appOutput} = req.body
      const {screenshotUrl} = appOutput
      const screenshot = await fetch(screenshotUrl).then(r => r.buffer())
      return {matchWindowData: req.body, screenshot}
    }
  }

  // for testing purposes
  app.get('/api/sessions/running/:id', jsonMiddleware, (req, res) => {
    const runningSession = runningSessions[req.params.id]

    if (runningSession) {
      res.send(runningSession)
    } else {
      res.status(404).send()
    }
  })

  // stopSession
  app.delete('/api/sessions/running/:id', (req, res) => {
    const {aborted: _aborted, updateBaseline: _updateBaseline} = req.query
    const runningSession = runningSessions[req.params.id]

    res.send(createTestResultFromRunningSession(runningSession))
  })

  function createTestResultFromRunningSession(runningSession) {
    const status = runningSession.steps.every(x => !!x.asExpected)
      ? 'Passed' // TestResultsStatus.Passed
      : 'Failed' //TestResultsStatus.Failed
    // TODO TestResultsStatus.Unresolved

    const stepsInfo = runningSession.steps.map(({matchWindowData, asExpected}) => {
      return {
        name: matchWindowData.tag,
        isDifferent: asExpected,
        hasBaselineImage: true,
        hasCurrentImage: true,
        apiUrls: {
          currentImage: matchWindowData.appOutput.screenshotUrl,
        },
      }
    })
    return {
      name: runningSession.startInfo.scenarioIdOrName,
      secretToken: 'bla',
      id: runningSession.id, // TODO runningSession.sessionId, but then how do we query the server for data based on test results? it only has running sessions. We'd need to copy those into sessions. Should we just have the same sessionId and id?
      status,
      appName: runningSession.startInfo.appIdOrName,
      baselineId: runningSession.baselineId,
      batchName: runningSession.startInfo.batchName,
      batchId: runningSession.startInfo.batchId,
      hostOS: runningSession.hostOS,
      hostApp: runningSession.hostApp,
      hostDisplaySize: runningSession.startInfo.environment.displaySize || {width: 7, height: 8},
      startedAt: runningSession.startedAt, // TODO
      isNew: false, // TODO
      isDifferent: false, // TODO
      isAborted: false, // TODO
      defaultMatchSettings: runningSession.startInfo.defaultMatchSettings,
      appUrls: [], // TODO
      apiUrls: [], // TODO
      stepsInfo,
      steps: stepsInfo.length,
      matches: 0, // TODO
      mismatches: 0, // TODO
      missing: 0, // TODO
      new: 0, // TODO
      exactMatches: 0, // TODO
      strictMatches: 0, // TODO
      contentMatches: 0, // TODO
      layoutMatches: 0, // TODO
      noneMatches: 0, // TODO
    }
  }

  return new Promise(resolve => {
    const server = app.listen(port || 0, () => {
      const serverPort = server.address().port
      logger.log('fake eyes server listening on port', serverPort)
      const close = promisify(server.close.bind(server))
      serverUrl = `http://localhost:${serverPort}`
      resolve({port: serverPort, close})
    })
  })
}

module.exports = fakeEyesServer
