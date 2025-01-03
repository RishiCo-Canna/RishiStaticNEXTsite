import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function HelloWorld({ content, title }) {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Hello World page" />
      </Head>

      <main>
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
        <div style={{ marginTop: '20px' }}>
          <a href="/admin" style={{ color: 'blue', textDecoration: 'underline' }}>Edit this page</a>
          <br />
          <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Home</a>
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content/pages/hello.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    props: {
      content,
      title: data.title,
    },
  }
}
