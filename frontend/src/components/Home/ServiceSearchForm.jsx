// src/components/Home/ServiceSearchForm.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function ServiceSearchForm({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-4 p-6 bg-white rounded-b-xl"
    >
      <input
        type="text"
        placeholder="Search for a service"
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="bg-[#22b99a] rounded-xl w-12 h-12 flex items-center justify-center text-white"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
}
