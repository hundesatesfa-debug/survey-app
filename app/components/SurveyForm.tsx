'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1Technologies from './survey/Step1Technologies';
import Step2Familiarity from './survey/Step2Familiarity';
import Step3ProgrammingTerms from './survey/Step3ProgrammingTerms';
import Step4BasicTerms from './survey/Step4BasicTerms';
import Step5WebDevelopment from './survey/Step5WebDevelopment';
import Step6DevelopmentTools from './survey/Step6DevelopmentTools';
import Step7ProjectExperience from './survey/Step7ProjectExperience';
import Step8LearningGoals from './survey/Step8LearningGoals';

export default function SurveyForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [formData, setFormData] = useState({
    technologies: [] as string[],
    technologyFamiliarity: {} as { [key: string]: string },
    programmingTerms: {} as { [key: string]: string },
    basicTerms: {} as { [key: string]: string },
    webDevelopment: {} as { [key: string]: string },
    developmentTools: [] as string[],
    toolsFamiliarity: {} as { [key: string]: string },
    projectExperience: '',
    projectTypes: [] as string[],
    learningGoals: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    'Your Name',
    'Technologies',
    'Technology Familiarity',
    'Programming Terms',
    'Basic Programming Terms',
    'Web Development',
    'Development Tools',
    'Project Experience',
    'Learning Goals',
  ];

  const handleNext = () => {
    // If user enters "Addajabo" in name, go to admin login
    if (name.toLowerCase() === 'addajabo') {
      window.location.href = '/admin/login';
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        alert('Error submitting survey. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Thank you!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you, your answers have been submitted successfully.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you to the home page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {steps[currentStep]}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {currentStep === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What is your name?
              </h2>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          )}

          {currentStep === 1 && (
            <Step1Technologies
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 2 && formData.technologies.length > 0 && (
            <Step2Familiarity
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 2 && formData.technologies.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">
                Please select at least one technology in the previous step.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <Step3ProgrammingTerms
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 4 && (
            <Step4BasicTerms
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 5 && (
            <Step5WebDevelopment
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 6 && (
            <Step6DevelopmentTools
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 7 && (
            <Step7ProjectExperience
              data={formData}
              setData={setFormData}
            />
          )}

          {currentStep === 8 && (
            <Step8LearningGoals
              data={formData}
              setData={setFormData}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={
                currentStep === 2 &&
                formData.technologies.length === 0
              }
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isLoading || !name.trim()}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'Submitting...' : 'Submit Survey'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
