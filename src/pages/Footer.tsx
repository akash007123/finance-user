import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 text-black font-bold py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-center md:text-left hover:text-yellow-400">
          <a
            href="https://akashraikwar.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Akash Raikwar
          </a>
        </p>
        <div className="flex space-x-5">
          <a
            href="https://github.com/akash007123"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/akash-raikwar-4a67bb171/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:akashraikwar763@gmail.com"
            className="hover:text-yellow-400 transition"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


