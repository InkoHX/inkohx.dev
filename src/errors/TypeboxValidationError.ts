import { ValueError } from '@sinclair/typebox/compiler'

export class TypeboxValidationError extends Error {
  public constructor(public readonly original: ValueError) {
    super(`${original.message} (Path: ${original.path || 'unknown'})`, {
      cause: original,
    })

    Reflect.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      writable: false,
      value: 'TypeboxValidationError',
    })
  }
}
