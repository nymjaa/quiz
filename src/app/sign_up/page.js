"use client";
import { supabaseClient } from "../../../lib/supabase/client";
import {  useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

const signup = () => {
  const supabase = supabaseClient();

  // const [user, setUser] = useState([
  //   {
  //     email:"",
  //     password: "",
  //   },
  // ]);

  // const handleValue = (event) => {
  //   const field = event.target.name 
  //   setUser({...user,[field]: event.target.value})

  // }
  const signup = async () => {
    const response = await supabase.auth.signUp({
      email: 'bataanymjaa@gmail.com',
      password: '12345678',
    });
   console.log(response)
  };

  // function login() {
  //   router.push(`/login`);
  // }
//  console.log(user ,"ur dun");
  return (
    <div>
      <input onChange={(e)=> handleValue(e)} placeholder="email"  name="email"/>
      <input onChange={(e)=> handleValue(e)} placeholder="password" name="password"/>
      <button onClick={signup}>signup</button>
      {/* <button onClick={()=> login}>Login</button> */}
    </div>
  );
};

export default signup;
