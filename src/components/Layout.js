import React from 'react'

const Layout = ({ children }) => {
  return (
    <div style={{ margin: '0 auto', maxWidth: '960px', padding: '2rem' }}>
      <header>
        <h1>Cannabis Industry Website</h1>
      </header>
      <main>{children}</main>
      <footer style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
        © {new Date().getFullYear()} Cannabis Industry Website
      </footer>
    </div>
  )
}

export default Layout
