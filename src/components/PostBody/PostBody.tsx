import React from 'react'

import styles from './PostBody.module.css'

export interface PostBody {
  content: string
}

export const PostBody: React.FC<PostBody> = props => {
  return (
    <main
      className={styles['post-body']}
      dangerouslySetInnerHTML={{ __html: props.content }}
    ></main>
  )
}
