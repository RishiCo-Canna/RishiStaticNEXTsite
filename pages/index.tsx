import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cannabis Industry Website</title>
        <meta name="description" content="Cannabis industry website with Decap CMS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to our Cannabis Industry Website</h1>
        <p>This site is powered by Next.js and Decap CMS</p>
        <a href="/admin">Go to Admin Dashboard</a>
      </main>
    </div>
  )
}
