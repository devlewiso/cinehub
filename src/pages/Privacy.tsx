import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Privacy Policy
      </h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to CineHub. We respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we handle your data when you visit our website.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Information We Collect
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We collect and use the following data:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600 dark:text-gray-400">
            <li>Usage Data (through Google Analytics)</li>
            <li>Search queries for movies</li>
            <li>Browser preferences (like dark mode setting)</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            How We Use Your Data
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600 dark:text-gray-400">
            <li>Improve our website and services</li>
            <li>Analyze user behavior and preferences</li>
            <li>Maintain and optimize website performance</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Third-Party Services
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use the following third-party services:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600 dark:text-gray-400">
            <li>Google Analytics for website analytics</li>
            <li>OMDB API for movie data</li>
            <li>Netlify for website hosting</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            For any questions about this privacy policy, please contact us at:
            <br />
            <a 
              href="https://neuralcodelab.com" 
              className="text-primary-600 dark:text-primary-400 hover:underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              neuralcodelab.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;