/* eslint-env jest */
import {
  expect
} from 'chai';

import prepareData  from '../../src/utils/prepare-data';
import performanceObject from './performanceObject';

describe('Prepare data - ', function() {
  it('Performance object null', function() {

    const result = prepareData(null);
    expect(result).to.equal(false);
  });

  it('Performance object not null', function() {
    const result = prepareData(performanceObject());
    expect(result).to.be.not.equal(false);
  });
});
