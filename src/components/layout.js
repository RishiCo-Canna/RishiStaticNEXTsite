import * as React from "react"

const Layout = ({ children }) => {
  return (
    <div style={{ margin: '0 auto', maxWidth: 960, padding: '1rem' }}>
      <header style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>
          Cannabis Industry Website
        </h1>
      </header>
      <main>{children}</main>
      <footer style={{
        marginTop: '2rem',
        fontSize: '0.8rem'
      }}>
        © {new Date().getFullYear()} Cannabis Industry Website
      </footer>
    </div>
  )
}

export default Layout
