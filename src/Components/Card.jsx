import React from 'react'
import { X } from 'lucide-react';

const Card = ({ title, description, thumbnail, onClick, isExpanded, onClose, children }) => (
    <div className={`level-card rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
      isExpanded 
        ? 'fixed inset-4 z-50 flex flex-col' 
        : 'w-64 h-96 cursor-pointer hover:shadow-lg flex flex-col'
    }`}>
      {isExpanded && (
        <button onClick={onClose} className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full">
          <X size={24} />
        </button>
      )}
      <img src={thumbnail} alt={title} className={`w-full ${isExpanded ? 'h-1/3 object-cover' : 'h-40 object-cover'}`} />
      <div className="p-4 flex flex-col flex-grow overflow-hidden">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {isExpanded ? (
          <div className="overflow-y-auto flex-grow">
            {children}
          </div>
        ) : (
          <p className="text-sm text-white-600 flex-grow overflow-hidden">{description}</p>
        )}
        {!isExpanded && (
          <button onClick={onClick} className="mt-2 text-white-500 hover:text-blue-600">
            Learn More
          </button>
        )}
      </div>
    </div>
  );
  

export default Card