import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TermsNavbar from '../TermsNavbar';
import TermsContent from '../TermsContent';
import backgroundImage from '../../assets/wallpaper.jpg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

const Terms = () => {
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

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* Background layer */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="flex flex-col justify-center items-center min-h-screen">
        <TermsNavbar
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          navItems={data.list || []}
        />
        <TermsContent data={data} />
      </div>
    </div>
  );
};

export default Terms;
