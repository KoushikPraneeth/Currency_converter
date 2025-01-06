import React, { useState, useEffect } from "react";
    import CurrencySelect from "./CurrencySelect";
    import Footer from "./Footer";
    import { ClipLoader } from "react-spinners";
    import axios from "axios";
    import { FaExchangeAlt } from "react-icons/fa";

    const API_KEY = "bada0d16cd1520abd5b050a4";

    function CurrencyConverter() {
      const [amount, setAmount] = useState(1);
      const [baseCurrency, setBaseCurrency] = useState("USD");
      const [targetCurrency, setTargetCurrency] = useState("EUR");
      const [result, setResult] = useState(null);
      const [darkMode, setDarkMode] = useState(false);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);

      useEffect(() => {
        const userPrefersDark =
          localStorage.getItem("darkMode") === "true" ||
          (localStorage.getItem("darkMode") === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setDarkMode(userPrefersDark);
      }, []);

      useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", darkMode);
      }, [darkMode]);

      const handleConvert = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${targetCurrency}/${amount}`
          );
          if (response.data.result === "success") {
            setResult(response.data.conversion_result.toFixed(2));
          } else {
            setError("Failed to fetch exchange rates.");
          }
        } catch (err) {
          setError("Error fetching exchange rates. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      const handleSwap = () => {
        setBaseCurrency(targetCurrency);
        setTargetCurrency(baseCurrency);
        if (result) {
          handleConvert();
        }
      };

      const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      };

      return (
        <div
          className={`min-h-screen flex flex-col items-center justify-center ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleDarkMode}
              className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="fill-violet-700 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <header className="text-center mb-8">
            <h1 className={`text-4xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Currency Converter</h1>
          </header>
          <main className={`w-full max-w-md p-8 rounded-lg shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className={`block text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                  darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-700"
                }`}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-5/12">
                <label
                  htmlFor="baseCurrency"
                  className={`block text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  From
                </label>
                <CurrencySelect value={baseCurrency} onChange={setBaseCurrency} />
              </div>
              <button
                onClick={handleSwap}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  darkMode ? "bg-blue-700" : "bg-blue-500"
                }`}
              >
                <FaExchangeAlt size={20} />
              </button>
              <div className="w-5/12">
                <label
                  htmlFor="targetCurrency"
                  className={`block text-sm font-bold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  To
                </label>
                <CurrencySelect value={targetCurrency} onChange={setTargetCurrency} />
              </div>
            </div>
            <button
              onClick={handleConvert}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
                darkMode ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              Convert
            </button>
            {isLoading ? (
              <div className="mt-6 text-center">
                <ClipLoader color={darkMode ? "#ffffff" : "#3182ce"} loading={true} size={35} />
              </div>
            ) : error ? (
              <div className={`mt-6 text-center text-red-500 ${darkMode ? "text-red-400" : "text-red-500"}`}>
                {error}
              </div>
            ) : (
              result && (
                <div className="mt-6 text-center">
                  <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {amount} {baseCurrency} = {result} {targetCurrency}
                  </p>
                </div>
              )
            )}
          </main>
          <Footer darkMode={darkMode} />
        </div>
      );
    }

    export default CurrencyConverter;
