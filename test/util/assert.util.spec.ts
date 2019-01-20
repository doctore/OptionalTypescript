import { AssertUtil } from '../../src/util/assert.util';
import { IllegalAccessError } from '../../src/error/illegal-access.error';
import {IllegalArgumentError} from '../../src/error/illegal-argument.error';

describe('AssertUtil', () => {

  it('constructor: when trying to create a new instance then an exception is thrown', () => {
    expect(() => new AssertUtil()).toThrowError(IllegalAccessError);
  });

  it('notNullOrUndefined: when a null/undefined value is passed as parameter then an exception is thrown', () => {
    expect(() => AssertUtil.notNullOrUndefined(null)).toThrowError(IllegalArgumentError);
    expect(() => AssertUtil.notNullOrUndefined(undefined)).toThrowError(IllegalArgumentError);
  });

  it('notNullOrUndefined: when a valid value is passed as parameter then this one is returned', () => {
    // Given
    const numberForTesting = 10;
    const stringForTesting = 'ForTestPurpose';
    const objectForTesting = { name: 'ForTestPurpose' };

    // When/Then
    expect(AssertUtil.notNullOrUndefined(numberForTesting)).toEqual(numberForTesting);
    expect(AssertUtil.notNullOrUndefined(stringForTesting)).toEqual(stringForTesting);
    expect(AssertUtil.notNullOrUndefined(objectForTesting)).toEqual(objectForTesting);
  });

  it('notNull: when a null value is passed as parameter then an exception is thrown', () => {
    // Given
    const errorMessage = 'There is an error';

    // When/Then
    expect(() => AssertUtil.notNull(null)).toThrowError(IllegalArgumentError);
    expect(() => AssertUtil.notNull(null, errorMessage)).toThrowError(IllegalArgumentError, errorMessage);
  });

  it('notNull: when a non null value is passed as parameter then this one is returned', () => {
    // Given
    const numberForTesting = 10;
    const stringForTesting = 'ForTestPurpose';
    const objectForTesting = { name: 'ForTestPurpose' };

    // When/Then
    expect(AssertUtil.notNull(numberForTesting)).toEqual(numberForTesting);
    expect(AssertUtil.notNull(stringForTesting)).toEqual(stringForTesting);
    expect(AssertUtil.notNull(objectForTesting)).toEqual(objectForTesting);
  });

  it('notUndefined: when an undefined value is passed as parameter then an exception is thrown', () => {
    // Given
    const errorMessage = 'There is an error';

    // When/Then
    expect(() => AssertUtil.notUndefined(undefined)).toThrowError(IllegalArgumentError);
    expect(() => AssertUtil.notUndefined(undefined, errorMessage)).toThrowError(IllegalArgumentError, errorMessage);
  });

  it('notUndefined: when a valid value is passed as parameter then this one is returned', () => {
    // Given
    const numberForTesting = 10;
    const stringForTesting = 'ForTestPurpose';
    const objectForTesting = { name: 'ForTestPurpose' };

    // When/Then
    expect(AssertUtil.notUndefined(numberForTesting)).toEqual(numberForTesting);
    expect(AssertUtil.notUndefined(stringForTesting)).toEqual(stringForTesting);
    expect(AssertUtil.notUndefined(objectForTesting)).toEqual(objectForTesting);
  });

});
