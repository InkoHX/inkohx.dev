export const chunk = <T extends any[]>(input: T, size: number): T[] => {
  const tmp: T[] = []

  for (let inputIndex = 0; inputIndex < input.length; ) {
    const tmpIndex = tmp.length
    for (let i = 0; i < size; i++) {
      if (inputIndex > input.length - 1) return tmp

      const source = input[inputIndex]
      if (!Array.isArray(tmp[tmpIndex])) tmp[tmpIndex] = [] as unknown as T
      const target = tmp[tmpIndex]

      target.push(source)
      inputIndex++
    }
  }

  return tmp
}
