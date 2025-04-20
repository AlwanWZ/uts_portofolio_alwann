import React from 'react';

interface FooterProps {
  isDarkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode = true }) => {
  // Default to dark mode to match the portfolio screenshot
  const currentYear = new Date().getFullYear();
  
  return (
    <footer
      className={`w-full py-10 ${
        isDarkMode ? 'bg-[#121828]' : 'bg-white'
      } border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
      <div className="container mx-auto px-6">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="mr-3">
              <svg 
                className="w-10 h-10 text-blue-500" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-10.5C10 8.67 10.67 8 11.5 8s1.5.67 1.5 1.5S12.33 11 11.5 11 10 10.33 10 9.5zm5 0c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5S12.67 8 13.5 8s1.5.67 1.5 1.5zm-.75 3.38c-.78.56-1.75.87-2.75.87s-1.97-.31-2.75-.87c-.24-.17-.54-.21-.82-.1-.28.11-.48.36-.52.66-.04.3.1.6.35.81.98.71 2.2 1.1 3.49 1.1s2.51-.39 3.49-1.1c.25-.18.39-.47.35-.77s-.24-.55-.52-.66c-.28-.11-.58-.07-.82.1z" />
              </svg>
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Alwan
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Web Developer & UI/UX Enthusiast
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AlwanWZ"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-[#1a2233] hover:bg-blue-500 hover:text-white' : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.12-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.64 1.58.24 2.75.12 3.04.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.08.8 2.18v3.23c0 .31.21.67.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-[#1a2233] hover:bg-blue-500 hover:text-white' : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.34 19H5.67V9h2.67v10zM7 7.75C6.03 7.75 5.25 6.97 5.25 6S6.03 4.25 7 4.25 8.75 5.03 8.75 6 7.97 7.75 7 7.75zM19 19h-2.67v-5.33c0-1.27-.02-2.91-1.77-2.91-1.77 0-2.04 1.38-2.04 2.81V19h-2.67V9h2.56v1.37h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.23 1.8 3.23 4.14V19z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/alwan_2ez?igsh=eWR0a2tybWkyaDUx"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-[#1a2233] hover:bg-blue-500 hover:text-white' : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.15.63c-.78.3-1.44.7-2.1 1.37-.67.66-1.07 1.32-1.37 2.1C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.06 1.27.26 2.15.56 2.9.3.78.7 1.44 1.37 2.1.66.67 1.32 1.07 2.1 1.37.75.3 1.63.5 2.9.56C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 1.27-.06 2.15-.26 2.9-.56.78-.3 1.44-.7 2.1-1.37.67-.66 1.07-1.32 1.37-2.1.3-.75.5-1.63.56-2.9.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.06-1.27-.26-2.15-.56-2.9-.3-.78-.7-1.44-1.37-2.1-.66-.67-1.32-1.07-2.1-1.37-.75-.3-1.63-.5-2.9-.56C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16 0 3.4 2.76 6.16 6.16 6.16 3.4 0 6.16-2.76 6.16-6.16 0-3.4-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4zm7.84-10.4c0 .79-.64 1.44-1.44 1.44-.79 0-1.44-.65-1.44-1.44 0-.79.65-1.44 1.44-1.44.8 0 1.44.65 1.44 1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Middle section with links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About</h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Me</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">My Journey</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Experience</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Skills</h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile Development</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Database Management</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Portfolio</h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Web Projects</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">UI Designs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Graphic Design</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact</h4>
            <ul className={`space-y-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:alwan@example.com" className="hover:text-blue-400 transition-colors">alwanwildan942@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+6281234567890" className="hover:text-blue-400 transition-colors">+62 812-3456-7890</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Lampung, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {currentYear} Alwan. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} mr-4 transition-colors`}>Privacy Policy</a>
            <a href="#" className={`text-sm ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
