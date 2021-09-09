import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
const ForgotPassword = () => {
  const [state, setState] = useState("forgot");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const history =useHistory()
  const target1 = (email) => {
      console.log(email)
    axios({
      method: "post",
      url: "http://localhost:5000/forgotpassword",

      data: {email:email},
    }).then((res) => {
      console.log(res.data);
      setOtp(res.data.data);
    });
  };
console.log(otp)
  const [eror, setError] = useState("");
  const target2 = (changedpassword) => {
    if (pass1 === pass2) {
      axios({
        method: "post",
        url: "http://localhost:5000/changepassword",
        data: { email, password: pass1 },
      }).then((res) => {
          console.log(res)
        setError("");
      });
    } else {
    }
  };

  return (
    <div>
      {/* {state="forgot"?<><input type="email" onChange = {({target})=>setEmail(target.value)} ></input><button onClick = {({target})=>{setState("otp");}}>send otp</button></>:state=="otp" && opt==""?<><input type="text" onChange= {({target})=>{target.value===otp?setState("password"):null}} ></input></>:null} */}
      {state === "forgot" && (
        <>
          <input
            type="email"
            onChange={({ target }) => setEmail(target.value)}
          ></input>
          <button
            onClick={({ target }) => {
              setState("otp");
              target1(email);
            }}
          >
            send otp
          </button>
        </>
      )}
      {state === "otp"  && (
        <>
          <input
            type="text"
            id ="otp"
            onChange={({ target }) => {
             
            }}
          ></input>
          <button onClick={()=>{
              var a =document.getElementById("otp")
              console.log(a.value,otp)
               if (a.value === otp) {
                console.log('113')
                setState("password");
              }
              
          }}>verify</button>
        </>
      )}
      {state === "password" && (
        <>
          <input
            type="text"
            onChange={({ target }) => setPass1(target.value)}
          ></input>
          <input
            type="password"
            onChange={({ target }) => setPass2(target.value)}
          ></input>
          <button
            onClick={() => {
              target2();
            }}
          >update</button>
        </>
      )}
      <button onClick={()=>{history.push("/")}}>cancel</button>
    </div>
  );
};

export default ForgotPassword;
