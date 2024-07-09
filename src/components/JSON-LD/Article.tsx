import React from 'react'
import type { Article as ArticleSchema, WithContext } from 'schema-dts'

export interface ArticleProps {
  structure: ArticleSchema
}

export const Article: React.FC<ArticleProps> = props => {
  const metadata = {
    '@context': 'https://schema.org',
    ...props.structure,
  } satisfies WithContext<ArticleSchema>

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata) }}
    />
  )
}
