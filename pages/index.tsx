import Head from 'next/head'

export default function Home() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Head>
        <title>Cannabis Industry Website</title>
        <meta name="description" content="Cannabis industry website with Decap CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to our Cannabis Industry Website</h1>
        <p>This site is powered by Next.js and Decap CMS</p>
        <div style={{ marginTop: '20px' }}>
          <a href="/hello" style={{ color: 'blue', textDecoration: 'underline' }}>View Hello World Page</a>
          <br />
          <a href="/admin" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Admin Dashboard</a>
        </div>
      </main>
    </div>
  )
}