/* eslint-env jest */
import { expect } from 'chai';
import { prepareData } from '../src/utils/prepare-data';
import { performanceObject } from './utils/performanceObject';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

let windowContext: any = window;
  if (window.frameElement &&
   window.frameElement.getAttribute('tiledesk_context') === 'parent') {
    windowContext = window.parent;
  }

global.window = windowContext;
global.navigator = windowContext.navigator;


describe('Prepare data : ', () => {
  it('Performance object null', () => {
    expect(() => prepareData(null)).to.throw();
  });

  it('Performance object not null', () => {
    const result = prepareData(performanceObject());
    expect(result).to.be.not.equal(false);
  });
});
