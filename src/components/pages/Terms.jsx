import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TermsNavbar from '../TermsNavbar';
import TermsContent from '../TermsContent';
import backgroundImage from '../../assets/wallpaper.jpg'; // Ensure high resolution

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

const Terms = () => {
  // --- State, Effect, Loading/Error Handling (remains the same) ---
  const [selectedLanguage, setSelectedLanguage] = useState('sv');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/terms/${selectedLanguage}`);
        if (response.data && response.data.length > 0) {
          setData(response.data[0]);
        } else {
          setData({});
          setError('No data available.');
        }
      } catch (err) {
        console.error("Error fetching terms:", err);
        setError(err.message || 'Failed to load terms.');
        setData({});
      }
      setIsLoading(false);
    };
    fetchData();
  }, [selectedLanguage]);

  if (isLoading || !data || Object.keys(data).length === 0) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }
  // --- End of State/Effect ---


  return (
    // Outer container: Relative positioning context, min-height for initial view.
    <div className="relative min-h-screen text-white"> {/* Removed overflow-x-hidden temporarily */}

      {/* 1. Fixed Background Layer */}
      <div
        className="fixed inset-0 -z-10" // Position fixed, cover viewport (top/right/bottom/left=0), stay behind content
        aria-hidden="true" // Hide decorative background from screen readers
      >
        <img
          src={backgroundImage}
          alt="" // Decorative image, alt can be empty
          // Absolute position to fill parent, cover ensures it fills while keeping aspect ratio
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center' }} // Center the image within its container
        />
      </div>

      {/* 2. Scrollable Content Layer */}
      {/* Relative position, allow it to stack correctly on top of the fixed background */}
      {/* Needs min-h-screen if content might be shorter than the screen */}
      {/* CRITICAL: This container and its children (TermsNavbar, TermsContent) must NOT have opaque backgrounds */}
      <div className="relative flex flex-col min-h-screen">
        {/* Optional: Add a semi-transparent overlay directly here if needed for readability */}
        {/* <div className="absolute inset-0 bg-black/50 -z-[5]"></div> */} {/* Example overlay */}

        <TermsNavbar
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          navItems={data.list || []}
          // Ensure TermsNavbar has no opaque background, or is styled appropriately (e.g., semi-transparent)
        />
        <TermsContent
          data={data}
          // CRITICAL: Ensure TermsContent does NOT have an opaque background color set internally or via CSS classes
        />
      </div>
    </div>
  );
};

export default Terms;