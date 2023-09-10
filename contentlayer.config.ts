import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeExternalLinks from 'rehype-external-links';
import GithubSlugger from "github-slugger"

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    summary: {
      type: 'string',
      description: 'summary of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    dateText: {
      type: 'string',
      description: 'The date of the post',
      required: true,
    },
    readingTime: {
      type: 'string',
      description: 'The time of reading',
      required: true,
    },
    toc: {
      type: "boolean",
      required: false,
      default: false,
    },
  },
  computedFields: {
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger()
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
            ({ groups }) => {
              const flag = groups?.flag;
              const content = groups?.content;
              return {
                level: flag?.length == 1 ? "one"
                : flag?.length == 2 ? "two"
                : flag?.length == 3 ? "three"
                : "four",
                text: content,
                slug: content ? slugger.slug(content) : undefined
              };
            }
          );
          return headings;
        },
    },
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeExternalLinks, {target: ['_blank']},
       ],
       [
        rehypeAutolinkHeadings,
        {
          properties: { className: ['anchor'] },
        },
      ],
    ],
  },
});
