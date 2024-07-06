import React from 'react'

export const TableHead: React.FC<React.PropsWithChildren> = props => {
  return <thead className="bg-slate-200">{props.children}</thead>
}
