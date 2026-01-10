import React, { useEffect } from 'react';
import { useToast } from '../components/common/Toast';
import { Link } from 'react-router-dom';

const Placeholder = ({ pageTitle = "Coming Soon" }) => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast(`The "${pageTitle}" feature is in demo mode.`, 'info');
  }, [pageTitle, showToast]);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3 text-gray-900">{pageTitle}</h1>
        <p className="text-gray-600 mb-6">
          This feature is currently under development for the demo version.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-[#FFD814] hover:bg-[#F7CA00] text-black font-medium py-2 px-6 rounded-md border border-yellow-500 shadow-sm transition-colors"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
};

export default Placeholder;
