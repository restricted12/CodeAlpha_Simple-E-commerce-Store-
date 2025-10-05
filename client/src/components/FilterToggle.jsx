import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import './FilterToggle.css';

const FilterToggle = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="filter-toggle-container">
      <button 
        className="filter-toggle-header" 
        onClick={toggleFilter}
        aria-expanded={isOpen}
      >
        <span className="filter-toggle-title">{title}</span>
        <span className="filter-toggle-icon">
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </span>
      </button>
      <div className={`filter-toggle-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default FilterToggle; 