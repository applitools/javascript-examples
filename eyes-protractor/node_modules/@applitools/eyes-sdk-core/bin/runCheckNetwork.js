#!/usr/bin/env node
/* eslint-disable no-console */

'use strict'

const {makeCheckNetwork} = require('../lib/troubleshoot/checkNetwork')
const checkNetwork = makeCheckNetwork({})
checkNetwork()
