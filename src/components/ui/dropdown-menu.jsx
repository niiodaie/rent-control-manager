import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild, isOpen, setIsOpen }) => {
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button onClick={handleClick} className="inline-flex items-center">
      {children}
    </button>
  );
};

const DropdownMenuContent = ({ children, align = 'start', isOpen }) => {
  if (!isOpen) return null;

  const alignmentClasses = {
    start: 'left-0',
    end: 'right-0',
    center: 'left-1/2 transform -translate-x-1/2'
  };

  return (
    <div
      className={`absolute z-50 mt-2 w-56 rounded-md border bg-white shadow-lg ${alignmentClasses[align]}`}
    >
      <div className="py-1">
        {children}
      </div>
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${className}`}
    >
      {children}
    </button>
  );
};

const DropdownMenuSeparator = () => {
  return <div className="my-1 h-px bg-gray-200" />;
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};

