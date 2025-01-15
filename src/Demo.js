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
    <div><div className='text-center mt-5 fw-bold border border-success p-2 rounded '  style={{color:"green",fontSize:"16px"}} > {courses}</div> 
      <p className='text-end fw-italic pe-5' style={{fontSize:"14px"}}>- From RK </p>
    </div>
  )
}

export default Demo
