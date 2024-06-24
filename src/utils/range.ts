export function* range(start: number, end: number) {
  for (let index = start; index < end; index++) yield index
}
