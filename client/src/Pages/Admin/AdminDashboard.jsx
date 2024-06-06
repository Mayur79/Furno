import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    photos: [],
    realprice:'',
    description:'',
    subheading:'',
    mainphotos:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const photoPromises = [];
    for (let i = 0; i < files.length; i++) {
      photoPromises.push(convertToBase64(files[i]));
    }
    Promise.all(photoPromises).then(base64Photos => {
      setFormData({ ...formData, photos: base64Photos });
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleMainPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertMainToBase64(file).then(base64Photo => {
        setFormData({ ...formData, mainphotos: base64Photo });
      }).catch(error => {
        console.error("Error converting file to base64:", error);
      });
    }
  };
  
  const convertMainToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/createProduct`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  return (
    <>
      <div>Admin Dashboard</div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Sub heading</label>
          <input
            type="text"
            name="subheading"
            id="subheading"
            value={formData.subheading}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Product Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Real Price</label>
          <input
            type="number"
            name="realprice"
            id="realprice"
            value={formData.realprice}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Product description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">Product Photos</label>
          <input
            type="file"
            name="photos"
            id="photos"
            multiple
            onChange={handlePhotoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photos">Main Photos</label>
          <input
            type="file"
            name="mainphotos"
            id="mainphotos"
            multiple
            onChange={handleMainPhotoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default AdminDashboard;
