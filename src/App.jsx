import { useState } from 'react';
import Case from './components/Case';

export default function App() {
  return (
    <Case>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/src/image/logo.png" alt="Your Logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome to Your Inventory App
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Manage your inventory efficiently and effectively
            </p>
          </div>
          <div className="rounded-lg shadow-md bg-white p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time inventory tracking</li>
              <li>Detailed analytics and reporting</li>
              <li>Easy stock management</li>
              <li>User-friendly interface</li>
            </ul>
          </div>
        </div>
      </div>
    </Case>
  );
}