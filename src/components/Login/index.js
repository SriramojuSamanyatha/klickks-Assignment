import React,{useState} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Login = () => {
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [errorMsg,setErrorMsg] =useState('')
    const [submittedError,setSubmittedError] = useState(false)


    const navigate = useNavigate()

    const onSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    console.log(Cookies.get('jwt_token')); 
    navigate('/Dashboard',{replace:true})
  }

  const onSubmitFailure = error => {
    setSubmittedError(true)
    setErrorMsg(error)
  }


    const onLogin = async (event) => {
        event.preventDefault()
        const userDetails = {name, password}
        const url = 'https://expenses-backend-z32u.onrender.com/login'
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            onSubmitSuccess(data.jwtToken)
            
        } else {
           onSubmitFailure(data.error_msg)
        }
    }

    return (
        <div className='app-backround'>
        <div className='auth-back'>
        <h1 className='head'>Login</h1>
        <p className='sub-head'>Login to your account</p>
        <form onSubmit={onLogin}>
           <div className='input-con'>
            <img src="https://res.cloudinary.com/dti41e3cu/image/upload/v1757165457/fullname_qfwoot.png" alt="fullname" className='icon' />
            <input className="input-text" type="text" placeholder='Full Name' value={name} onChange={(event) =>setName(event.target.value)} required/>
        </div>
         <div className='input-con'>
            <img src="https://res.cloudinary.com/dti41e3cu/image/upload/v1757165473/password_l6wbox.png" alt="password" className='icon' />
            <input className="input-text" type="password" placeholder='Password' value={password} onChange={(event) =>setPassword(event.target.value)} required/>
        </div>
        <button type="submit" className='button' >Login</button>
         {submittedError && <p className='err-msg'>{errorMsg}</p>}
        </form>
        <p>Don't have an account? <span className='span' onClick={() =>navigate('/register')}>Sign in</span></p>
        </div>
        </div>

    )


}

export default Login