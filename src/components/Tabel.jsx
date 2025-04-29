import React from 'react';
import { ArrowRight, Ellipsis, ArrowDown } from 'lucide-react';

const Tabel = ({ products, loading, error, isMobile, isTablet, isMedium, isDesktop, drawerOpen, editingProductId, editedData, handleEdit, handleInputChange, handleSave, handleCancelEdit,}) => {
  return (
     <div className="overflow-x-auto bg-white">
        <div style={{ maxHeight: '380px', overflowY: 'auto' }} className='scroll-smooth scrollbar-invisible'>
        <table className="min-w-full ">
            <thead className='sticky top-0 bg-white '>
            <tr>
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* Empty header for the arrow icon */}
                </th>
                {(isMedium || isDesktop) && (
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className='lg:flex items-center gap-2'>
                    <span>Article No.</span>
                    <ArrowDown className='hidden h-5 lg:block  text-blue-400' />
                    </div>
                </th>
                )}
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className='lg:flex items-center gap-2'>
                    <span>Product/Service</span>
                    <ArrowDown className='hidden h-5 lg:block  text-green-400' />
                </div>
                </th>
                {isDesktop && (<th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                In Price
                </th>)}
                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
                </th>
                {(isMedium || isDesktop) && (
                <>
                    <th scope="col" className="p-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    In Stock
                    </th>
                    <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                    </th>
                </>
                )}

                {isDesktop && (
                     <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                     Description
                     </th>
                )}

                <th scope="col" className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {/* Edit/Save/Cancel Actions */}
                </th>
            </tr>
            </thead>
            <tbody className="bg-white">
            {loading ? (
                <tr><td colSpan="100%" className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Loading products...</td></tr>
            ) : error ? (
                <tr><td colSpan="100%" className="px-3 py-4 whitespace-nowrap text-sm text-red-500 text-center">Error: {error}</td></tr>
            ) : (
                products.map((product, index) => (
                <tr key={product.id}>
                    <td className="whitespace-nowrap text-sm text-gray-900 ">
                    {index === products.length - 1 && <ArrowRight className='h-5  text-blue-500 mr-2' />}
                    </td>
                    {(isMedium || isDesktop) && (
                    <td className=" whitespace-nowrap text-sm text-gray-900 ">
                        {editingProductId === product.id ? (
                        <input
                            type="text"
                            name="articleNo"
                            value={editedData.articleNo || ''}
                            onChange={(e) => handleInputChange('articleNo', e.target.value)}
                            className="py-1 px-3 rounded-full border border-blue-300 w-full"
                        />
                        ) : (
                        <span className='py-1 px-3 rounded-full border border-blue-300'>{product.articleNo}</span>
                        )}
                    </td>
                    )}
                    <td className="whitespace-nowrap text-sm text-gray-900">
                    {editingProductId === product.id ? (
                        <input
                        type="text"
                        name="productService"
                        value={editedData.productService || ''}
                        onChange={(e) => handleInputChange('productService', e.target.value)}
                        className={`py-1 px-3 rounded-full border border-blue-300 w-full ${isMobile || (isTablet && drawerOpen) ? 'text-ellipsis overflow-hidden' : ''}`}
                        />
                    ) : (
                        <span className={`py-1 px-3 rounded-full border border-blue-300 ${isMobile || (isTablet && drawerOpen) ? 'text-ellipsis overflow-hidden' : ''}`}>{ (isMobile || (isTablet && drawerOpen)) ? product.productService.slice(0,20) : product.productService}</span>
                    )}
                    </td>
                    {isDesktop && (<td className="whitespace-nowrap text-sm text-gray-900">
                    {editingProductId === product.id ? (
                        <input
                        type="text"
                        name="inPrice"
                        value={editedData.inPrice || ''}
                        onChange={(e) => handleInputChange('inPrice', e.target.value)}
                        className="py-1 px-3 rounded-full border border-blue-300 w-full"
                        />
                    ) : (
                        <span className='py-1 px-3 rounded-full border border-blue-300'>{product.inPrice}</span>
                    )}
                    </td>)}
                    <td className="whitespace-nowrap text-sm text-gray-900">
                    {editingProductId === product.id ? (
                        <input
                        type="text"
                        name="price"
                        value={editedData.price || ''}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="py-1 px-3 rounded-full border border-blue-300 w-full"
                        />
                    ) : (
                        <span className='py-1 px-3 rounded-full border border-blue-300'>{product.price}</span>
                    )}
                    </td>
                    {(isMedium || isDesktop) && (
                    <>
                        <td className="whitespace-nowrap text-sm text-gray-900">
                        {editingProductId === product.id ? (
                            <input
                            type="text"
                            name="inStock"
                            value={editedData.inStock || ''}
                            onChange={(e) => handleInputChange('inStock', e.target.value)}
                            className="py-1 px-3 rounded-full border border-blue-300 w-full"
                            />
                        ) : (
                            <span className='py-1 px-3 rounded-full border border-blue-300'>{product.inStock}</span>
                        )}
                        </td>
                        <td className="whitespace-nowrap text-sm text-gray-900">
                        {editingProductId === product.id ? (
                            <input
                            type="text"
                            name="unit"
                            value={editedData.unit || ''}
                            onChange={(e) => handleInputChange('unit', e.target.value)}
                            className="py-1 px-3 rounded-full border border-blue-300 w-full"
                            />
                        ) : (
                            <span className='py-1 px-3 rounded-full border border-blue-300'>{product.unit}</span>
                        )}
                        </td>
                        {isDesktop && (<td className="whitespace-nowrap text-sm text-gray-900">
                        {editingProductId === product.id ? (
                            <input
                            type="text"
                            name="description"
                            value={editedData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            className="py-1 px-3 rounded-full border border-blue-300 w-full"
                            />
                        ) : (
                            <span className='py-1 px-3 rounded-full border border-blue-300'>{product.description.slice(0,30)}</span>
                        )}
                        </td>)}
                    </>
                    )}
                    <td className=" py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingProductId === product.id ? (
                        <div className="flex items-center gap-1">
                        <button onClick={() => handleSave(product.id)} className=" ml-2 cursor-pointer text-blue-500 hover:text-green-500">Save</button>
                        <button onClick={handleCancelEdit} className= " cursor-pointer text-gray-500 hover:text-red-500">Cancel</button>
                        </div>
                    ) : (
                        <Ellipsis onClick={() => handleEdit(product.id)} className='h-4 w-4 text-blue-500 cursor-pointer' />
                    )}
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
     </div>
  )
}

export default Tabel