/**
 * Thrown to indicate that a method has been passed an illegal or inappropriate argument
 */
export class IllegalArgumentError extends Error {

  constructor (m: string) {
    super(m);
    this.name = IllegalArgumentError.name;
    Object.setPrototypeOf(this, IllegalArgumentError.prototype);
  }

}
