'use client';

import SurveyForm from './components/SurveyForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Software Development Survey
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Help us understand your familiarity with software development
            </p>
          </div>
        </div>
      </div>

      {/* Survey Form */}
      <SurveyForm />
    </div>
  );
}
