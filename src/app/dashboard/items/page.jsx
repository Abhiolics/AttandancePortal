"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../ui/dashboard/footer/footer';
import {BASE_URL} from "../../../../config";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    itemCode: '',
    itemName: '',
    description: '',
    price: '',
    mode: '',
    schedule: '',
    subsidized: '',
    tags: '',
    status: 1,
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/menu/get-items`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });
      setItems(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch items');
    } finally {
      setIsLoading(false); 
    }
  };

  const handleAddOrUpdate = async () => {
    try {
      const config = {
        method: isAdding ? 'post' : 'put',
        maxBodyLength: Infinity,
        url: isAdding ? 
          `${BASE_URL}/menu/add-item` : 
          `${BASE_URL}/menu/update-item/${formData.id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':             "Bearer " + token,
        },
        data: formData,
      };

      const response = await axios.request(config);
      toast.success(response.data.message);
      setIsEditing(false);
      setIsAdding(false);
      fetchItems();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/menu/delete-item/${id}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':             "Bearer " + token,
        },
      });
      toast.success('Item deleted successfully');
      fetchItems();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => {
      const newPage = prev + direction;
      if (newPage < 1) return 1;
      if (newPage > Math.ceil(items.length / itemsPerPage)) return Math.ceil(items.length / itemsPerPage);
      return newPage;
    });
  };
  const displayedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      {!isEditing && !isAdding && (
        <>
          <div className="flex justify-end items-center mb-4">
            <button onClick={() => setIsAdding(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Add Item</button>
          </div>
          <div className="relative  flex items-center justify-center">
            {isLoading ? (
              <div className="absolute  inset-0 flex flex-col items-center justify-center  bg-transparent bg-opacity-50">
                <div role='status' className="loa  rounded-full border-e-transparent align-[-0.125em] border-8 border-t-8 animate-[spin_1.5s_linear_infinite] border-purple-500 h-24 w-24 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading... Please wait!
                </h2>
              </div>
            ) : (
              <div className="flex min-w-full flex-col ">
              <div className="sm:-mx-6  lg:-mx-8">
        <div className="inline-block min-w-full  py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto"></div>
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/6 py-2 px-4 border">Item Code</th>
                <th className="w-1/12 py-2 px-4 border">Item Name</th>
                <th className="w-1/6 py-2  px-4  border">Description</th>
                <th className="w-1/12 py-2 px-4  border">Price</th>
                <th className="w-1/12 py-2 px-4  border">Mode</th>
                <th className="w-1/12 py-2 px-4  border">Schedule</th>
                <th className="w-1/12 py-2 px-4  border">Subsidized</th>
                <th className="w-1/12 py-2 px-4  border">Tags</th>
                <th className="w-1/12 py-2 px-4  border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map(item => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 text-black text-center">{item.itemCode}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.itemName}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.description}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.price}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.mode}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.schedule}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.subsidized}</td>
                  <td className="border px-4 py-2 text-black text-center">{item.tags}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="mt-4 flex mb-4 justify-center items-center">
  <button
    onClick={() => handlePageChange(-1)}
    disabled={currentPage === 1}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 rounded mr-2 focus:outline-none focus:shadow-outline"
  >
    «
  </button>
  <span className="text-white mx-4"> {currentPage} / {Math.ceil(items.length / itemsPerPage)}</span>
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 rounded focus:outline-none focus:shadow-outline"
  >
   »
  </button>
</div>cd my-app
          </div>
          </div>
            )}
            </div>
        </>
      )}

      {(isEditing || isAdding) && (
        <div className="w-full max-w-full mx-auto  bg-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold ">{isAdding ? 'Add Item' : 'Edit Item'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddOrUpdate(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold">Item Code</label>
                <input
                  type="text"
                  value={formData.itemCode}
                  onChange={(e) => setFormData({ ...formData, itemCode: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Item Name</label>
                <input
                  type="text"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Mode</label>
                <input
                  type="text"
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Schedule</label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Subsidized</label>
                <input
                  type="text"
                  value={formData.subsidized}
                  onChange={(e) => setFormData({ ...formData, subsidized: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 border rounded bg-gray-500"
                />
              </div>
            </div>
            <div className="flex gap-5">
            <button type="submit" className="bg-blue-500 text-white w-28 py-2 rounded">{isAdding ? 'Add' : 'Update'}</button>
              <button type="button" onClick={() => { setIsEditing(false); setIsAdding(false); }} className="bg-red-500 text-white w-28 py-2 rounded">Cancel</button>
     
            </div>
          </form>
        </div>
      )}
       {!isLoading && <Footer />}
    </div>
  );
}

