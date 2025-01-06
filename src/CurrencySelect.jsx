import React from "react";
    import Select from "react-select";

    const currencyOptions = [
      { value: "USD", label: "🇺🇸 USD" },
      { value: "EUR", label: "🇪🇺 EUR" },
      { value: "GBP", label: "🇬🇧 GBP" },
      { value: "JPY", label: "🇯🇵 JPY" },
      { value: "INR", label: "🇮🇳 INR" },
      { value: "AUD", label: "🇦🇺 AUD" },
      { value: "CAD", label: "🇨🇦 CAD" },
      { value: "CHF", label: "🇨🇭 CHF" },
      { value: "CNY", label: "🇨🇳 CNY" },
      { value: "SEK", label: "🇸🇪 SEK" },
      { value: "NZD", label: "🇳🇿 NZD" },
    ];

    const CurrencySelect = ({ value, onChange }) => {
      return (
        <Select
          options={currencyOptions}
          value={currencyOptions.find((option) => option.value === value)}
          onChange={(selectedOption) => onChange(selectedOption.value)}
          className="w-full"
          instanceId="currency-select"
        />
      );
    };

    export default CurrencySelect;
