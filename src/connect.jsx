import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
import axios from "axios";
let socket;

const ConnectID = () => {
  // let connectid = useParams();
  // console.log(connectid)
  // useEffect(() => {

  // }, [])
  const [count,setCount]=useState(0)
  const [user, setUser] = useState();
  const [a, setA] = useState(false);
  const [conn,setConn]=useState(false)
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:3003/userprofile",
      data: { userid: id.data },
    }).then((res) => {
      console.log(res, 1231413);
      setUser(res.data.data);
      setA(true);
    });
    axios({
      method: "post",
      url: "http://localhost:3003/connectiondetails",
      data: { userid1: connectid, userid2: id.data },
    }).then((res) => {
      console.log(res);
      if(res.data.data==='bconn'){
        setConn(true)
      }
      if(res.data.data==="nttconn"){
        
      }
    });
  }, [count]);
  const id = JSON.parse(localStorage.getItem("userid"));
  useEffect(() => {
    socket = io("http://localhost:5000", { transports: ["websocket"] });
  }, []);
  const { connectid } = useParams();
  console.log(connectid);
  return (
    <div className="">
      <p>{connectid}</p>

      {a&& (
        <div className="">
          {console.log(user)}
          <p>profile</p>
          <p>type of account {user[0].type_account}</p>
          <p>unversity name {user[0].university_name}</p>
          <p>email{user[0].email}</p>
          <p>location{user[0].location}</p>
          <img src={user[0].photo_link} alt="qweqw" className="" />
        </div>
      )}
      <button
        onClick={() => {
          socket.emit("connectingUser", {
            connecting: connectid,
            connector: id.data,
          });
          console.log(123145135)
setCount(count+1)
        }}
      >
       {conn?'connnected':'connect'}
      </button>
    </div>
  );
};

export default ConnectID;
