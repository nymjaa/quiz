"use client"




import{use, useState} from "react"; 

const Page = () =>{
    const [userInfo , setUserInfo] = useState({
        email: "", 
        password: "",
        username: "",
    });

    const handleUserInfo = (event) =>{
        if(event.target.name === "email"){
            setUserInfo({...userInfo, email: event.target.value});
        }
         if(event.target.name === "password"){
            setUserInfo({...userInfo, password: event.target.value});
         }
         if(event.target.name === "username"){
            setUserInfo({...userInfo, username: event.target.value});
         }
    };

    const supabase = supabaseClient();

    const signIn = async()=>{
        const response = await supabase.auth.signUp({
            email: userInfo.email,
            password: userInfo.password,
        });

        await supabase.from("profile").insert({
            authId: response.data.user.id,
            username: userInfo.username,
        })

        console.log(response);
    };

    const login = async()=>{
        const response = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.password,
        });

        localStorage.setItem("token", response.token)
        console.log(response);
    };

    return(
        <div>
            <input
            name="emial" 
            placeholder="email" 
            onChange={handleUserInfo} 
            value={userInfo.email}
            />
            <input
            type="password" 
            name="password" 
            placeholder="password" 
            onChange={handleUserInfo} 
            value={userInfo.password}
            />
            <input
            name="username" 
            placeholder="username" 
            onChange={handleUserInfo} 
            value={userInfo.username}
            />
            <button onClick={signIn}>Sign-up</button>
            <button onClick={login}>Login</button>
        </div>
    );


};
export default Page;