import { IllegalAccessError } from '../error/illegal-access.error';
import { IllegalArgumentError } from '../error/illegal-argument.error';

/**
 * Helper functions to validate given information
 */
export class AssertUtil {

  constructor() {
    throw new IllegalAccessError ('AssertUtil is an utility class');
  }

  /**
   * Checks if the given value is different of {@code null} and {@code undefined}
   *
   * @param value
   *    Value to check
   *
   * @return {@code obj} if not {@code null} and not {@code undefined}
   *
   * @throws IllegalArgumentError if value is {@code null} or {@code undefined}
   */
  public static notNullOrUndefined(value: any): any {
    AssertUtil.notUndefined(value);
    AssertUtil.notNull(value);
    return value;
  }

  /**
   * Checks if the given value is {@code null}
   *
   * @param value
   *    Value to check
   * @param message
   *    Custom message to include more information about the error
   *
   * @return {@code obj} if not {@code null}
   *
   * @throws IllegalArgumentError if given value is {@code null}
   */
  public static notNull(value: any, message?: string): any {
    if (null === value) {
      throw new IllegalArgumentError(message ? message : 'value is null');
    }
    return value;
  }

  /**
   * Checks if the given value is {@code undefined}
   *
   * @param value
   *    Value to check
   * @param message
   *    Custom message to include more information about the error
   *
   * @return {@code obj} if not {@code undefined}
   *
   * @throws IllegalArgumentError if given value is {@code undefined}
   */
  public static notUndefined(value: any, message?: string): any {
    if ('undefined' === typeof value) {
      throw new IllegalArgumentError(message ? message : 'value is not defined');
    }
    return value;
  }

}
