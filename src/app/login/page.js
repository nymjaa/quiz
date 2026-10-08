"use client"
// import { Router } from "next/router";
import { supabaseClient } from "../../../lib/supabase/client";
// import { useRouter, useSearchParams } from "next/navigation";
const login = () =>{
    const supabase = supabaseClient();

    const login = async () => {
       const response = await supabase.auth.signInWithPassword({
        email: 'bataanymjaa@gmail.com',
        password: '12345678'
    })
    console.log(response)
}
//  const handleValue =(event) => {
//     const [field] = event.target.name
//     if(field === response){
//         localStorage.setItem("userId",response.id)
//     }
//  }
//  function handlelogin(){
//     const 
//  }

//  }

    return(
        <div>
            <input onChange={(e)=>handleValue(e)} placeholder="email..." name="email"/>
            <input placeholder="password..." name="password"/>
            <button onClick={login}>LOGIN</button>

        </div>
    )
};
export default login;