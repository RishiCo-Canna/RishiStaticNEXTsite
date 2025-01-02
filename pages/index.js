import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={inter.className}>
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Welcome to Cannabis Industry Website
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Built with Next.js
        </p>
      </main>
    </div>
  )
}