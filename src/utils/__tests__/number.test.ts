import { isNumber } from '../number';

describe('isNumber', function () {
  describe('should check from input value of any', function () {
    it.each`
      input        | result
      ${0}         | ${true}
      ${1}         | ${true}
      ${10}        | ${true}
      ${112.456}   | ${true}
      ${1e3}       | ${true}
      ${0.3}       | ${true}
      ${{}}        | ${false}
      ${NaN}       | ${false}
      ${undefined} | ${false}
      ${null}      | ${false}
      ${''}        | ${false}
      ${true}      | ${false}
      ${[]}        | ${false}
      ${'text'}    | ${false}
    `('and return true if value is number', ({ input, result }) => {
      expect(isNumber(input)).toEqual(result);
    });
  });
});
