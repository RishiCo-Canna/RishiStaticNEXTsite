import React from 'react'

const AdminPage = () => {
  React.useEffect(() => {
    // Netlify CMS needs to be loaded in the browser
    import('netlify-cms-app').then(({ default: CMS }) => {
      // Initialize the CMS
      CMS.init()
    })
  }, [])

  return <div>Loading Admin Dashboard...</div>
}

export default AdminPage