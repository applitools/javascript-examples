/* global expect */

import { mount } from 'avoriaz'
import Bar from 'src/components/Bar'

var renderId = 0;
function takeScreenshot(file) {
    // check if we are in PhantomJS
    if (window.top.callPhantom === undefined) return;

    var options = {type: 'render'};
    // if the file argument is defined, we'll save the file in the path defined eg: `fname: '/tmp/myscreen.png'
    // otherwise we'll save it in the default directory with a progressive name
    options.fname = file || '.tmp/screenshots/' + 'Bar.vue' + (renderId++) + '.png';

    // this calls the onCallback function of PhantomJS, the type: 'render' will trigger the screenshot script
    window.top.callPhantom(options);
}

describe('Bar.vue', () => {
  it('renders a div with class bar', () => {
    const wrapper = mount(Bar)
    expect(wrapper.is('div')).toBe(true)
    expect(wrapper.hasClass('bar')).toBe(true)
    takeScreenshot()
  })

  it('renders 4 list elements inside .parent-ul', () => {
    const wrapper = mount(Bar)
    const listElements = wrapper.find('.parent-ul li')
    expect(listElements.length).toEqual(4)
    takeScreenshot()
  })

  it('renders 2 list elements as direct descendants of .parent-ul', () => {
    const wrapper = mount(Bar)
    const listElements = wrapper.find('.parent-ul > li')
    expect(listElements.length).toEqual(2)
    takeScreenshot()
  })

  it('.child-ul has color style set to red', () => {
    const wrapper = mount(Bar)
    const childUl = wrapper.find('.child-ul')[0]
    expect(childUl.hasStyle('color', 'red')).toBe(true)
    takeScreenshot()
  })
})
