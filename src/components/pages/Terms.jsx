import React, { useEffect, useState } from 'react';
import backgroundImage from '../../assets/wallpaper.jpg';
import axios from 'axios';
import TermsNavbar from '../TermsNavbar';
import TermsContent from '../TermsContent';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    <div
      style={{ backgroundImage: `url('${backgroundImage}')`, backgroundAttachment: 'fixed',  backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
        minHeight: '100vh', width: '100%', color: 'white', overflowX: 'hidden',}}>
      <div className="flex flex-col justify-center items-center">
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
