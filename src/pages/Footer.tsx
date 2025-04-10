import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Finance Tracker. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-yellow-400 text-sm transition">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400 text-sm transition">Terms</a>
          <a href="#" className="hover:text-yellow-400 text-sm transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
