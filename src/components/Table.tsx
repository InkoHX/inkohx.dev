import React from 'react'

export interface TableProps {
  caption?: React.ReactNode
}

export const Table: React.FC<React.PropsWithChildren<TableProps>> = props => {
  return (
    <table className="w-full max-w-prose border-collapse border-2 border-slate-300">
      {props.caption && (
        <caption className="mb-2 font-bold">{props.caption}</caption>
      )}
      {props.children}
    </table>
  )
}
