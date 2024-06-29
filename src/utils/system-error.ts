/**
 * [Node.js Documentation](https://nodejs.org/api/errors.html#class-systemerror)
 */
export interface SystemError extends Error {
  /** If present, the address to which a network connection failed */
  address?: string
  /** The string error code */
  code: string
  /** If present, the file path destination when reporting a file system error */
  dest?: string
  /** The system-provided error number */
  errno: number
  /** If present, extra details about the error condition */
  info?: any
  /** A system-provided human-readable description of the error */
  message: string
  /** If present, the file path when reporting a file system error */
  path?: string
  /** If present, the network connection port that is not available */
  port?: number
  /** The name of the system call that triggered the error */
  syscall: string
}

/**
 * 渡されたオブジェクトが[SystemError](https://nodejs.org/api/errors.html#class-systemerror)かどうかを判定する関数
 * @param obj オブジェクト
 * @returns `obj`が[SystemError](https://nodejs.org/api/errors.html#class-systemerror)だったら`true`を返す。
 */
export const isSystemError = (obj: any): obj is SystemError => {
  if (!(obj instanceof Error)) return false

  const props = [
    ['code', 'string', true],
    ['syscall', 'string', true],
    ['errno', 'number', true],
    ['message', 'string', true],
    ['address', 'string', false],
    ['dest', 'string', false],
    ['info', 'object', false],
    ['path', 'string', false],
    ['port', 'number', false],
  ] as const

  for (const [propertyName, type, required] of props) {
    const hasProperty = Reflect.has(obj, propertyName)

    if (hasProperty) {
      const isMatchType = typeof Reflect.get(obj, propertyName) === type

      if (!isMatchType) return false
    } else if (required) return false
  }

  return true
}
