import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { v4 as uuidv4 } from 'uuid';
import axios from"axios"
import {useHistory} from 'react-router-dom'
import "react-image-crop/dist/ReactCrop.css";
const ProfilePage = () => {
  const [userprof, setUserProf] = useState("student");
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 / 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [Cimg, setCimg] = useState("");
  const [imgcrop, setimgcrop] = useState(false);
  const [jobInstance, setJobInstance] = useState({
    job: "",
    startSalary: "",
    endSalary: "",
    language: [],
  });
  const history=useHistory();
  function makeid (length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const onSelectFile = (e) => {
    setimgcrop(false);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  let thisYear = new Date().getFullYear();
  let allYears = [];
  for (let x = 0; x <= 50; x++) {
    allYears.push(thisYear - x + 4);
  }
  const handleEdit = (e) => {
    console.log(e.target.id, job[e.target.id]);
    setJobInstance(job[e.target.id]);
    setJob(job.filter((element, index) => index !== parseInt(e.target.id)));
  };

  const [skillH, setSkillH] = useState([
    {
      name: "ML",
      key: 1,
      label: "shill has",
    },
    {
      name: "AI",
      key: 2,
      label: "skill already",
    },
  ]);
  const [skillarrH, setSkillarrH] = useState({
    ML: false,
    AI: false,
  });

  const [skillToH, setSkillToH] = useState([
    {
      name: "ML",
      key: 1,
      label: "shill demanded",
    },
    {
      name: "AI",
      key: 2,
      label: "skill demanded",
    },
  ]);
  const [skillarrToH, setSkillarrToH] = useState({
    ML: false,
    AI: false,
  });
  const handleChangeSkillToH = (event) => {
    setSkillarrToH({
      ...skillarrToH,
      [event.target.name]: event.target.checked,
    });
  };
  const [langList, setlangList] = useState([
    {
      name: "python",
      key: 1,
      label: "lang",
    },
    {
      name: "java",
      key: 2,
      label: "lang",
    },
  ]);
  const [lang, setlang] = useState({
    python: false,
    java: false,
  });
  const handleChangelang = (event) => {
    setlang({
      ...lang,
      [event.target.name]: event.target.checked,
    });
  };
  const [courseToSellList, setCourseToSellList] = useState([
    {
      name: "frontend",
      key: 1,
      label: "course to sell",
    },
    {
      name: "backend",
      key: 2,
      label: "course to sell",
    },
  ]);

  const [coursetosell, setCoursetosell] = useState({
    frontend: false,
    backend: false,
  });

  const handleChangeCourseToSell = (event) => {
    setCoursetosell({
      ...coursetosell,
      [event.target.name]: event.target.checked,
    });
  };
  const Checkbox = ({
    type = "checkbox",
    name,
    checked = false,
    onChange,
    className,
  }) => {
    return (
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className={className}
      />
    );
  };
  const handleChange = (event) => {
    setSkillarrH({
      ...skillarrH,
      [event.target.name]: event.target.checked,
    });
  };
  const yearList = allYears.map((x) => {
    return <option key={x}>{x}</option>;
  });
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    var dataURL = canvas.toDataURL();
    console.log(dataURL);
    setCimg(dataURL);
    const a=dataURL.split(',')
    console.log(a)
    setUserProfile({ ...userProfile, userimage: dataURL});

  }, [completedCrop]);
  const [count, setCount] = useState(0);
  const id = JSON.parse(localStorage.getItem("userid"));
  
  const [job, setJob] = useState([]);
  const [interest,setIntrest]=useState([])

 
  let temp =Object.keys(skillarrH).filter((key) => skillarrH[key])
  const [userProfile, setUserProfile] = useState({
    userid: id.data,
    userimage: Cimg,
    typeofaccount: "",
    location: "",
    collegeName: "",
    startYear: "",
    lastYear: "",
    jobInstance:job,
    skills_already:[],
    skills_demanded:[],
    subject:"",
    experience:"",
    jobrequired:interest,
    interest:interest,
    coursetosell:[]

  });
  useEffect(() => {
    let temp =Object.keys(skillarrH).filter((key) => skillarrH[key])
    
    let temp1 =Object.keys(skillarrToH).filter((key) => skillarrToH[key])
    let temp2 =Object.keys(coursetosell).filter((key) => coursetosell[key])
        setUserProfile({...userProfile,skills_already:temp,skills_demanded:temp1,coursetosell:temp2,typeofaccount:userprof})
    console.log(temp2,coursetosell,userProfile,123890)
  }, [skillarrH,skillarrToH,userprof,coursetosell,count])

  const handleSubmitProfile = async () => {
  
     
    console.log(userProfile);
    await axios({
        method:"post",
        url:"http://localhost:3003/profile",
        data:userProfile
    }).then((res)=>{

        console.log(res)
        if(res.data.data=='send')
        {
          history.push('/home')
        }
    })
  };
  return (
    <div className="">
      <div className="basic-details">
        <div>
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
        {!imgcrop && (
          <div className="">
            {" "}
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <button
              onClick={() => {
                setimgcrop(true);
              }}
            >
              apply
            </button>
          </div>
        )}
        <div>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
              display: "none",
            }}
          />
          {imgcrop && (
            <img
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
              }}
              src={Cimg}
              alt="qwwef"
            />
          )}
        </div>
        <input
          type="text"
          placeholder="address"
          onChange={(e) => {
            setUserProfile({ ...userProfile, location: e.target.value });
          }}
        />
      </div>
      <div className="selector">
        <button
          onClick={() => {
            setUserProf("student");
          }}
        >
          student
        </button>
        <button
          onClick={() => {
            setUserProf("subjme");
          }}
        >
          Subject matter expert{" "}
        </button>
        <button
          onClick={() => {
            setUserProf("recuriter");
          }}
        >
          {" "}
          recruiter
        </button>
      </div>
      {userprof === "student" && (
        <div className="">
          <h1>student</h1>
          <input
            type="text"
            placeholder="university"
            onChange={(e) => {
              setUserProfile({ ...userProfile, collegeName: e.target.value });
            }}
          />
<label htmlFor="" className="">start year</label>
          <select
            name=""
            id="start year"
            onChange={(e) => {
              setUserProfile({ ...userProfile, startYear: e.target.value });
            }}
          ><option value='none' selected> none</option>
            {yearList}
          </select>
          <label htmlFor="" className="">end year</label>
          <select
            name=""
            id="last year"
            onChange={(e) => {
              setUserProfile({ ...userProfile, lastYear: e.target.value });
            }}
          ><option value='none' selected> none</option>
            {yearList}
          </select>
          <label htmlFor="">skill already</label>
          <div className="addpg__skillarrH">
            {skillH.map((item) => (
              <label key={item.key}>
                {item.name}
                <Checkbox
                  name={item.name}
                  checked={skillarrH[item.name]}
                  onChange={handleChange}
                />
              </label>
            ))}

            <input type="text" id="otherSkill" />
            <button
              onClick={() => {
                var a = document.getElementById("otherSkill");
                console.log(a.value);
                let temp = [];
                temp = skillH;
                temp.push({ name: `${a.value}`, key: skillH.length + 1 });
                setSkillH(temp);
                setCount(count + 1);
                a.value = "";
              }}
            >
              add
            </button>

            {console.log(skillH, skillarrH)}
          </div>
          <label htmlFor="">skill demanded</label>
          <div className="addpg__skillarrH">
            {skillToH.map((item) => (
              <label key={item.key}>
                {item.name}
                <Checkbox
                  name={item.name}
                  checked={skillarrToH[item.name]}
                  onChange={handleChangeSkillToH}
                />
              </label>
            ))}

            <input type="text" id="otherSkill_demand" />
            <button
              onClick={() => {
                var a = document.getElementById("otherSkill_demand");
                console.log(a.value);
                let temp = [];
                temp = skillToH;
                temp.push({ name: `${a.value}`, key: skillToH.length + 1 });
                setSkillToH(temp);
                setCount(count + 1);
                a.value = "";
              }}
            >
              add
            </button>

            {console.log(skillH, skillarrH)}
          </div>
        </div>
      )}
      {userprof === "subjme" && (
        <div className="">
          <h1>subject matter expert</h1>
          <input type="text" placeholder="subject" onChange={(e)=>{setUserProfile({...userProfile,subject:e.target.value})}} />
          <input type="text" placeholder="exp" onChange={(e)=>{setUserProfile({...userProfile,experience:e.target.value})}}/>
          <input
            type="text"
            placeholder="clg"
            onChange={(e) => {
              setUserProfile({ ...userProfile, collegeName: e.target.value });
            }}
          />
          <div className="addpg__skillarrH">
              <label htmlFor="">coursetosell</label>
            {courseToSellList.map((item) => (
              <label key={item.key}>
                {item.name}
                <Checkbox
                  name={item.name}
                  checked={coursetosell[item.name]}
                  onChange={handleChangeCourseToSell}
                />
              </label>
            ))}

            <input type="text" id="coursetosell" />
            <button
              onClick={() => {
                var a = document.getElementById("coursetosell");
                console.log(a.value);
                let temp = [];
                temp = courseToSellList;
                temp.push({
                  name: `${a.value}`,
                  key: courseToSellList.length + 1,
                });
                setCourseToSellList(temp);
                setCount(count + 1);
                a.value = "";
              }}
            >
              add
            </button>
            {console.log(coursetosell, courseToSellList)}
            <div className="">
                {interest.map((intrest,index)=>(
                    <div className="">
                        <p>{intrest}</p>
                        <button  id={index} onClick={(e)=>{  
                            
                            setIntrest(interest.filter((element, index) => index !== parseInt(e.target.id)));}}>delete</button>
                    </div>
                ))}
                <input type="text" placeholder='interest' id ='interest' />
                <button onClick={
                    ()=>{
                        let a =document.getElementById('interest')
                        let temp=[]
                        temp=interest
                        if(temp.length<3)
{                        temp.push(a.value)
                        setIntrest(temp)
}   else{alert("not possible more than 3")}                     setCount(count+1)
                    a.value=""
                    }
                }>add</button>
                
            </div>
          </div>
        </div>
      )}
      {userprof === "recuriter" && (
        <div className="">
          <h1>recruiter</h1>
          <input
            type="text"
            placeholder="company"
            onChange={(e) => {
              setUserProfile({ ...userProfile, collegeName: e.target.value });
            }}
          />
          {console.log(job)}
          {job.map((j, index) => (
            <div className="">
              <p>
                {j.job} {j.startSalary}
                {"  "}
                {j.endSalary} {j.language}
              </p>
              <button onClick={handleEdit} id={index}>
                edit
              </button>
              <button
                id={index}
                onClick={(e) => {
                  setJob(
                    job.filter(
                      (element, index) => index !== parseInt(e.target.id)
                    )
                  );
                }}
              >
                delete
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder="job"
            value={jobInstance.job}
            onChange={(e) => {
              setJobInstance({ ...jobInstance, job: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="start salary range"
            value={jobInstance.startSalary}
            onChange={(e) => {
              setJobInstance({ ...jobInstance, startSalary: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="end salary range"
            value={jobInstance.endSalary}
            onChange={(e) => {
              setJobInstance({ ...jobInstance, endSalary: e.target.value });
            }}
          />
          <div className="addpg__skillarrH">
            {langList.map((item) => (
              <label key={item.key}>
                {item.name}
                <Checkbox
                  name={item.name}
                  checked={lang[item.name]}
                  onChange={handleChangelang}
                />
              </label>
            ))}

            <input type="text" id="lang" />
            <button
              onClick={() => {
                var a = document.getElementById("lang");
                console.log(a.value);
                if (!a.value) return;
                let temp = [];
                temp = langList;
                temp.push({ name: `${a.value}`, key: langList.length + 1 });
                setlangList(temp);
                setCount(count + 1);
                a.value = "";
              }}
            >
              add lang
            </button>

            {console.log(langList, lang)}
          </div>
          <button
            onClick={() => {
              let temp;
              temp = job;
              const a = Object.keys(lang).filter((key) => lang[key]);

              temp.push({
                uuid1:makeid(11),
                job: `${jobInstance.job}`,
                startSalary: `${jobInstance.startSalary}`,
                endSalary: `${jobInstance.endSalary}`,
                language: a,
              });
              setJob(temp);
              setJobInstance({
                job: "",
                startSalary: "",
                endSalary: "",
                language: [],
              });
             
             setCount(count+1)
            }}
          >
            {" "}
            add
          </button>
        </div>
      )}

      <button onClick={handleSubmitProfile}>save</button>
    </div>
  );
};

export default ProfilePage;
