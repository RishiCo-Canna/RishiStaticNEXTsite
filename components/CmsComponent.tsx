
import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'

const CmsComponent = () => {
  const { data: session } = useSession()

  useEffect(() => {
    const initCMS = async () => {
      if (session) {
        const CMS = (await import('decap-cms-app')).default
        CMS.init()
      }
    }
    initCMS()
  }, [session])

  if (!session) {
    return (
      <div>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      </div>
    )
  }

  return <div id="nc-root" />
}

export default CmsComponent
