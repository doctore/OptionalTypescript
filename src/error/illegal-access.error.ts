/**
 * Thrown if an application attempts to access or modify a field, or to call a method that it does not have access to.
 */
export class IllegalAccessError extends Error {

  constructor (m: string) {
    super(m);
    this.name = IllegalAccessError.name;
    Object.setPrototypeOf(this, IllegalAccessError.prototype);
  }

}
