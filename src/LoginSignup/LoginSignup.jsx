import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Name, password, email } from "./../utils/validation";
const LoginSignup = () => {
  const [mode, setMode] = useState("signup");
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [signupCredentials, setSigncredentials] = useState({
    email: "",
    username: "",
    password: "",
    Cpassword: "",
  });
  const [err, seterr] = useState({
    emailerr: false,
    passworderr: false,
  });
   
  //  const [state, setState] = useState({ username: "", password: "" });
  // const responseGoogle = async (response) => {
  //     console.log(response)
  //    try{
  //   setState({ email: response.Os.zt, password: response.Os.zt });
  //   await localStorage.setItem("data", JSON.stringify(state));
  //   console.log(124135,state)
  //   axios({
  //       method: "post",
  //       url: "https://murmuring-headland-03833.herokuapp.com/api/login",
  //       data: state,
  //     }).then((response) =>{
  //       localStorage.setItem("jwt", JSON.stringify(response.data))
  //       history.push("/pg")
  //     }
  //     );
  //   }
  //   catch(err){
  //     console.log(err);
  //   }

  // };
  const [Gsignup, setGsignup] = useState({
    username: "",
    password: "",
    email: "",
  });
  const history=useHistory()
  const responseGoogleSignup = async (response) => {
    console.log(response,12412);
  
   try {
    setGsignup({
      username: response.Os.Ne,
      email: response.Os.zt,
      password: response.Os.zt,
    });
    localStorage.setItem("data", JSON.stringify(Gsignup));
      await axios({
        method: "post",
        url: "http://localhost:3003/signup",
        data: Gsignup,
      }).then((response) => {
        console.log(response);
        localStorage.setItem("userid", JSON.stringify(response.data));
        if(response.data.message==='nalva')
   
       {  axios({
          method: "get",
          url: "http://localhost:3003/jwttoken",
        }).then((res) => {
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
          
          history.push("/profile")
        });}
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    console.log(email(loginCredentials.email), "wer");
    if (!email(loginCredentials.email).username) {
      console.log(1244);
      seterr({ ...err, emailerr: true });
    } else {
      console.log("false");
      seterr({ ...err, emailerr: false });
    }
    if (!password(loginCredentials.password).length) {
      seterr({ ...err, passworderr: true });
    } else {
      seterr({ ...err, passworderr: false });
    }
    if (
      email(loginCredentials.email).username &&
      password(loginCredentials.password).length
    ) {
      console.log("data");
      axios({
        method: "post",
        url: "http://localhost:3003/signin",
        data: loginCredentials,
      }).then((res) => {
        console.log(res);
      });
    }
  };
  const handleSignup = () => {
    console.log(signupCredentials);
    if (signupCredentials.password === signupCredentials.Cpassword) {
      console.log("s");
      axios({
        method: "post",
        url: "http://localhost:3003/signup",
        data: {
          email: signupCredentials.email,
          username: signupCredentials.username,
          password: signupCredentials.password,
        },
      }).then((res) => {
        console.log(res);
        localStorage.setItem("userid", JSON.stringify(res.data));
        if(res.data.message==="nalva"){
history.push("/profile")
        }
        axios({
          method: "get",
          url: "http://localhost:3003/jwttoken",
        }).then((res) => {
          localStorage.setItem("jwt", JSON.stringify(res.data.token));
          
        });
      });
    }else{
      alert("incorrect password")
    }
  };
  // React.useEffect(() => {
  //   const checkingIfTheLocalStorageHaveTheDataOrNot =
  //     localStorage.getItem("jwt");
  //   console.log(checkingIfTheLocalStorageHaveTheDataOrNot);
  //   if (
  //     checkingIfTheLocalStorageHaveTheDataOrNot !== null ||
  //     checkingIfTheLocalStorageHaveTheDataOrNot !== undefined
  //   ) {
  //     var jwt;

  //     try {
  //       const token = JSON.parse(checkingIfTheLocalStorageHaveTheDataOrNot);
  //       jwt = `Bearer ${token}`;
  //       console.log(jwt);
  //     } catch (err) {
  //       jwt = "";
  //     }
  //     const id = JSON.parse(localStorage.getItem("userid"));
  //     if(id.data!==null && jwt!==null && jwt!==undefined){
  //       history.push("/home")
  //     }
      

    
  //   }
  // }, []);
  return (
    <div className="">
      <button
        onClick={() => {
          setMode("login");
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          setMode("signup");
        }}
      >
        signup
      </button>
      {mode === "login" && (
        <div className="login">
          <h1>login</h1>
          <input
          placeholder='email'
            type="text"
            className="email"
            onChange={(e) => {
              setLoginCredentials({
                ...loginCredentials,
                email: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder='password'
            className="password"
            onChange={(e) => {
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              });
            }}
          />
          <button onClick={handleLogin}>login</button>
          {/* <GoogleLogin
        
        clientId="1057081408783-no215q4qet3l1t84s0a1dvhopjecfq5n.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}
      <div className="">
        <button onClick={()=>{history.push("/forgot")}}>forgot password</button>
      </div>
        </div>
        
      )}
      {mode === "signup" && (
        <div className="signup">
          <h2>signup</h2>
          <input
            type="text"
            placeholder='username'
            className="username"
            onChange={(e) => {
              setSigncredentials({
                ...signupCredentials,
                username: e.target.value,
              });
            }}
          />
          <input
          placeholder='email'
            type="text"
            className="email"
            onChange={(e) => {
              setSigncredentials({
                ...signupCredentials,
                email: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder='password'
            className="password"
            onChange={(e) => {
              setSigncredentials({
                ...signupCredentials,
                password: e.target.value,
              });
            }}
          />
          <input
            type="text"
            placeholder='confirm password'
            className="confirm password"
            onChange={(e) => {
              setSigncredentials({
                ...signupCredentials,
                Cpassword: e.target.value,
              });
            }}
          />
          <button onClick={handleSignup}>signup</button>
          <GoogleLogin
            clientId="1057081408783-no215q4qet3l1t84s0a1dvhopjecfq5n.apps.googleusercontent.com"
            buttonText="Signup"
            onSuccess={responseGoogleSignup}
            onFailure={responseGoogleSignup}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
      
    </div>
  );
};

export default LoginSignup;
