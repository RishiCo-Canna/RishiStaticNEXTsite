import React from 'react'
import { navigate } from 'gatsby'

const AdminPage = () => {
  React.useEffect(() => {
    // Decap CMS needs to be loaded in the browser
    import('decap-cms-app').then(({ default: CMS }) => {
      // Initialize the CMS
      CMS.init()
    })
  }, [])

  return <div>Loading Admin...</div>
}

export default AdminPage