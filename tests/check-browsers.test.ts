/* eslint-env jest */
import { expect } from 'chai';
import { prepareData } from '../src/utils/prepare-data';
import { performanceObject } from './utils/performanceObject';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
const browsers = {
  opera: 'OPR/',
  chrome:'(KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
  EdgeChromium: 'Edg',
  Ie: 'IE',
  Firefox: 'Firefox/88.0',
  None: ''
}

let agent : any;
let windowContext: any;


beforeEach(() => {
  agent = jest.spyOn(window.navigator, 'userAgent', 'get');
  windowContext = window;
  if (window.frameElement &&
    window.frameElement.getAttribute('tiledesk_context') === 'parent') {
    windowContext = window.parent;
  }

  global.window = windowContext;
  global.navigator = windowContext.navigator;
  global.document = windowContext.document;
})

afterEach(() => {
   windowContext = null;
})
describe('Browsers : ', () => {
  it('Safari', () => {
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('Safari');
    windowContext.safari = null;
  });

  it('Firefox', () => {
    agent.mockReturnValue(browsers.Firefox);
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('Firefox');
  });
  it('Opera', () => {
    agent.mockReturnValue(browsers.opera);
    windowContext.opera = "opera";
    global.window = windowContext;
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('Opera');
    windowContext.opera = null;
  });

  it('Chrome', () => {
    agent.mockReturnValue(browsers.chrome);
    windowContext.chrome = {webstore:true};
    global.window = windowContext;
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('Chrome');
  });

  it('EdgeChromium', () => {
    agent.mockReturnValue(browsers.EdgeChromium);
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('EdgeChromium');
    windowContext.chrome = false;
  });

  it('Edge', () => {
    agent.mockReturnValue(browsers.Ie);
    windowContext.HTMLElement = "";
    windowContext.StyleMedia = true;
    global.window = windowContext;
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('Edge');
  });

  it('IE', () => {
    agent.mockReturnValue(browsers.Ie);
    windowContext.StyleMedia = false;
    global.window = windowContext;
    windowContext.document.documentMode = true;
    global.document = windowContext.document;
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('IE');
  });

  it('Undefined', () => {
    agent.mockReturnValue(browsers.None);
    global.window = windowContext;
    windowContext.document.documentMode = false;
    global.document = windowContext.document;
    const result = prepareData(performanceObject());
    expect(result.browser).to.be.equal('undefined');
  });
});
