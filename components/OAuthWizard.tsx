import { useState, useEffect } from 'react';

interface ConfigStatus {
  clientId: string;
  clientSecret: string;
  nextAuthSecret: string;
  siteUrl: string;
}

interface Step {
  id: number;
  title: string;
  status: 'pending' | 'loading' | 'success' | 'error';
  message: string;
}

export default function OAuthWizard() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: 'Checking Environment Configuration',
      status: 'pending',
      message: 'Verifying environment variables...'
    },
    {
      id: 2,
      title: 'Testing API Endpoints',
      status: 'pending',
      message: 'Waiting to check API endpoints...'
    },
    {
      id: 3,
      title: 'Verifying GitHub OAuth',
      status: 'pending',
      message: 'Waiting to verify GitHub OAuth configuration...'
    }
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [configStatus, setConfigStatus] = useState<ConfigStatus | null>(null);

  // Function to update step status
  const updateStep = (stepId: number, status: Step['status'], message: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, status, message } : step
      )
    );
  };

  // Check environment configuration
  const checkEnvironmentConfig = async () => {
    try {
      updateStep(1, 'loading', 'Checking environment variables...');
      const response = await fetch('/api/auth/test');
      const data = await response.json();
      
      if (data.status === 'success') {
        setConfigStatus(data.config);
        updateStep(1, 'success', 'Environment variables configured correctly');
        setCurrentStep(2);
      } else {
        updateStep(1, 'error', 'Failed to verify environment configuration');
      }
    } catch (error) {
      updateStep(1, 'error', `Error checking configuration: ${error}`);
    }
  };

  // Start the wizard when component mounts
  useEffect(() => {
    checkEnvironmentConfig();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">OAuth Configuration Wizard</h2>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {step.title}
              </h3>
              <div className="flex items-center">
                {step.status === 'loading' && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                )}
                {step.status === 'success' && (
                  <span className="text-green-500">✓</span>
                )}
                {step.status === 'error' && (
                  <span className="text-red-500">⚠</span>
                )}
              </div>
            </div>
            <p className={`mt-2 text-sm ${
              step.status === 'error' ? 'text-red-500' : 
              step.status === 'success' ? 'text-green-600' : 
              'text-gray-600'
            }`}>
              {step.message}
            </p>
          </div>
        ))}
      </div>

      {configStatus && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Configuration Details:</h3>
          <ul className="space-y-2 text-sm">
            <li>Client ID: {configStatus.clientId}</li>
            <li>Client Secret: {configStatus.clientSecret}</li>
            <li>NextAuth Secret: {configStatus.nextAuthSecret}</li>
            <li>Site URL: {configStatus.siteUrl}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
