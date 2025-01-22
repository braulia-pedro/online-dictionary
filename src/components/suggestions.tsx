"use client";

import React, { useEffect, useState } from "react";

type SuggestProps = {
  query: string;
};

export default function Suggest({ query }: SuggestProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) return setSuggestions([]);
      try {
        const response = await fetch(`http://localhost:5000/suggestions/${query}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <ul className="absolute w-full bg-white border rounded shadow mt-1">
      {suggestions.map((item, index) => (
        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          {item}
        </li>
      ))}
    </ul>
  );
}