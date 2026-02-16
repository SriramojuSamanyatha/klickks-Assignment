import Cookies from 'js-cookie';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import ExpensesTable from '../ExpensesTable'
import './index.css';

const Dashboard = () => {
  const [response, setResponse] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('bills');
  const [date, setDate] = useState('');
  const [type,setType] = useState('income');
 // const [userId, setUserId] = useState('');

  const navigate = useNavigate()

   
    useEffect(() => {
        getResponseFiterData()
        // jkbkj
    }, [transactions])

    const getResponseFiterData = async () => {
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = 'https://expenses-backend-z32u.onrender.com/transactions';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      const responseData = await fetch(apiUrl, options);
        const data = await responseData.json()
    
        setTransactions(data)
    }

  const getResponseData = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      const apiUrl = 'https://expenses-backend-z32u.onrender.com/dashboard';
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      };
      const responseData = await fetch(apiUrl, options);
      if (responseData.ok) {
        const data = await responseData.text();
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

  const onSubmitTransaction =async (event) => {

    event.preventDefault()
        const usertransDetails = {title,amount, category,date,type}
        const jwtToken = Cookies.get('jwt_token');
        const url = 'https://expenses-backend-z32u.onrender.com/transactions'
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${jwtToken}`
            },
            body: JSON.stringify(usertransDetails),
        }
        const transactionResponse = await fetch(url, options)
        const transactionData = await transactionResponse.json()
        console.log(transactionData)
        if (transactionResponse.ok) {
            setTransactions([...transactions, transactionData])
            console.log(transactions)
    
        } 
  }

  
    const deleteData = async (id) => {
      console.log(id)
      const jwtToken = Cookies.get('jwt_token');
        try{
            const responseDelete = await fetch(`https://expenses-backend-z32u.onrender.com/transactions/${id}`,{
                method :'DELETE',
                headers:{
                Authorization: `Bearer ${jwtToken}`
            },

            })
            const deletedFilterData = await responseDelete.json()
            console.log(deletedFilterData)
            if (deletedFilterData.ok){
              console.log("success")
              getResponseFiterData()

            }

        }catch (error) {
            console.log(error)
        }
    }


  const typeText = ["income","expense"]
  const categoryText = ["food","bills","other"] 


  return (
    <div className='welcome-backround'>
    
      {response ? (
        <>
        <div className='button-con'>
           <div className='welcome-con'>
          <img src ="https://res.cloudinary.com/dti41e3cu/image/upload/v1736339859/Group_7618_1_avattc.png" className='welcome' alt ="welcome" />
          <p className='welcome-name'>{response}</p>
          </div>
        <button className='button' onClick={onLogout}>Logout</button>
        </div>
          <form className='bg-dashboard' onSubmit={onSubmitTransaction}>
              <h1 className='head'>Add New Transaction</h1>
              <div className='add-form-sec'>
              <div className='two-sub-sec'>
              <div className='label-con'>
                <label htmlFor='description'>Description :</label>
                <input className='input-txt' id="description" type="text" value = {title} placeholder='reason' onChange={(event) => setTitle(event.target.value)} required/>
                <label htmlFor='type'>Type :</label>
                <select id="type"  value = {type} className='input-txt' onChange={(event) => setType(event.target.value)}>
                  {typeText.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className='label-con'>
                <label htmlFor='amount'>Amount :</label>
                <input id="amount" className='input-txt' type="text" value = {amount} placeholder='Enter amount' onChange={(event) => setAmount(event.target.value)} required/>
                <label htmlFor='category'>Category :</label>
                <select id="category" className='input-txt' value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categoryText.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}

                </select>
                
              </div>
            </div>
               <div className ="date-con">
                <label htmlFor= "date">Date :</label>
                <input type="date" className='input-txt' value={date} onChange={(event) => setDate(event.target.value)} required />
              </div>
            <button type='submit' className='button stylebtn'>Add Transaction</button>
            </div>
          </form>


          <div>
            <h1 className='head trans-head'>Transaction History</h1>
            <div className='tran-his'>
          
                 {transactions.map(each => (
                <ExpensesTable details= {each} key={each.id}  deleteData={deleteData}/>
              ))}
             
            </div>
          </div>

      
        </>
      ) : (
        <div className='loading-con'>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
