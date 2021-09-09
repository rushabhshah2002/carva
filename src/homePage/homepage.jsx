import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import AddPost from "./addPost";
import io from "socket.io-client";
let socket;
const HomePage = () => {
  const history = useHistory();
  const id = JSON.parse(localStorage.getItem("userid"));
  const [userprofile, setUserProfile] = useState("");
  const [showProfile, setShowPorfile] = useState(false);
  const [showpost, setShowPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postConnected, setPostConnnected] = useState();
  const [postConnectedList, setPostConnnectedList] = useState([]);
  const [reloadbutton, setReloadButton] = useState(false);
  const [count, setCount] = useState(0);
  const [mode1,setMode1]=useState('feed')
  const [jobrank,setJobRank]=useState({})
  const [jobData,setJobData]=useState({})
  const [jobLang,setJobLang]=useState({})
  const [jobRankList,setJobRankList]=useState({})
  const [showJobs,setShowJobs]=useState(false)

  useEffect(() => {
   
    axios({
      method: "post",
      url: "http://localhost:3003/userprofile",
      data: { userid: id.data },
    }).then((res) => {
      console.log(res, 1231);
      setUserProfile(res.data.data);
      setShowPorfile(true);

      axios({
        method: "post",
        url: "http://localhost:3003/home",
        data: { userid: id.data },
      }).then((res) => {
        console.log(res);
        setPosts(res.data.data);
        if (res.data.data === "ddnjf") {
          setPosts(false);
        } else {
          setShowPosts(true);
        }
      });
    });
  }, [count]);

  useEffect(() => {
    socket = io("http://localhost:5000", { transports: ["websocket"] });
  }, []);

  const onConnect = async () => {
    await socket.emit("connected", { userid: id.data });
  };

  useEffect(() => {
    setTimeout(onConnect, 1000);

    console.log("q");
  }, []);
  const postInfo = async () => {
    await socket.on("sendingData", (sendingData) => {
      console.log(sendingData, "qwe");
      setPostConnnected(sendingData);
    });
  };
  useEffect(() => {
    console.log(213);
    setTimeout(postInfo, 1000);
  });
  useEffect(() => {
    if (postConnected === null || postConnected === undefined) return;
    console.log(postConnected, 1231);
    let temp1 = postConnectedList;

    temp1.push(postConnected);
    console.log(temp1);
    setPostConnnectedList(temp1);
    if (temp1.length > 5) {
      setReloadButton(true);
    }
  }, [postConnected]);

  const handlePost = async () => {
    socket.emit("post", postDetail);
    setMode(false)

    console.log(postDetail);
  };

  const [mode, setMode] = useState(false);
  const [postDetail, setpostDetail] = useState({
    username: "",
    userid: id.data,
    title: "",
    text_des: "",
    image: "none",
  });
  useEffect(() => {
    if (userprofile[0] === undefined) return;
    setpostDetail({ ...postDetail, username: userprofile[0].email });
  }, [userprofile]);
  useEffect(() => {
    if(mode1==='job'){
      axios({
        method:'post',
        url:"http://localhost:3003/job",
        data:{userid:id.data,type_account:userprofile[0].type_account}
        
      }).then((res)=>{
        console.log(res)
        setJobRank(res.data.ranking)
        setJobData(res.data.datasetUser)
        setJobLang(res.data.Languagedata)


      })
    }
  }, [mode1])
  useEffect(() => {
    if(jobrank===null)return  
    
    let a=Object.keys(jobrank).map((key) => [Number(key), jobrank[key]])
    console.log(a)
    let temp=[]
    for(let i=0;i<a.length;i++){
      console.log(a[i][1].name.id,"123")
      temp.push(a[i][1].name.id)
    }
    setJobRankList(temp)
    setShowJobs(true)
  }, [jobrank])
  return (
    <div className="">
      <div className="header">
        {reloadbutton && (
          <button
            onClick={() => {
              setCount(count + 1);
              setReloadButton(false);
            }}
          >
            new posts
          </button>
        )}
      </div>
      {showProfile && (
        <div className="profile">
          <p>profile</p>
          <p>type of account {userprofile[0].type_account}</p>
          <p>unversity name {userprofile[0].university_name}</p>
          <p>email{userprofile[0].email}</p>
          <p>location{userprofile[0].location}</p>
          <img src={userprofile[0].photo_link} alt="qweqw" className="" />
        </div>
      )}
      <div className="select">
        <button onClick={()=>{setMode1('feed')}}>feed</button>
        <button onClick={()=>{setMode1('course')} }>course</button>
        <button onClick={()=>{setMode1('job')}}>jobs</button>
      </div>
     {mode1==='feed' && <div className="post--feed">
       <h1>post</h1>
        <div className="add--post">
          <div className="">
            <button
              onClick={() => {
                setMode(true);
              }}
            >
              {" "}
              post
            </button>
          </div>
          {mode && (
            <div className="">
              <AddPost
                mode={mode}
                setMode={setMode}
                setpostDetail={setpostDetail}
                postDetail={postDetail}
                handlePost={handlePost}
              />
            </div>
          )}
          {/* {console.log(mode,postConnected)} */}
        </div>
        <div className="feed">
          {showpost && (
            <div className="">
              {posts.length > 1
                ? posts.map((post) => (
                    <div className="">
                      <p
                        onClick={() => {
                          history.push(`connect/${post.userid1}`);
                        }}
                      >
                        username {post.username}
                      </p>

                      <p>title {post.title}</p>
                      <p>description {post.text_des}</p>

                      <p>time {post.timing}</p>

                      <img
                        src={post.url ? post.url : post.image}
                        alt="not available"
                      />
                    </div>
                  ))
                : null}
            </div>
          )}
        </div>
      </div>}

     {mode1==='course' && 
     <div className="">
       <h1>course</h1>

     </div>
     } 

     {mode1 === 'job' && 
     <div className="">
<h1>job</h1>
{jobRankList.map((rank,index)=>(
  <div className="">
    {console.log(jobLang[rank])}
    <div className="">  job   list</div>
    <p onClick={() => {
                          history.push(`connect/${jobData[rank].userid1}`);
                        }}>username {jobData[rank].username}</p>
    <p>email {jobData[rank].email}</p>
    <p>jobpost {jobData[rank].jobpost}</p>
    <p>low_price {jobData[rank].lowest_price}</p>
    <p>high_price {jobData[rank].highest_price}</p>
    <p>lang_req  {jobLang[rank]}</p>
    <button> apply</button>
  </div>
))}
     </div>
     }
    </div>
  );
};

export default HomePage;
