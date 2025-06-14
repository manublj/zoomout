'use client';

import React from 'react';

export default function FooterBar() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Timeline App. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 