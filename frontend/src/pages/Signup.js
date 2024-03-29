import React, { useState } from 'react'
import Button from '../components/Button';
import { useGlobalContext } from '../Context';
import { useNavigate } from 'react-router-dom';
function SignUp({
    isSignedinvar
}) { 
    const{user,setUserInfo,vendor,setVendorInfo,setAuthInfo}=useGlobalContext();
    const navigate=useNavigate();
  const [isSignedin,setisSignedin]=useState(isSignedinvar);
  const[isVendor,setVendor]=useState(false);
  const [data,setData]=useState({
    ...(!isSignedin && {
      name:''
    }),
    email:'',
    password:''
  })
  const toggleSignin=()=>{
    setisSignedin(!isSignedin);
  }
  const handleLoginSubmit=async(e)=>{
    e.preventDefault();
    const response= await fetch("http://localhost:5000/api/loginuser",{
        method:"POST",
        headers:{
            'Content-Type':"application/json",
        },
        body:JSON.stringify({
            email:data.email,
            password:data.password
        })
    });
    const json = await response.json()
    if(json.success){
      localStorage.setItem("userEmail",data.email)
      localStorage.setItem("authToken",json.authToken)
      setUserInfo({
        ...user,
        name:json.data.name,
        email:json.data.email,
        _id:json.data._id,
    });
    navigate("category");
    }else{
      console.log("try again");
    }
}

const handleSignupSubmit=async(e)=>{
  e.preventDefault();
  const response= await fetch("http://localhost:5000/api/createuser",{
      method:"POST",
      headers:{
          'Content-Type':"application/json",
      },
      body:JSON.stringify({
        ...user,
          name:data.name,
          email:data.email,
          password:data.password
      })
  });
  const json = await response.json()
  if(json.success){
    localStorage.setItem("userEmail",data.email)
    localStorage.setItem("authToken",json.authToken)
    setUserInfo({
        name:json.data.name,
        email:json.data.email,
        _id:json.data._id,
    });
    navigate("/category");
  }
}

const handleLoginVendorSubmit=async(e)=>{
  e.preventDefault();
  const response= await fetch("http://localhost:5000/api/loginvendor",{
      method:"POST",
      headers:{
          'Content-Type':"application/json",
      },
      body:JSON.stringify({
          email:data.email,
          password:data.password
      })
  });
  const json = await response.json()
  if(json.success){
    localStorage.setItem("userEmail",data.email)
    localStorage.setItem("authToken",json.authToken)
    setVendorInfo({
      ...vendor,
      name:json.data.name,
      email:json.data.email,
      _id:json.data._id,
  });
  navigate(`/vendor/${json.data._id}`);
  }else{
    console.log("try again");
  }
}

const handleSignupVendorSubmit=async(e)=>{
e.preventDefault();
const response= await fetch("http://localhost:5000/api/createvendor",{
    method:"POST",
    headers:{
        'Content-Type':"application/json",
    },
    body:JSON.stringify({
        name:data.name,
        email:data.email,
        password:data.password
    })
});
const json = await response.json()
if(json.success){
  localStorage.setItem("userEmail",data.email)
  localStorage.setItem("authToken",json.authToken)
  setVendorInfo({
      ...vendor,
      name:json.data.name,
      email:json.data.email,
      _id:json.data._id,
  });
  navigate(`/vendor/${json.data._id}`);
}
}
const handleSubmit= (e) => {
  if(isSignedin && isVendor){
    handleLoginVendorSubmit(e);
  }else if(!isSignedin && isVendor){
    handleSignupVendorSubmit(e);
  }
  else if(isSignedin && !isVendor){
    handleLoginSubmit(e);
  }else{
    handleSignupSubmit(e);
  }
};


const toggleVendor= (isVendor) => {
  isVendor?setVendor(false):setVendor(true)
};

  return (
    <div className="bg-[#c6ebf4] h-screen flex justify-center items-center">
    <div className="bg-white w-[25rem] h-[35rem] shadow-lg rounded-lg flex flex-col justify-center items-center">
<div className="text-4xl font-bold mb-4">Welcome {isSignedin &&'Back '}{isVendor?"Vendor":"User"}</div>
    <div className='text-sm font-light mb-10'>{ isSignedin?'Sign in now to explore':'SignUp now to get started'}</div>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    {!isSignedin &&
    <div className="w-72">
  <div className="relative w-full  h-10 mb-3">
    <input
      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      placeholder="" 
      required
      value={data.name}
      onChange={(e)=>{setData({...data,name : e.target.value})}}/>
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Name</label>
  </div>
</div>  
}
<div className="w-72">
  <div className="relative w-full  h-10 mb-3">
    <input
      type="email"
      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      placeholder=" " 
      required
      value={data.email}
      onChange={(e)=>{setData({...data,email: e.target.value})}}/><label
      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Email</label>
  </div>
</div>
<div className="w-72">
  <div className="relative w-full  h-10 mb-5">
    <input
      type="password"
      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
      placeholder=" " 
      required
      value={data.password}
      onChange={(e)=>{setData({...data,password : e.target.value})}}/><label
      className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Password</label>
  </div>
</div>
<Button type="submit" label={isSignedin?'SignIn':'SignUp'} className="w-72"/>
</form>
<div className="flex items-center">
  <span className="text-sm mr-2">{isSignedin?'Dont have an account?':'Already have an account?'}</span>
  <span 
  className="text-sm text-blue-500 cursor-pointer hover:underline"
  onClick={toggleSignin}>
  {isSignedin?'SignUp':'SignIn'}</span>
</div>
<div className="flex items-center">
      <span className="text-sm mr-2">Are you a vendor?</span>
      {isVendor?<span
        className="text-sm text-blue-500 cursor-pointer hover:underline"
        onClick={() => toggleVendor(isVendor)}
      >
        No
      </span>:<span
        className="text-sm text-blue-500 cursor-pointer hover:underline"
        onClick={() => toggleVendor(isVendor)}
      >
       Yes
      </span>}
</div>
    </div>
    </div>
  )
}

export default SignUp;
