'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import NextLink from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { type PaginationItem, usePagination } from '@/hooks/usePagination'

export interface PaginationProps {
  totalPages: number
  defaultPage?: number
  maxPages?: number
}

const PreviousButton: React.FC<
  | { href: string; onClick: () => void; hasPreviousPage: true }
  | { hasPreviousPage: false }
> = props => {
  if (props.hasPreviousPage)
    return (
      <NextLink
        href={props.href}
        onClick={props.onClick}
        className="block h-8 min-w-8 rounded-lg border border-black p-2 text-center font-semibold leading-none focus:border-none"
      >
        <ArrowLeftIcon className="h-full" />
        <span className="sr-only">前のページへ移動</span>
      </NextLink>
    )

  return (
    <button
      aria-disabled="true"
      className="h-8 min-w-8 cursor-not-allowed rounded-lg border border-black bg-slate-300 p-2 text-center focus:border-none"
    >
      <ArrowLeftIcon className="h-full" />
      <span className="sr-only">前のページへ移動</span>
    </button>
  )
}

const NextButton: React.FC<
  | { href: string; onClick: () => void; hasNextPage: true }
  | { hasNextPage: false }
> = props => {
  if (props.hasNextPage)
    return (
      <NextLink
        href={props.href}
        onClick={props.onClick}
        className="block h-8 min-w-8 rounded-lg border border-black p-2 text-center font-semibold leading-none focus:border-none"
      >
        <ArrowRightIcon className="h-full" />
        <span className="sr-only">次のページへ移動</span>
      </NextLink>
    )

  return (
    <button
      aria-disabled="true"
      className="h-8 min-w-8 cursor-not-allowed rounded-lg border border-black bg-slate-300 p-2 text-center focus:border-none"
    >
      <ArrowRightIcon className="h-full fill-black" />
      <span className="sr-only">次のページへ移動</span>
    </button>
  )
}

const PageButton: React.FC<
  | { page: number; onClick: () => void; href: string; selected: false }
  | { page: number; selected: true }
> = props => {
  if (props.selected)
    return (
      <button
        aria-disabled="true"
        className="h-8 min-w-8 cursor-not-allowed rounded-lg border border-black bg-primary-600 p-2 text-center font-semibold leading-none text-white focus:border-none"
      >
        {props.page}
        <span className="sr-only">
          ページ目{props.selected && '（現在のページ）'}
        </span>
      </button>
    )

  return (
    <NextLink
      href={props.href}
      onClick={props.onClick}
      className="block h-8 min-w-8 rounded-lg border border-black p-2 text-center leading-none focus:border-none"
    >
      {props.page}
      <span className="sr-only">ページ目</span>
    </NextLink>
  )
}

const PaginationItem: React.FC<{
  item: PaginationItem
  pagination: ReturnType<typeof usePagination>
}> = ({ item, pagination }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const getPageLink = React.useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams)

      params.set('page', page.toString())

      return `${pathname}?${params.toString()}`
    },
    [pathname, searchParams]
  )

  switch (item.type) {
    case 'literal':
      return <span>...</span>
    case 'next':
      return item.hasNextPage ? (
        <NextButton
          href={getPageLink(item.value)}
          onClick={() => pagination.setCurrentPage(item.value)}
          hasNextPage={true}
        />
      ) : (
        <NextButton hasNextPage={false} />
      )
    case 'previous':
      return item.hasPreviousPage ? (
        <PreviousButton
          href={getPageLink(item.value)}
          onClick={() => pagination.setCurrentPage(item.value)}
          hasPreviousPage={true}
        />
      ) : (
        <PreviousButton hasPreviousPage={false} />
      )
    case 'page':
      return item.selected ? (
        <PageButton page={item.value} selected={item.selected} />
      ) : (
        <PageButton
          href={getPageLink(item.value)}
          onClick={() => pagination.setCurrentPage(item.value)}
          page={item.value}
          selected={item.selected}
        />
      )
  }
}

export const Pagination: React.FC<PaginationProps> = props => {
  const pagination = usePagination({ ...props, maxPages: props.maxPages ?? 5 })

  return (
    <nav aria-label="Pagination">
      <ul className="flex space-x-2">
        {pagination.pages.map((item, index) => (
          <li key={index}>
            {<PaginationItem item={item} pagination={pagination} />}
          </li>
        ))}
      </ul>
    </nav>
  )
}
