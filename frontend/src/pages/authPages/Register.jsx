import { useState } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice.js"
import {useNavigate} from 'react-router-dom'
import Loader from  '../../components/Loader.jsx'
import { toast } from "react-toastify";

function Register() {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [batch, setBatch] = useState("");
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");
  const [intrests, setintrests] = useState([]);
  const [intrestsInput , setintrestsInput] = useState([])

  // const [Linkdin, setLinkdin] = useState("");
  const [Linkdin , setLinkdin] = useState("");
  const [Github, setGithub] = useState("");
  const [image, setImage] = useState(null);
  const [skillInput, setSkillInput] = useState("");

  const [register, { isLoading, error }] = useRegisterMutation(); 
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("skills", JSON.stringify(skills));
    formData.append("batch", batch);
    formData.append("education", education);
    formData.append("bio", bio);
    formData.append("intrests", intrests);
    formData.append("Linkdin", Linkdin);
    formData.append("Github", Github);
    formData.append("avatar", image); // 'image' matches Multer field name
    

    try {
      const result = await register(formData).unwrap(); // Call RTK Query mutation
      console.log("Response:", result);
      if(result){
        toast.success("user register successFully! ✅");
        navigate('/login')
      }
    } catch (error) {
      let errorMessage = "register failed! ❌"; 
    
      if (error?.data) {
       
        const isHtml = typeof error.data === "string" && error.data.includes("<html");
    
        if (isHtml) {
         
          const match = error.data.match(/Error:\s(.*?)<br>/);
          if (match) {
            errorMessage = match[1]; 
          }
        } else if (error.data.message) {
          errorMessage = error.data.message; 
        }
      }
    
      toast.error(errorMessage, { position: "top-right" });
      console.error("Upload failed:", error);
    }
  };

const addSkills = (e) => {
  e.preventDefault();
  if (skillInput.trim() && !skills.includes(skillInput.trim())) {
    setSkills((prevSkills) => [...prevSkills, skillInput.trim()]);
    setSkillInput(""); // Clear input after adding skill
  }
};

const addintrests =(e)=>{

  e.preventDefault();
  if (intrestsInput.trim() && !intrests.includes(intrestsInput.trim())) {
    setintrests((prevSkills) => [...prevSkills, intrestsInput.trim()]);
    intrestsInput(""); // Clear input after adding skill
  }

}

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#004d40] mb-6 text-center">Register</h2>

        {/* {error && <p className="text-red-600 text-center mb-4">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">


          <div>
            <label htmlFor="fullName" className="block font-semibold text-gray-700">Name</label>
            <input type="text" id="fullName" name="fullName" value={fullName} onChange={(e)=>setFullName(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="userName" className="block font-semibold text-gray-700">userName</label>
            <input type="text" id="userName" name="userName" value={userName} onChange={(e)=>setUserName(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>
          <div>
            <label htmlFor="batch" className="block font-semibold text-gray-700">Batch</label>
            <input type="text" id="batch" name="batch" value={batch} onChange={(e)=>setBatch(e.target.value)} placeholder="e.g., 2024" required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="role" className="block font-semibold text-gray-700">Role</label>
            <select id="role" name="role" value={role} onChange={(e)=>setRole(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]">
              <option value="">Select Role</option>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div>
            <label htmlFor="profilePicture" className="block font-semibold text-gray-700">Profile Picture URL</label>
            <input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange} placeholder="enter your profile pic" className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="education" className="block font-semibold text-gray-700">Education</label>
            <input type="text" id="education" name="education" onChange={(e)=>setEducation(e.target.value)} placeholder="e.g., B.Tech in Computer Science" required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>
          <div>

            <label htmlFor="bio" className="block font-semibold text-gray-700">Bio</label>
            <textarea id="bio" name="bio" onChange={(e)=>{setBio(e.target.value)}} rows="3" placeholder="Tell us about yourself..." className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"></textarea>
          </div>

          <div>
            <label htmlFor="Linkdin" className="block font-semibold text-gray-700">LinkedIn URL</label>
            <input type="url" id="Linkdin" name="Linkdin" onChange={(e)=>setLinkdin(e.target.value)} placeholder="https://linkedin.com/in/username" className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
        
            <label htmlFor="Github" className="block font-semibold text-gray-700">GitHub URL</label>
            <input type="url" id="Github" name="Github" onChange={(e)=>setGithub(e.target.value)} placeholder="https://github.com/username" className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="skills" className="block font-semibold text-gray-700">Skills</label>
            <div className="flex gap-2 mt-1">
              <input type="text" id="skills" name="skills" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Enter a skill" className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#004d40]" />
              <button onClick={addSkills} className="bg-[#004d40] text-white p-3 rounded-lg">
                Add
              </button>
              </div>
            </div>

            <div className="mt-2">
        {skills.map((skill, index) => (
          <span key={index} className="inline-block bg-gray-200 text-gray-800 py-1 px-2 mr-2 mb-2 rounded">
            {skill}
          </span>
        ))}
      </div>  

      <div>
            <label htmlFor="intrests" className="block font-semibold text-gray-700">Skills</label>
            <div className="flex gap-2 mt-1">
              <input type="text" id="intrests" name="intrests" value={intrestsInput} onChange={(e) => setintrestsInput(e.target.value)} placeholder="Enter a skill" className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#004d40]" />
              <button onClick={addintrests} className="bg-[#004d40] text-white p-3 rounded-lg">
                Add
              </button>
              </div>
      </div>

      <div className="mt-2">
        {intrests.map((intrest, index) => (
          <span key={index} className="inline-block bg-gray-200 text-gray-800 py-1 px-2 mr-2 mb-2 rounded">
            {intrest}
          </span>
        ))}
      </div>  

          {/* </div> */}

          <button type="submit" className="w-full p-3 bg-[#004d40] text-white rounded-lg uppercase font-semibold hover:bg-[#00332a] transition">
            Register
          </button>

        </form>
        {isLoading && <Loader/>}

      </div>
    </div>
  );
};

export default Register;
