import React from 'react'

import { mergeClassName } from '@/utils/mergeClassName'

type TableCellProps<T extends 'td' | 'th'> = { as?: T }

export const TableCell = <T extends 'td' | 'th' = 'td'>({
  as,
  children,
  ...props
}: TableCellProps<T> &
  Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof TableCellProps<T>
  >): React.JSX.Element => {
  const Element = as ?? 'td'

  return (
    <Element
      {...props}
      className={mergeClassName(
        'border-2 border-slate-300 px-4 py-2',
        props.className
      )}
    >
      {children}
    </Element>
  )
}
