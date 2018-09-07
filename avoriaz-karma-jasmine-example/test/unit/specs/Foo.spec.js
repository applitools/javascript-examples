/* global expect */

import Foo from 'src/components/Foo'
import Bar from 'src/components/Bar'
import { mount } from 'avoriaz'

var renderId = 0;
function takeScreenshot(file) {
    // check if we are in PhantomJS
    if (window.top.callPhantom === undefined) return;

    var options = {type: 'render'};
    // if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
    // otherwise we'll save it in the default directory with a progressive name
    options.fname = file || '.tmp/screenshots/' + 'Foo.vue' + (renderId++) + '.png';

    // this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
    window.top.callPhantom(options);
}

describe('Foo.vue', () => {
  it('renders an h1', () => {
    const wrapper = mount(Foo)
    expect(wrapper.find('h1').length).toEqual(1)
  })

  it('h1 renders data.msg as text', () => {
    const wrapper = mount(Foo)
    const msg = wrapper.data().msg
    expect(wrapper.find('h1')[0].text()).toEqual(msg)
    takeScreenshot()
  })

  it('h1 text changes when button is clicked', () => {
    const expectedMessage = 'new message'

    const wrapper = mount(Foo)
    const button = wrapper.find('#change-message')[0]
    button.dispatch('click')

    expect(wrapper.find('h1')[0].text()).toEqual(expectedMessage)
    takeScreenshot()
  })

  it('renders a message that equals prop msg2', () => {
    const msg2 = 'test message'
    const wrapper = mount(Foo, { propsData: { msg2 } })
    const text = wrapper.find('p')[0].text()
    expect(text).toEqual(msg2)
    takeScreenshot()
  })

  it('renders Bar', () => {
    const wrapper = mount(Foo)
    const bar = wrapper.find(Bar)[0]
    expect(bar.is(Bar)).toEqual(true)
    takeScreenshot()
  })
})
