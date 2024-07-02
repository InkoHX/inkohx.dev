import fs from 'node:fs/promises'
import path from 'node:path'

import { Static, Type } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import grayMatter from 'gray-matter'

import { TypeboxValidationError } from '@/errors/TypeboxValidationError'

// const postDir = path.join(process.cwd(), 'posts')
const postDir = path.resolve(__dirname, '../../../posts')
const datePattern = '^\\d\\d\\d\\d-\\d\\d-\\d\\d$'

export type PostMetadata = Static<typeof PostMetadata>

export const PostMetadata = Type.Object({
  title: Type.String({ minLength: 1 }),
  publishedAt: Type.String({ pattern: datePattern }),
  modifiedAt: Type.String({ pattern: datePattern }),
  categories: Type.Array(Type.String({ minLength: 1 })), // 将来的に予約
})

export const PostMetadataCompiler = TypeCompiler.Compile(PostMetadata)

export const findAll = async () => {
  const extension = '.md'
  const files = await fs.readdir(postDir, { withFileTypes: true })

  return files
    .filter(dirent => dirent.isFile() && dirent.name.endsWith(extension))
    .map(dirent => dirent.name.replace(extension, ''))
}

export const read = async (id: string) => {
  const raw = await fs.readFile(path.join(postDir, `${id}.md`), 'utf-8')
  const parsed = grayMatter(raw)

  if (!PostMetadataCompiler.Check(parsed.data)) {
    throw new TypeboxValidationError(
      PostMetadataCompiler.Errors(parsed.data).First()!
    )
  }

  return {
    content: parsed.content,
    metadata: parsed.data,
  }
}
