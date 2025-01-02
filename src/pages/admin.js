import React from 'react'

const AdminPage = () => {
  React.useEffect(() => {
    // Decap CMS needs to be loaded in the browser
    import('decap-cms').then(() => {
      // Initialize the CMS
      window.CMS.init()
    })
  }, [])

  return <div>Loading Admin Dashboard...</div>
}

export default AdminPage