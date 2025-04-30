import React, { useState, useEffect } from 'react';
import { Search, Printer, Settings, CirclePlus } from 'lucide-react';
import Header from "../Header";
import Drawer from "../Drawer";
import axios from 'axios';
import Tabel from '../Tabel'; 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
console.log(API_BASE_URL)


const PriceList = () => {
  // UI state management
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Search fields
  const [searchArticle, setSearchArticle] = useState('');
  const [searchProduct, setSearchProduct] = useState('');

  // Product data state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit product state
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => { // Handle screen resizing for responsive logic
    const handleResize = () => {
      const width = window.innerWidth;
  
      setIsMobile(width < 820);
      setIsTablet(width >= 820 && width < 1024);
      setIsMedium(width >= 1024 && width < 1136); 
      setIsDesktop(width >= 1136);
  
      setDrawerOpen(width >= 820); 
    };
  
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message || "Failed to fetch product");
        setLoading(false);
      }
    };
    getProducts();
  }, []);
   
  const toggleDrawer = () => { // Toggle the sidebar drawer
    setDrawerOpen(!drawerOpen);
  };

  // Filter products based on article number and product name
  const filteredProducts = products?.filter(product => {
    const matchesArticle = product.articleNo?.toLowerCase().includes(searchArticle.toLowerCase());
    const matchesProduct = product.productService?.toLowerCase().includes(searchProduct.toLowerCase());
    return matchesArticle && matchesProduct;
  });

  // Start editing a product
  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find(p => p.id === productId);
    if (productToEdit) {
      setEditedData({ ...productToEdit });
    }
  };

  const handleInputChange = (name, value) => {
    setEditedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (productId) => { // Save edited product to backend
    try {
      await axios.put(`${API_BASE_URL}/products/${productId}`, editedData);
      const updatedProducts = products.map(p =>
        p.id === productId ? { ...p, ...editedData } : p
      );
      setProducts(updatedProducts);
      setEditingProductId(null);
      setEditedData({});
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => { // Cancel editing mode
    setEditingProductId(null);
    setEditedData({});
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Sticky Header */}
      <Header onMenuClick={toggleDrawer} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Drawer */}
        <Drawer isOpen={drawerOpen} onMenuClick={toggleDrawer} />
        {/* Main Section */}
        <div
          className={`transition-all duration-300 ease-in-out flex-1 overflow-y-auto
            ${drawerOpen && !isMobile ? 'md:ml-60' : 'ml-0'}
            ${drawerOpen && isMobile ? 'hidden' : 'block'}`} >
          <div className="pt-5 pr-7">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-col lg:flex-row justify-between items-start gap-4 mb-6 ml-7">
              {/* Search Inputs */}
              <div className="flex flex-col gap-3 w-full lg:w-auto md:w-full">
                <div className="relative flex-1 shadow-md rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search Article No..."
                    className="w-full pl-5 pr-5 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-md text-bold"
                    value={searchArticle}
                    onChange={(e) => setSearchArticle(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                </div>
                <div className="relative flex-1 shadow-md rounded-full overflow-hidden">
                  <input
                    type="text"
                    placeholder="Search Product..."
                    className="w-full pl-5 pr-5 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 text-md text-bold"
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-auto md:w-full lg:w-auto sm:justify-between">
                <button
                  className="flex items-center justify-center gap-2 px-10 xl:px-4 py-1 bg-white rounded-full text-md overflow-hidden w-full xl:w-auto md:w-auto "
                  style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)' }}
                >
                  <span className="hidden xl:inline text-md text-gray-400">New Product</span>
                  <CirclePlus className="h-5 w-5 text-green-400" />
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-10 xl:px-4 md:px- bg-white rounded-full text-md overflow-hidden w-full xl:w-auto md:w-auto"
                  style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)' }}
                >
                  <span className="hidden xl:inline text-md text-gray-400">Print List</span>
                  <Printer className="h-5 w-5 text-blue-400" />
                </button>
                <button
                  className="flex items-center justify-center gap-2 px-10 xl:px-4 py-1 bg-white rounded-full text-md overflow-hidden w-full xl:w-auto md:w-auto"
                  style={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)' }}
                >
                  <span className="hidden xl:inline text-md text-gray-400">Advanced Mode</span>
                  <Settings className="h-5 w-5 text-blue-400" />
                </button>
              </div>
            </div>

            {/* Product Table */}
            <Tabel  products={filteredProducts} loading={loading} error={error} isMobile={isMobile} isTablet={isTablet} isMedium={isMedium} isDesktop={isDesktop}
              drawerOpen={drawerOpen} editingProductId={editingProductId} editedData={editedData} handleEdit={handleEdit} handleInputChange={handleInputChange}
              handleSave={handleSave}handleCancelEdit={handleCancelEdit}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceList;