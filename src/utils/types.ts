export type Awaited<T extends Promise<any>> =
  T extends Promise<infer V> ? V : never
