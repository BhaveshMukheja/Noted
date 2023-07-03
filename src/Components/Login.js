import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const Login = (props) => {
   const [credentials, setCredentials] = useState({email:"", password:""})
   let navigate = useNavigate();
    const host = "http://localhost:5000"
    const handleSubmit=async (e)=>{
        e.preventDefault();
      
            const response = await fetch(`${host}/api/auth/login`, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit,
            
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
             body: JSON.stringify({email: credentials.email, password: credentials.password })           
            });
            const json = await response.json()
            console.log(json)
            if(json.success){
                //Save the auth token and redirect 
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert("Logged in successfully", "success")
            }
            else{
                props.showAlert("Invalid Credentials", "danger")
            }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };


  return (
    <div>
        <form onSubmit={handleSubmit}>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" value={credentials.password} onChange={onChange} id="password" name='password'/>
    </div>
    <button type="submit" class="btn btn-primary" >Submit</button>
  </form>
  </div>
  )
}

export default Login