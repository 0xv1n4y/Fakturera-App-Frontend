import React, { useState } from 'react';
import {  FileText, Users, Briefcase, List,  Copy, AlertCircle, Package, UserCheck, ArrowLeftRight, LogOut, Scroll,   ChevronRight   } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const Drawer = ({ isOpen }) => {
  // Hook for navigation
  const navigate = useNavigate();

  // State to keep track of the selected menu item's name
  const [selectedItem, setSelectedItem] = useState('Price List'); // Default selection

  const menuItems = [
    { id: 1, name: "Invoices", logo: FileText, logoColor: "#3B82F6" }, // Blue-500
    { id: 2, name: "Customers", logo: Users, logoColor: "#3B82F6" },
    { id: 3, name: "My Business", logo: Briefcase, logoColor: "#3B82F6" },
    { id: 4, name: "Invoice journal", logo: FileText, logoColor: "#3B82F6" },
    { id: 5, name: "Price List", logo: List, logoColor: "#3B82F6" }, // Item with functionality
    { id: 6, name: "Terms", logo: Scroll, logoColor: "#3B82F6" },
    { id: 7, name: "Unpaid Invoices", logo: AlertCircle, logoColor: "#EF4444" }, // Red-500 for alert
    { id: 8, name: "Offer", logo: FileText, logoColor: "#3B82F6" },
    { id: 9, name: "Inventory Control", logo: Package, logoColor: "#3B82F6" },
    { id: 10, name: "Member Invoicing", logo: UserCheck, logoColor: "#3B82F6" },
    { id: 11, name: "Import/Export", logo: ArrowLeftRight, logoColor: "#3B82F6" },
    { id: 12, name: "Log out", logo: LogOut, logoColor: "#3B82F6" },
    { id: 13, name: "Multiple Invoicing", logo: Copy, logoColor: "#3B82F6" },
  ];

  // Handler for Price List click
  const handlePriceListClick = (itemName) => {
    setSelectedItem(itemName);
  };

  // Handler for Terms click - navigates to '/terms' route
  const handleTermsClick = () => {
    navigate('/terms');
  };

  return (
    <div
      className={`fixed top-[74px] left-0 h-[calc(100vh-74px)] w-60 bg-white shadow-lg text-gray-800 transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        xl:translate-x-0 xl:shadow-md xl:shadow-gray-400`} 
    >
      <div className='p-4 flex flex-col gap-2 h-full'> 
        <h2 className='flex justify-center font-semibold text-gray-700 text-xl mb-2'>Menu</h2> 
        <div className='border-b-2 border-blue-300 mb-2'></div> 

        <ul className='flex flex-col gap-1 min-h-0 overflow-y-auto scroll-smooth scrollbar-invisible '>
          {menuItems.map((item) => {
            const Icon = item.logo || ChevronRight; // Use Lucide fallback icon
            const isSelected = item.name === selectedItem;

            // Determine onClick handler
            let onClickHandler = () => {}; // Default dummy handler
            if (item.name === 'Price List') {
              onClickHandler = () => handlePriceListClick(item.name);
            } else if (item.name === 'Terms') {
              onClickHandler = handleTermsClick;
            }

            return (
              <li key={item.id}>
                <button // Using button for better accessibility
                  onClick={onClickHandler}
                  className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm transition-colors duration-200
                    ${isSelected
                      ? 'bg-blue-100 text-blue-700 font-medium' // Style for selected item
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Style for non-selected items
                    }
                    ${item.name !== 'Price List' && item.name !== 'Terms' ? 'cursor-default' : 'cursor-pointer'} // Change cursor for non-clickable items
                  `}
                  // Disable button if it's not Price List or Terms? Optional.
                  // disabled={item.name !== 'Price List' && item.name !== 'Terms'}
                >
                  {/* Lucide icons are components, pass size and color via props */}
                  <Icon
                    style={{ color: isSelected ? '#2563EB' : item.logoColor }} // Use theme color for selected icon?
                    size={18} // Standard lucide-react size prop
                    strokeWidth={isSelected ? 2.5 : 2} // Make selected icon bolder? Optional.
                  />
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
