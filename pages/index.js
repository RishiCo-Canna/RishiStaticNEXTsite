import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Cannabis Industry Website</title>
        <meta name="description" content="Cannabis Industry Website powered by Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to Cannabis Industry Website
        </h1>
        <p>
          Your trusted source for cannabis industry information
        </p>

        <a href="/admin" style={{
          display: 'inline-block',
          background: '#0070f3',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          textDecoration: 'none',
          marginTop: '20px'
        }}>
          Admin Panel
        </a>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Cannabis Industry Website</p>
      </footer>
    </div>
  )
}