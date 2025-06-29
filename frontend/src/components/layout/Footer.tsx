import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-secondary-50 border-t border-primary-100 text-secondary-600 text-sm mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-medium text-primary-700">Telangana Learning Hub</span> — Made with ❤️ by <span className="font-medium text-primary-600">Sreevallabh Kakarala</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary-600 transition-colors">About</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};