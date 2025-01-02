import { useEffect } from 'react'
import CMS from 'decap-cms-app'
import 'decap-cms-backend-github'

// Extend Window interface to include CMS_ENV
declare global {
  interface Window {
    CMS_ENV?: string;
  }
}

const CmsComponent = () => {
  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      // Use local backend in development
      window.CMS_ENV = 'development'
    }

    // Initialize Decap CMS
    CMS.init()
  }, [])

  return null
}

export default CmsComponent