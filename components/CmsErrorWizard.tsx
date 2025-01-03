import React, { useState, useEffect } from 'react';

interface ErrorStep {
  id: string;
  title: string;
  description: string;
  solution: string;
  verify: () => Promise<boolean>;
}

interface CmsErrorWizardProps {
  error: Error;
  onClose: () => void;
}

export const CmsErrorWizard: React.FC<CmsErrorWizardProps> = ({ error, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);

  // Error classification and steps definition
  const getErrorSteps = (error: Error): ErrorStep[] => {
    if (error.message.includes('config.yml')) {
      return [{
        id: 'config-missing',
        title: 'Configuration File Issue',
        description: 'The CMS configuration file could not be loaded properly.',
        solution: 'Verify that your config.yml exists and is properly formatted.',
        verify: async () => {
          // Add verification logic
          return true;
        }
      }];
    }

    if (error.message.includes('authentication')) {
      return [{
        id: 'auth-error',
        title: 'Authentication Problem',
        description: 'There seems to be an issue with GitHub authentication.',
        solution: 'Check your OAuth credentials and ensure they are properly configured.',
        verify: async () => {
          // Add verification logic
          return true;
        }
      }];
    }

    // Default error steps
    return [{
      id: 'general-error',
      title: 'General CMS Error',
      description: 'An unexpected error occurred in the CMS.',
      solution: 'Try refreshing the page or check the console for more details.',
      verify: async () => {
        // Add verification logic
        return true;
      }
    }];
  };

  const steps = getErrorSteps(error);
  const currentStep = steps[currentStepIndex];

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const result = await currentStep.verify();
      setVerificationResult(result);
      if (result && currentStepIndex < steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      }
    } catch (err) {
      console.error('Verification failed:', err);
      setVerificationResult(false);
    }
    setIsVerifying(false);
  };

  return (
    <div className="cms-error-wizard" style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      maxWidth: '500px',
      width: '90%'
    }}>
      <h2 style={{ marginTop: 0 }}>CMS Error Diagnosis Wizard</h2>
      
      <div className="step-indicator" style={{ marginBottom: '20px' }}>
        Step {currentStepIndex + 1} of {steps.length}
      </div>

      <div className="step-content">
        <h3>{currentStep.title}</h3>
        <p>{currentStep.description}</p>
        <div className="solution" style={{ 
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <strong>Suggested Solution:</strong>
          <p>{currentStep.solution}</p>
        </div>

        {verificationResult !== null && (
          <div style={{ 
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: verificationResult ? '#e6ffe6' : '#ffe6e6',
            borderRadius: '4px'
          }}>
            {verificationResult ? 'Step completed successfully!' : 'Verification failed. Please try again.'}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#f5f5f5'
            }}
          >
            Close
          </button>
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isVerifying ? 'wait' : 'pointer'
            }}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};
