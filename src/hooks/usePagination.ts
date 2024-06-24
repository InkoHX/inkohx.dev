import React from 'react'

import { range } from '@/utils/range'

export interface PaginationOptions {
  totalPages: number
  maxPages: number
  defaultPage?: number
}

type Previous =
  | { type: 'previous'; value: number; hasPreviousPage: true }
  | { type: 'previous'; hasPreviousPage: false }

type Next =
  | { type: 'next'; value: number; hasNextPage: true }
  | { type: 'next'; hasNextPage: false }

export type PaginationItem =
  | {
      type: 'page'
      value: number
      selected: boolean
    }
  | { type: 'literal'; value: '...' }
  | Next
  | Previous

export const usePagination = (options: PaginationOptions) => {
  const [currentPage, setCurrentPage] = React.useState(options.defaultPage ?? 1)
  const startPage = Math.max(
    2,
    Math.min(
      options.totalPages - options.maxPages,
      currentPage - Math.floor(options.maxPages / 2)
    )
  )
  const pages = React.useMemo(() => {
    const items: PaginationItem[] = []

    {
      const previousPage = currentPage - 1
      const hasPreviousPage = previousPage >= 1
      items.push({
        type: 'previous',
        value: hasPreviousPage ? previousPage : void 0,
        hasPreviousPage,
      } as Previous)
    }

    items.push({ type: 'page', value: 1, selected: currentPage === 1 })
    if (startPage > 2) {
      items.push({ type: 'literal', value: '...' })
    }

    for (const page of range(
      startPage,
      Math.min(startPage + options.maxPages - 1, options.totalPages)
    )) {
      items.push({ type: 'page', value: page, selected: currentPage === page })
    }

    if (startPage + options.maxPages < options.totalPages) {
      items.push({ type: 'literal', value: '...' })
    }

    if (options.totalPages !== 1) {
      items.push({
        type: 'page',
        value: options.totalPages,
        selected: currentPage === options.totalPages,
      })
    }

    {
      const nextPage = currentPage + 1
      const hasNextPage = nextPage <= options.totalPages
      items.push({
        type: 'next',
        value: hasNextPage ? nextPage : void 0,
        hasNextPage,
      } as Next)
    }

    return items
  }, [currentPage, options.maxPages, options.totalPages, startPage])

  return {
    pages,
    currentPage,
    setCurrentPage,
  } as const
}
