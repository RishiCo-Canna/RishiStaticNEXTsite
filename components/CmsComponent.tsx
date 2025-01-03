import { useEffect } from 'react'

const CmsComponent = () => {
  useEffect(() => {
    console.log('CMS Component mounted')
  }, [])

  // The actual CMS is loaded in /public/admin/index.html
  return <div id="nc-root" />
}

export default CmsComponent