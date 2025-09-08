import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import './index.css';

const Dashboard = () => {
  const [response, setResponse] = useState('');

  const navigate = useNavigate()

  const getResponseData = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = 'https://auth-assignment-backend-1.onrender.com/dashboard';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      const responseData = await fetch(apiUrl, options);
      if (responseData.ok) {
        const data = await responseData.json();
        setResponse(data);
      } else {
        console.log('Error:', responseData.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getResponseData();
  }, []);

  const onLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login',{replace:true})
  }

  return (
    <div className='welcome-backround'>
    
      {response ? (
        <>
        <div className='button-con'>
        <button className='button' onClick={onLogout}>Logout</button>
        </div>
        <div className='welcome-con'>
          <img src ="https://res.cloudinary.com/dti41e3cu/image/upload/v1736339859/Group_7618_1_avattc.png" className='welcome' alt ="welcome" />
          <p className='welcome-name'>Hey {response.username}!</p>
          <h1 className='head-name'>Welcome to our app</h1>
          <p className='sub-head-text'>A personalized greeting that acknowledges the user's login.</p>

        </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
