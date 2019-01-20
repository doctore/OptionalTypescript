import { Optional } from '../../src/type/optional.type';
import { IllegalArgumentError } from '../../src/error/illegal-argument.error';

describe('Optional', () => {
  const numberForTesting = 10;
  const stringForTesting = 'ForTestPurpose';
  const objectForTesting = { name: 'ForTestPurpose' };

  it('empty: then an Optional with no value is given', () => {
    expect(Optional.empty().isPresent()).toBeFalsy();
  });

  it('of: when null/undefined is given then an exception is thrown', () => {
    expect(() => Optional.of(null)).toThrowError(IllegalArgumentError);
    expect(() => Optional.of(undefined)).toThrowError(IllegalArgumentError);
  });

  it('of: when a valid value is given then no exception is thrown', () => {
    expect(() => Optional.of(numberForTesting)).not.toThrowError();
    expect(() => Optional.of(stringForTesting)).not.toThrowError();
    expect(() => Optional.of(objectForTesting)).not.toThrowError();
  });

  it('ofNullable: when null/undefined is given then the result is equal to Optional.empty', () => {
    expect(Optional.ofNullable(null)).toEqual(Optional.empty());
    expect(Optional.ofNullable(undefined)).toEqual(Optional.empty());
  });

  it('ofNullable: when a valid value is given then the result is equal to Optional.of', () => {
    expect(Optional.ofNullable(numberForTesting)).toEqual(Optional.of(numberForTesting));
    expect(Optional.ofNullable(stringForTesting)).toEqual(Optional.of(stringForTesting));
    expect(Optional.ofNullable(objectForTesting)).toEqual(Optional.of(objectForTesting));
  });

  it('equals: when empty optionals are given then they are equals', () => {
    expect(Optional.empty().equals(Optional.empty())).toBeTruthy();
  });

  it('equals: when an empty and not empty optionals are given then they are not equals', () => {
    expect(Optional.empty().equals(Optional.of(numberForTesting))).toBeFalsy();
    expect(Optional.of(numberForTesting).equals(Optional.empty())).toBeFalsy();

    expect(Optional.empty().equals(Optional.of(stringForTesting))).toBeFalsy();
    expect(Optional.of(stringForTesting).equals(Optional.empty())).toBeFalsy();

    expect(Optional.empty().equals(Optional.of(objectForTesting))).toBeFalsy();
    expect(Optional.of(objectForTesting).equals(Optional.empty())).toBeFalsy();
  });

  it('equals: when null/undefined is compared with an optional then they are not equals', () => {
    // @ts-ignore
    expect(Optional.empty().equals(null)).toBeFalsy();
    // @ts-ignore
    expect(Optional.empty().equals(undefined)).toBeFalsy();
    // @ts-ignore
    expect(Optional.of(stringForTesting).equals(null)).toBeFalsy();
    // @ts-ignore
    expect(Optional.of(objectForTesting).equals(undefined)).toBeFalsy();
  });

  it('equals: when different valid values are compared then they are not equals', () => {
    // Given
    const numberForTestingV2 = numberForTesting + 1;
    const stringForTestingV2 = stringForTesting + '2';
    const objectForTestingV2 = { ...objectForTesting, 'age': 12 };

    // When/Then
    expect(Optional.of(numberForTesting).equals(Optional.of(numberForTestingV2))).toBeFalsy();
    expect(Optional.of(numberForTestingV2).equals(Optional.of(numberForTesting))).toBeFalsy();

    expect(Optional.of(stringForTesting).equals(Optional.of(stringForTestingV2))).toBeFalsy();
    expect(Optional.of(stringForTestingV2).equals(Optional.of(stringForTesting))).toBeFalsy();

    expect(Optional.of(objectForTesting).equals(Optional.of(objectForTestingV2))).toBeFalsy();
    expect(Optional.of(objectForTestingV2).equals(Optional.of(objectForTesting))).toBeFalsy();
  });

  it('equals: when different valid values of different types are compared then they are not equals', () => {
    expect(Optional.of(numberForTesting).equals(Optional.of(stringForTesting))).toBeFalsy();
    expect(Optional.of(stringForTesting).equals(Optional.of(numberForTesting))).toBeFalsy();

    expect(Optional.of(numberForTesting).equals(Optional.of(objectForTesting))).toBeFalsy();
    expect(Optional.of(objectForTesting).equals(Optional.of(numberForTesting))).toBeFalsy();

    expect(Optional.of(stringForTesting).equals(Optional.of(objectForTesting))).toBeFalsy();
    expect(Optional.of(objectForTesting).equals(Optional.of(stringForTesting))).toBeFalsy();
  });

  it('equals: when native equal valid values are compared then they are equals', () => {
    // Given
    const numberForTestingEqual = numberForTesting;
    const stringForTestingEqual = stringForTesting;

    // When/Then
    expect(Optional.of(numberForTesting).equals(Optional.of(numberForTestingEqual))).toBeTruthy();
    expect(Optional.of(numberForTestingEqual).equals(Optional.of(numberForTesting))).toBeTruthy();

    expect(Optional.of(stringForTesting).equals(Optional.of(stringForTestingEqual))).toBeTruthy();
    expect(Optional.of(stringForTestingEqual).equals(Optional.of(stringForTesting))).toBeTruthy();
  });

  it('equals: when object values with equals function are compared then that one will return the result', () => {
    // Given
    // @ts-ignore
    const equals = function(obj: { name: string }) { return this.name === obj.name; };

    const objectForTestingWithEquals = {...objectForTesting, 'equals': equals };
    const objectForTestingV2WithEquals = { 'name': objectForTesting.name + 'V2', 'equals': equals };

    // When/Then
    expect(Optional.of(objectForTesting).equals(Optional.of(objectForTestingWithEquals))).toBeFalsy();
    expect(Optional.of(objectForTestingWithEquals).equals(Optional.of(objectForTesting))).toBeTruthy();

    expect(Optional.of(objectForTesting).equals(Optional.of(objectForTestingV2WithEquals))).toBeFalsy();
    expect(Optional.of(objectForTestingV2WithEquals).equals(Optional.of(objectForTesting))).toBeFalsy();
  });

  it('filter: when it is invoked on empty optional then an empty optional is returned and predicate is not invoked', () => {
    // Given
    const predicateFunctionSpy = jasmine.createSpy('predicateFunction', <T>(value: T) => null === value);

    // When/Then
    expect(Optional.empty().filter(predicateFunctionSpy)).toEqual(Optional.empty());
    expect(predicateFunctionSpy.calls.count()).toBe(0);
  });

  it('filter: when there is not a filter function on non empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).filter(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(stringForTesting).filter(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(objectForTesting).filter(undefined)).toThrowError(IllegalArgumentError);
  });

  it('filter: when there is a predicate function on non empty Optional then predicate is invoked', () => {
    // Given
    const optionalNumber = Optional.of(numberForTesting + 1);
    const predicateNumberFuntion = (value: number) => value === optionalNumber.get();

    const optionalString = Optional.of(stringForTesting + 'V2');
    const predicateStringFuntion = (value: string) => value === optionalString.get();

    const optionalObject = Optional.of({...objectForTesting, 'name': objectForTesting.name + 'V2'});
    const predicateObjectFuntion = (obj: {name: string}) => obj.name === optionalObject.get().name;

    // When/Then
    expect(Optional.of(numberForTesting).filter(predicateNumberFuntion)).toEqual(Optional.empty());
    expect(optionalNumber.filter(predicateNumberFuntion)).toEqual(optionalNumber);

    expect(Optional.of(stringForTesting).filter(predicateStringFuntion)).toEqual(Optional.empty());
    expect(optionalString.filter(predicateStringFuntion)).toEqual(optionalString);

    expect(Optional.of(objectForTesting).filter(predicateObjectFuntion)).toEqual(Optional.empty());
    expect(optionalObject.filter(predicateObjectFuntion)).toEqual(optionalObject);
  });

  it('flatMap: when it is invoked on empty optional then a empty optional is returned and mapper is not invoked', () => {
    // Given
    const mapperFunctionSpy = jasmine.createSpy('mapperFunction', <T>(value: T) => Optional.of(value));

    // When/Then
    expect(Optional.empty().flatMap(mapperFunctionSpy)).toEqual(Optional.empty());
    expect(mapperFunctionSpy.calls.count()).toBe(0);
  });

  it('flatMap: when there is not a mapper function on non empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).flatMap(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(stringForTesting).flatMap(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(objectForTesting).flatMap(undefined)).toThrowError(IllegalArgumentError);
  });

  it('flatMap: when mapper function returns a null/undefined Optional then an exception is thrown', () => {
    // Given
    // @ts-ignore
    const mapperNullFunction = (value) => null;
    // @ts-ignore
    const mapperUndefinedFunction = (value) => undefined;

    // When/Then
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).flatMap(mapperNullFunction)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).flatMap(mapperUndefinedFunction)).toThrowError(IllegalArgumentError);

    // @ts-ignore
    expect(() => Optional.of(stringForTesting).flatMap(mapperNullFunction)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(stringForTesting).flatMap(mapperUndefinedFunction)).toThrowError(IllegalArgumentError);

    // @ts-ignore
    expect(() => Optional.of(objectForTesting).flatMap(mapperNullFunction)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(objectForTesting).flatMap(mapperUndefinedFunction)).toThrowError(IllegalArgumentError);
  });

  it('flatMap: when there is a mapper function on non empty Optional then returns an Optional', () => {
    const mapperFunction = <T>(value: T) => Optional.of(value);

    expect(Optional.of(numberForTesting).flatMap(mapperFunction)).toEqual(Optional.of(numberForTesting));
    expect(Optional.of(stringForTesting).flatMap(mapperFunction)).toEqual(Optional.of(stringForTesting));
    expect(Optional.of(objectForTesting).flatMap(mapperFunction)).toEqual(Optional.of(objectForTesting));
  });

  it('get: when it is invoked on empty optional then an exception is thrown', () => {
    expect(() => Optional.empty().get()).toThrowError(IllegalArgumentError);
  });

  it('get: when it is invoked on non empty Optional then the internal value is returned', () => {
    expect(Optional.of(numberForTesting).get()).toEqual(numberForTesting);
    expect(Optional.of(stringForTesting).get()).toEqual(stringForTesting);
    expect(Optional.of(objectForTesting).get()).toEqual(objectForTesting);
  });

  it('ifPresent: when there is not an action function on non empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).ifPresent(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(stringForTesting).ifPresent(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(objectForTesting).ifPresent(undefined)).toThrowError(IllegalArgumentError);
  });

  it('ifPresent: when there is an action function on empty Optional action is not invoked', () => {
    // Given
    const actionFunctionSpy = jasmine.createSpy('actionFunction', <T>(value: T) => console.log(value));

    // When
    Optional.empty().ifPresent(actionFunctionSpy);

    // Then
    expect(actionFunctionSpy.calls.count()).toBe(0);
  });

  it('ifPresent: when there is an action function on non empty Optional action is invoked', () => {
    // Given
    const actionFunctionSpy = jasmine.createSpy('actionFunction', <T>(value: T) => console.log(value));

    // When
    Optional.of(numberForTesting).ifPresent(actionFunctionSpy);
    Optional.of(stringForTesting).ifPresent(actionFunctionSpy);
    Optional.of(objectForTesting).ifPresent(actionFunctionSpy);

    // Then
    expect(actionFunctionSpy.calls.count()).toBe(3);
  });

  it('ifPresent: when there is an action on non empty Optional then action changes internal value', () => {
    // Given
    const objNameV2 = objectForTesting.name + 'V2';
    const actionFunction = (obj: { name: string }) => obj.name = objNameV2;
    const optionalObject = Optional.of(objectForTesting);

    // When
    optionalObject.ifPresent(actionFunction);

    // Then
    expect(optionalObject.get().name).toEqual(objNameV2);
  });

  it('ifPresentOrElse: when there is not an action function on non empty Optional then an exception is thrown', () => {
    // Given
    const emptyActionFunction = () => console.log('emptyActionFunction');

    // When/Then
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).ifPresentOrElse(null, emptyActionFunction)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(stringForTesting).ifPresentOrElse(null, emptyActionFunction)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(objectForTesting).ifPresentOrElse(undefined, emptyActionFunction)).toThrowError(IllegalArgumentError);
  });

  it('ifPresentOrElse: when there is an empty action function on empty Optional then empty action is invoked', () => {
    // Given
    const actionFunctionSpy = jasmine.createSpy('actionFunction', <T>(value: T) => console.log(value));
    const emptyActionFunctionSpy = jasmine.createSpy('emptyActionFunction', () => console.log('emptyActionFunction'));

    // When
    Optional.empty().ifPresentOrElse(actionFunctionSpy, emptyActionFunctionSpy);

    // Then
    expect(actionFunctionSpy.calls.count()).toBe(0);
    expect(emptyActionFunctionSpy.calls.count()).toBe(1);
  });

  it('ifPresentOrElse: when there is not an empty action function on empty Optional then an exception is thrown', () => {
    // Given
    const actionFunction = <T>(value: T) => console.log(value);

    // When/Then
    // @ts-ignore
    expect(() => Optional.empty().ifPresentOrElse(actionFunction, undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().ifPresentOrElse(actionFunction, undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().ifPresentOrElse(actionFunction, null)).toThrowError(IllegalArgumentError);
  });

  it('ifPresentOrElse: when there is an action function on non empty Optional then action is invoked', () => {
    // Given
    const actionFunctionSpy = jasmine.createSpy('actionFunction', <T>(value: T) => console.log(value));
    const emptyActionFunctionSpy = jasmine.createSpy('emptyActionFunction', () => console.log('emptyActionFunction'));

    // When
    Optional.of(numberForTesting).ifPresentOrElse(actionFunctionSpy, emptyActionFunctionSpy);
    Optional.of(stringForTesting).ifPresentOrElse(actionFunctionSpy, emptyActionFunctionSpy);
    Optional.of(objectForTesting).ifPresentOrElse(actionFunctionSpy, emptyActionFunctionSpy);

    // Then
    expect(actionFunctionSpy.calls.count()).toBe(3);
    expect(emptyActionFunctionSpy.calls.count()).toBe(0);
  });

  it('ifPresentOrElse: when there is an action on non empty Optional then action changes internal value', () => {
    // Given
    const objNameV2 = objectForTesting.name + 'V2';
    const actionFunction = (obj: { name: string }) => obj.name = objNameV2;
    const optionalObject = Optional.of(objectForTesting);

    // When
    // @ts-ignore
    optionalObject.ifPresentOrElse(actionFunction, null);

    // Then
    expect(optionalObject.get().name).toEqual(objNameV2);
  });

  it('isPresent: when it is invoked on empty Optional then returns false', () => {
    expect(Optional.empty().isPresent()).toBeFalsy();
  });

  it('isPresent: when it is invoked on non empty Optional then returns true', () => {
    expect(Optional.of(numberForTesting).isPresent()).toBeTruthy();
    expect(Optional.of(stringForTesting).isPresent()).toBeTruthy();
    expect(Optional.of(objectForTesting).isPresent()).toBeTruthy();
  });

  it('map: when it is invoked on empty Optional then an empty Optional is returned and mapper is not invoked', () => {
    // Given
    const mapperFunctionSpy = jasmine.createSpy('mapperFunction', <T>(value: T) => value);

    // When/Then
    expect(Optional.empty().map(mapperFunctionSpy)).toEqual(Optional.empty());
    expect(mapperFunctionSpy.calls.count()).toBe(0);
  });

  it('map: when there is not a mapper function on non empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.of(numberForTesting).map(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(stringForTesting).map(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.of(objectForTesting).map(null)).toThrowError(IllegalArgumentError);
  });

  it('map: when there is a mapper function on non empty Optional then returns an Optional', () => {
    // Given
    const mapperFunction = (obj: { name: string }) => obj.name;

    // When/Then
    expect(Optional.of(objectForTesting).map(mapperFunction)).toEqual(Optional.of(objectForTesting.name));
  });

  it('or: when it is invoked on non empty Optional then the Optional is returned and supplier is not invoked', () => {
    // Given
    const numberOptional = Optional.of(numberForTesting);
    const stringOptional = Optional.of(stringForTesting);
    const objectOptional = Optional.of(objectForTesting);

    const supplierFunctionSpy = jasmine.createSpy('supplierFunction', () => Optional.empty());

    // When/Then
    expect(numberOptional.or(supplierFunctionSpy)).toEqual(numberOptional);
    expect(stringOptional.or(supplierFunctionSpy)).toEqual(stringOptional);
    expect(objectOptional.or(supplierFunctionSpy)).toEqual(objectOptional);

    expect(supplierFunctionSpy.calls.count()).toBe(0);
  });

  it('or: when there is not a supplier function on empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.empty().or(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().or(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().or(undefined)).toThrowError(IllegalArgumentError);
  });

  it('or: when it is invoked on empty Optional then supplier function returns a new Optional', () => {
    // Given
    const numberOptional = Optional.of(numberForTesting);
    const supplierFunction = () => numberOptional;

    // When/Then
    expect(Optional.empty().or(supplierFunction)).toEqual(numberOptional);
  });

  it('orElse: when it is invoked on empty Optional then returns the given other', () => {
    // Given
    const numberForTestingV2 = numberForTesting + 1;
    const stringForTestingV2 = stringForTesting + '2';
    const objectForTestingV2 = { ...objectForTesting, 'age': 12 };

    // When/Then
    expect(Optional.empty().orElse(numberForTestingV2)).toEqual(numberForTestingV2);
    expect(Optional.empty().orElse(stringForTestingV2)).toEqual(stringForTestingV2);
    expect(Optional.empty().orElse(objectForTestingV2)).toEqual(objectForTestingV2);
  });

  it('orElse: when it is invoked on non empty Optional then returns the current Optional', () => {
    // @ts-ignore
    expect(Optional.of(numberForTesting).orElse(null)).toEqual(numberForTesting);
    // @ts-ignore
    expect(Optional.of(stringForTesting).orElse(undefined)).toEqual(stringForTesting);
    // @ts-ignore
    expect(Optional.of(objectForTesting).orElse(null)).toEqual(objectForTesting);
  });

  it('orElseGet: when it is invoked on non empty Optional then the internal value is returned and supplier is not invoked', () => {
    // Given
    const supplierFunctionSpy = jasmine.createSpy('supplierFunction', () => Symbol('test'));

    // When/Then
    expect(Optional.of(numberForTesting).orElseGet(supplierFunctionSpy)).toEqual(numberForTesting);
    expect(Optional.of(stringForTesting).orElseGet(supplierFunctionSpy)).toEqual(stringForTesting);
    expect(Optional.of(objectForTesting).orElseGet(supplierFunctionSpy)).toEqual(objectForTesting);

    expect(supplierFunctionSpy.calls.count()).toBe(0);
  });

  it('orElseGet: when there is not a supplier function on empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.empty().orElseGet(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().orElseGet(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().orElseGet(undefined)).toThrowError(IllegalArgumentError);
  });

  it('orElseGet: when there is an supplier function on empty Optional then supplier is invoked', () => {
    // Given
    const supplierFunctionSpy = jasmine.createSpy('supplierFunction', () => Symbol('test'));

    // When
    Optional.empty().orElseGet(supplierFunctionSpy);

    // Then
    expect(supplierFunctionSpy.calls.count()).toBe(1);
  });

  it('orElseGet: when there is an supplier function on empty Optional then supplier returns a value', () => {
    // Given
    const objectForTestingV2 = { ...objectForTesting, 'age': 12 };
    const supplierFunction = () => objectForTestingV2;

    // When/Then
    expect(Optional.empty().orElseGet(supplierFunction)).toEqual(objectForTestingV2);
  });

  it('orElseThrow: when it is invoked on non empty Optional then the internal value is returned and exceptionSupplier is not invoked', () => {
    // Given
    const exceptionSupplierFunctionSpy = jasmine.createSpy('exceptionSupplierFunction', () => Error('error'));

    // When/Then
    expect(Optional.of(numberForTesting).orElseThrow(exceptionSupplierFunctionSpy)).toEqual(numberForTesting);
    expect(Optional.of(stringForTesting).orElseThrow(exceptionSupplierFunctionSpy)).toEqual(stringForTesting);
    expect(Optional.of(objectForTesting).orElseThrow(exceptionSupplierFunctionSpy)).toEqual(objectForTesting);

    expect(exceptionSupplierFunctionSpy.calls.count()).toBe(0);
  });

  it('orElseThrow: when there is not a exceptionSupplier function on empty Optional then an exception is thrown', () => {
    // @ts-ignore
    expect(() => Optional.empty().orElseThrow(null)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().orElseThrow(undefined)).toThrowError(IllegalArgumentError);
    // @ts-ignore
    expect(() => Optional.empty().orElseThrow(null)).toThrowError(IllegalArgumentError);
  });

  it('orElseThrow: when there is an supplier function on empty Optional then exceptionSupplier throws an exception', () => {
    // Given
    const exceptionSupplierFunction = () => TypeError('error');

    // When/Then
    expect(() => Optional.empty().orElseThrow(exceptionSupplierFunction)).toThrowError(TypeError);
  });

  it('toString: when the current Optional is empty then Optional[empty] will be returned', () => {
    expect(Optional.empty().toString()).toEqual('Optional[empty]');
  });

  it('toString: when the current Optional is not empty then its string representation will be returned', () => {
    expect(Optional.of(numberForTesting).toString()).toEqual('Optional[' + numberForTesting.toString() + ']');
    expect(Optional.of(stringForTesting).toString()).toEqual('Optional[' + stringForTesting.toString() + ']');
    expect(Optional.of(objectForTesting).toString()).toEqual('Optional[' + objectForTesting.toString() + ']');
  });

});
