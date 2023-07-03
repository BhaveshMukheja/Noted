import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const navigate=useNavigate()
    const host="http://localhost/3000"
    const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
    const handleSubmit= async (e)=>{
        e.preventDefault();
       const  {name, email, password} = credentials;
            const response = await fetch(`${host}/api/auth/createUser`, {
                
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit,
            
              headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
             body: JSON.stringify({name, email, password })           
            });
            const json = await response.json()
            console.log(json)
            if(json.success){
                //Save the auth token and redirect 
                localStorage.setItem('token', json.authtoken);
                navigate("/");
                props.showAlert("Account created successfully", "success")
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
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" name='password' onChange={onChange} minLength='5'required/>
  </div>

  <div class="mb-3">
    <label for="cpassword" class="form-label">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength='5'required/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>    
</div>
  )
}

export default Signup