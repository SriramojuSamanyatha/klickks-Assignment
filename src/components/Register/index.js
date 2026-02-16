import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

const Register = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [success,setSuccess] = useState('')
    const [errorMsg,setErrorMsg] =useState('')
    const [submittedError,setSubmittedError] = useState(false)
    const [isTrue,setIsTrue] = useState(false)

    const navigate = useNavigate()

    const onSubmitSignForm =async (event) => {
        event.preventDefault()
        const userDetails = {name,email, password}
        const url = 'https://expenses-backend-z32u.onrender.com/register'
        const options = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.text()
        console.log(data)
        if (response.ok === true) {
            setIsTrue(true)
            setSuccess(data)
            setSubmittedError(false)
    
        } else {
            setErrorMsg(data)
            setSubmittedError(true)
            setIsTrue(false)
        }
    }

    return (
        <div className='app-backround'>
       <div className='auth-back'>
        <h1 className='head'>Create Account</h1>
        <p className='sub-head'>Create your account</p>
        <form className='form-con' onSubmit={onSubmitSignForm}>
        <div className='input-con'>
            <img src="https://res.cloudinary.com/dti41e3cu/image/upload/v1757165457/fullname_qfwoot.png" alt="fullname" className='icon' />
            <input className="input-text" type="text" placeholder='Full Name' value={name} onChange={(event) =>setName(event.target.value)} required/>
        </div>
         <div className='input-con'>
            <img src="https://res.cloudinary.com/dti41e3cu/image/upload/v1757165464/email_mrwacx.png" alt="email" className='icon' />
            <input className="input-text" type="email" placeholder='Email' value={email} onChange={(event) =>setEmail(event.target.value)} required/>
        </div>
         <div className='input-con'>
            <img src="https://res.cloudinary.com/dti41e3cu/image/upload/v1757165473/password_l6wbox.png" alt="password" className='icon' />
            <input className="input-text" type="password" placeholder='Full Name' value={password} onChange={(event) =>setPassword(event.target.value)} required/>
        </div>
          <button type="submit" className='button' >Sign Up</button>
          {submittedError && <p className='err-msg'>{errorMsg}</p>}
          {isTrue && <p>{success}</p>}
    
        </form>
        <p>Already have an account? <span className='span' onClick={() => navigate('/login')}>Login here</span></p>
       </div>
       </div>
    
    )

}


export default Register