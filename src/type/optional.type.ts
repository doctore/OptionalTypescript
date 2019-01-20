import { AssertUtil } from '../util/assert.util';

/**
 *    A container object which may or may not contain a non-{@code null} value.
 * If a value is present, {@code isPresent()} returns {@code true}. If no
 * value is present, the object is considered <i>empty</i> and
 * {@code isPresent()} returns {@code false}.
 *
 *    <p>Additional methods that depend on the presence or absence of a contained
 * value are provided, such as {@link #orElse(Object) orElse()}
 * (returns a default value if no value is present) and
 * {@link #ifPresent(Consumer) ifPresent()} (performs an
 * action if a value is present).
 *
 * @apiNote
 *    {@code Optional} is primarily intended for use as a method return type where
 * there is a clear need to represent "no result," and where using {@code null}
 * is likely to cause errors. A variable whose type is {@code Optional} should
 * never itself be {@code null}; it should always point to an {@code Optional}
 * instance.
 *
 * @param <T> the type of value
 */
export class Optional<T> {

  private constructor(private value: T | null = null) {}

  /**
   * Returns an empty {@code Optional} instance. No value is present for this Optional.
   */
  public static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  /**
   * Returns an {@code Optional} describing the given non-{@code null} value.
   *
   * @param value
   *    The value to describe, which must be non-{@code null}
   *
   * @return an {@code Optional} with the value present
   *
   * @throws {@link IllegalArgumentError} if value is {@code null} or {@code undefined}
   */
  public static of<T>(value: T): Optional<T> {
    AssertUtil.notNullOrUndefined(value);
    return new Optional<T>(value);
  }

  /**
   *    Returns an {@code Optional} describing the given value, if non-{@code null}
   * and non-{@code undefined}, otherwise returns an empty {@code Optional}.
   *
   * @param value
   *    The possibly-{@code null} or possibly-{@code undefined} value to describe
   *
   * @return an {@code Optional} with a present value if the specified value
   *         is non-{@code null}, otherwise an empty {@code Optional}
   */
  public static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return null === value || 'undefined' === typeof value
      ? Optional.empty() : Optional.of(value);
  }

  /**
   * Returns {@code true} if the argument is equal to the current one, {@code false} otherwise.
   *
   * @apiNote
   *    Due to we cannot know the type of generics in runtime, this function will return
   * {@code true} when both internal values will be {@code null} or {@code undefined}
   *
   * @param other
   *    {@code Optional} to compare
   */
  public equals<U>(other: Optional<U>): boolean {
    if (null === other || 'undefined' === typeof other) {
      return false;
    } else if (this.isPresent() !== other.isPresent()) {
      return false;
    }
    return !this.isPresent() ? true : this.internalEqualResult(other);
  }

  /**
   *    If a value is present, and the value matches the given predicate, returns an
   * {@code Optional} describing the value, otherwise returns an empty {@code Optional}.
   *
   * @param predicate
   *    The predicate to apply to a value, if present
   *
   * @return an {@code Optional} describing the value of this
   *         {@code Optional}, if a value is present and the value matches the
   *         given predicate, otherwise an empty {@code Optional}
   *
   * @throws {@link IllegalArgumentError} if value is present and
   *         predicate is {@code null} or {@code undefined}
   */
  public filter(predicate: (value: T) => boolean): Optional<T> {
    if (!this.isPresent()) {
      return Optional.empty();
    } else {
      AssertUtil.notNullOrUndefined(predicate);
      return predicate(this.value!) ? this : Optional.empty();
    }
  }

  /**
   *    If a value is present, returns the result of applying the given
   * {@code Optional}-bearing mapping function to the value, otherwise returns
   * an empty {@code Optional}.
   *
   *    <p>This method is similar to {@link #map(mapper)}, but the mapping
   * function is one whose result is already an {@code Optional}, and if
   * invoked, {@code flatMap} does not wrap it within an additional
   * {@code Optional}.
   *
   * @param mapper
   *    The mapping function to apply to a value, if present
   *
   * @return the result of applying an {@code Optional}-bearing mapping
   *         function to the value of this {@code Optional}, if a value is
   *         present, otherwise an empty {@code Optional}
   *
   * @throws {@link IllegalArgumentError} if value is present and
   *         mapper is {@code null} or {@code undefined}
   */
  public flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
    if (!this.isPresent()) {
      return Optional.empty();
    } else {
      AssertUtil.notNullOrUndefined(mapper);
      const result: Optional<U> = mapper(this.value!);
      return AssertUtil.notNullOrUndefined(result);
    }
  }

  /**
   * If a value is present, returns the value, otherwise throws {@link IllegalArgumentError}
   *
   * @apiNote
   * The preferred alternative to this method is {@link #orElseThrow()}.
   *
   * @return the non-{@code null} value described by this {@code Optional}
   *
   * @throws {@link IllegalArgumentError} if value is {@code null}
   */
  public get(): T {
    AssertUtil.notNull(this.value);
    return this.value!;
  }

  /**
   *    If a value is present, performs the given action with the value,
   * otherwise does nothing.
   *
   * @param action
   *    The function to be invoked, if a value is present
   *
   * @throws {@link IllegalArgumentError} if value is present and
   *         action is {@code null} or {@code undefined}
   */
  public ifPresent(action: (value: T) => void): void {
    if (this.isPresent()) {
      AssertUtil.notNullOrUndefined(action);
      action(this.value!);
    }
  }

  /**
   *    If a value is present, performs the given action with the value,
   * otherwise performs the given empty-based action
   *
   * @param action
   *    The action to be performed, if a value is present
   * @param emptyAction
   *    The empty-based action to be performed, if no value is present
   *
   * @throws {@link IllegalArgumentError} if value is present and
   *         action is {@code null} or {@code undefined}.
   *         Or if no value is present and
   *         emptyAction is {@code null} or {@code undefined}
   */
  public ifPresentOrElse(action: (value: T) => void, emptyAction: () => void): void {
    if (this.isPresent()) {
      AssertUtil.notNullOrUndefined(action);
      action(this.value!);
    } else {
      AssertUtil.notNullOrUndefined(emptyAction);
      emptyAction();
    }
  }

  /**
   * If a value is present, returns {@code true}, otherwise {@code false}.
   */
  public isPresent(): boolean {
    return 'undefined' !== typeof this.value && null !== this.value;
  }

  /**
   *    If a value is present, returns an {@code Optional} describing (as if by
   * {@link #ofNullable}) the result of applying the given mapping function to
   * the value, otherwise returns an empty {@code Optional}.
   *
   *    <p>If the mapping function returns a {@code null} result then this method
   * returns an empty {@code Optional}.
   *
   * @param mapper
   *    The mapping function to apply to a value, if present
   *
   * @return an {@code Optional} describing the result of applying a mapping
   *         function to the value of this {@code Optional}, if a value is
   *         present, otherwise an empty {@code Optional}
   *
   * @throws {@link IllegalArgumentError} if value is present and
   *         mapper is {@code null} or {@code undefined}
   */
  public map<U>(mapper: (value: T) => U): Optional<U> {
    if (!this.isPresent()) {
      return Optional.empty();
    } else {
      AssertUtil.notNullOrUndefined(mapper);
      return Optional.ofNullable<U>(mapper(this.value!));
    }
  }

  /**
   *    If a value is present, returns an {@code Optional} describing the value,
   * otherwise returns an {@code Optional} produced by the supplying function
   *
   * @param supplier
   *    The supplying function that produces an {@code Optional} to be returned
   *
   * @return returns an {@code Optional} describing the value of this
   *         {@code Optional}, if a value is present, otherwise an
   *         {@code Optional} produced by the supplying function
   *
   * @throws {@link IllegalArgumentError} if value is not present and
   *         supplier is {@code null} or {@code undefined}
   */
  public or(supplier: () => Optional<T>): Optional<T> {
    if (this.isPresent()) {
      return this;
    } else {
      AssertUtil.notNullOrUndefined(supplier);
      const result: Optional<T> = supplier();
      return AssertUtil.notNullOrUndefined(result);
    }
  }

  /**
   * If a value is present, returns the value, otherwise returns {@code other}.
   *
   * @param other
   *    The value to be returned, if no value is present
   *
   * @return the value, if present, otherwise {@code other}
   */
  public orElse(other: T): T {
    return this.isPresent() ? this.value! : other;
  }

  /**
   *    If a value is present, returns the value, otherwise returns the result
   * produced by the supplying function.
   *
   * @param supplier
   *    The supplying function that produces a value to be returned
   *
   * @return the value, if present, otherwise the result produced by the
   *         supplying function
   *
   * @throws {@link IllegalArgumentError} if value is not present and
   *         supplier is {@code null} or {@code undefined}
   */
  public orElseGet(supplier: () => T): T {
    if (this.isPresent()) {
      return this.value!;
    } else {
      AssertUtil.notNullOrUndefined(supplier);
      return supplier();
    }
  }

  /**
   *    If a value is present, returns the value, otherwise throws an exception
   * produced by the exception supplying function.
   *
   * @param exceptionSupplier
   *    The supplying function that produces an exception to be thrown
   *
   * @return the present value
   *
   * @throws {@link IllegalArgumentError} if value is not present and
   *         exceptionSupplier is {@code null} or {@code undefined}.
   *         X if there is no value present
   */
  public orElseThrow<X extends Error>(exceptionSupplier: () => X): T {
    if (this.isPresent()) {
      return this.value!;
    } else {
      AssertUtil.notNullOrUndefined(exceptionSupplier);
      throw exceptionSupplier();
    }
  }

  /**
   * Returns a string representation of the object.
   *
   * @apiNote
   * When the {@code Optional} is not empty, the toString function of the internal value will be invoked
   */
  public toString(): string {
    const stringRepresentation = this.isPresent() ? this.value!.toString() : 'empty';
    return `Optional[${stringRepresentation}]`;
  }

  /**
   *    Checks if the given {@code Optional} with a non-{@code null} internal value is
   * equal to the current one. If both values have {@code equals} function will use it,
   * otherwise will use '==='.
   *
   * @param other
   *    {@code Optional} with the internal value to compare
   *
   * @return {@code true} if both internal values are equals
   */
  private internalEqualResult<U>(other: Optional<U>): boolean {
    if ('function' === typeof this.value!['equals']) {
      return this.value!['equals'](other.get());
    }
    // @ts-ignore
    return this.value === other.get();
  }

}
