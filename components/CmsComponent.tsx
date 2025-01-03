import { useEffect, useState } from 'react'
import { CmsErrorWizard } from './CmsErrorWizard'

const CmsComponent = () => {
  const [error, setError] = useState<Error | null>(null);
  const [showErrorWizard, setShowErrorWizard] = useState(false);

  useEffect(() => {
    const initCMS = async () => {
      try {
        console.log('CMS Component mounted')
        // Your existing CMS initialization code
      } catch (err) {
        console.error('CMS initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize CMS'));
        setShowErrorWizard(true);
      }
    };

    initCMS();
  }, [])

  if (error && showErrorWizard) {
    return (
      <CmsErrorWizard 
        error={error}
        onClose={() => {
          setShowErrorWizard(false);
          window.location.reload();
        }}
      />
    );
  }

  // The actual CMS is loaded in /public/admin/index.html
  return <div id="nc-root" />
}

export default CmsComponent