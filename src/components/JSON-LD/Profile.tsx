import React from 'react'
import type { Organization, Person } from 'schema-dts'

// Ref: https://developers.google.com/search/docs/appearance/structured-data/profile-page?hl=ja#json-ld
export interface ProfileProps {
  dateCreated: Date
  dateModified: Date
  structure: Person | Organization
}

export const Profile: React.FC<ProfileProps> = props => {
  const metadata = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: props.dateCreated,
    dateModified: props.dateModified,
    mainEntity: props.structure,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(metadata) }}
    />
  )
}
