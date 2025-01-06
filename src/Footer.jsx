import React from "react";

    const Footer = ({ darkMode }) => {
      return (
        <footer
          className={`py-4 text-center ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-600"
          }`}
        >
          <p>
            Powered by{" "}
            <a
              href="https://www.exchangerate-api.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              ExchangeRate-API
            </a>
          </p>
        </footer>
      );
    };

    export default Footer;
