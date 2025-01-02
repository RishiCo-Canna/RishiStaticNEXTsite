import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cannabis Industry Website</title>
        <meta name="description" content="Cannabis Industry Website powered by Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Cannabis Industry Website
        </h1>
        <p className={styles.description}>
          Your trusted source for cannabis industry information
        </p>

        <a 
          href="/admin" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Opens admin interface in a new tab"
          style={{
            display: 'inline-block',
            background: '#0070f3',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            marginTop: '20px'
          }}
        >
          Open Admin Interface
          <span style={{ marginLeft: '5px', fontSize: '0.8em' }}>↗</span>
        </a>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Cannabis Industry Website</p>
      </footer>
    </div>
  )
}