import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Demo() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://surgebackend.azurewebsites.net//');
        const data = response.data;

        setCourses(data.Message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  return (
    <div>
        {courses}
      <p>From Varu 1</p>123
    </div>
  )
}

export default Demo
