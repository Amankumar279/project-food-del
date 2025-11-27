import React, { useEffect, useState } from 'react'
import './List.css'
import { url, currency } from '../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list, setList] = useState([]);
  const [deleting, setDeleting] = useState({});

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success) {
        setList(response.data.data);
      }
      else {
        toast.error("Error fetching food list")
      }
    } catch (error) {
      toast.error("Error fetching food list")
      console.error(error);
    }
  }

  const removeFood = async (foodId) => {
    // Optimistic update - remove from UI immediately
    const foodToDelete = list.find(item => item._id === foodId);
    setList(prevList => prevList.filter(item => item._id !== foodId));
    setDeleting(prev => ({ ...prev, [foodId]: true }));

    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId
      })
      if (response.data.success) {
        toast.success(response.data.message);
      }
      else {
        // Revert on error
        if (foodToDelete) {
          setList(prevList => [...prevList, foodToDelete].sort((a, b) => a.name.localeCompare(b.name)));
        }
        toast.error("Error deleting food item")
      }
    } catch (error) {
      // Revert on error
      if (foodToDelete) {
        setList(prevList => [...prevList, foodToDelete].sort((a, b) => a.name.localeCompare(b.name)));
      }
      toast.error("Failed to delete food item. Please try again.")
      console.error(error);
    } finally {
      setDeleting(prev => {
        const newState = { ...prev };
        delete newState[foodId];
        return newState;
      });
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          // Check if image is already a full URL (Cloudinary) or needs backend path
          const imageUrl = item.image && (item.image.startsWith('http://') || item.image.startsWith('https://')) 
            ? item.image 
            : `${url}/images/${item.image}`;
          
          return (
            <div key={item._id} className='list-table-format'>
              <img src={imageUrl} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p 
                className={`cursor ${deleting[item._id] ? 'deleting' : ''}`} 
                onClick={() => !deleting[item._id] && removeFood(item._id)}
                style={{ opacity: deleting[item._id] ? 0.5 : 1, cursor: deleting[item._id] ? 'not-allowed' : 'pointer' }}
              >
                {deleting[item._id] ? '...' : 'x'}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
