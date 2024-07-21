import rehypeShiki from '@shikijs/rehype'
import { Node, PhrasingContent, Text as TextNode } from 'mdast'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export const extractHeadings = (markdown: string) => {
  const root = unified().use(remarkParse).parse(markdown)
  const headings: Array<{ depth: number; text: string }> = []

  const extractHeadingText = (node: Node | PhrasingContent): string => {
    if (node.type === 'text') return (node as TextNode).value

    if ('children' in node && Array.isArray(node.children)) {
      return node.children.map(extractHeadingText).join('')
    }

    return ''
  }

  for (const node of root.children) {
    if (node.type !== 'heading') continue

    const text = extractHeadingText(node)

    headings.push({ text, depth: node.depth })
  }

  return headings
}

export const markdownToHtml = (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeShiki, {
      theme: 'one-light',
    })
    .process(markdown)
