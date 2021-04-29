/* eslint-env jest */
import { expect } from 'chai';
import { prepareData } from '../src/utils/prepare-data';
import { performanceObject } from './utils/performanceObject';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
const userAgents = {
  desktop: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
  tablet: 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1',
  phone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
}

let agent : any;
let windowContext: any = window;
if (window.frameElement &&
  window.frameElement.getAttribute('tiledesk_context') === 'parent') {
  windowContext = window.parent;
}

global.window = windowContext;
global.navigator = windowContext.navigator;

beforeEach(() => {
  agent = jest.spyOn(window.navigator, 'userAgent', 'get');
})

describe('Devices : ', () => {
  it('Phone', () => {
    agent.mockReturnValue(userAgents.phone);
    const result = prepareData(performanceObject());
    expect(result.device).to.be.equal('phone');
  });

  it('Tablet', () => {
    agent.mockReturnValue(userAgents.tablet);
    const result = prepareData(performanceObject());
    expect(result.device).to.be.equal('tablet');
  });

  it('Desktop', () => {
    agent.mockReturnValue(userAgents.desktop);
    const result = prepareData(performanceObject());
    expect(result.device).to.be.equal('desktop');
  });
});
