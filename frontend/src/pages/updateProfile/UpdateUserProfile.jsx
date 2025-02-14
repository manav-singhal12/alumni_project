import { useState } from "react";
import {useUpdateProfileMutation} from '../../redux/api/userApiSlice.js'
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader.jsx";

function UpdateUserProfile() {

  const {userInfo} = useSelector(state=>state.auth)

  const [fullName, setFullName] = useState(userInfo?.fullName || "");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [batch, setBatch] = useState("");
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateProfile , {isLoading}]= useUpdateProfileMutation();
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    
    // console.log({
    //   fullName,
    //   email,
    //   role,
    //   skills,
    //   batch,
    //   education,
    //   bio,
    //   interests,
    //   linkedin,
    //   github,
    //   password,
    //   newPassword,
    // });
    const updateData= {
      fullName,
        email,
        role,
        skills,
        batch,
        education,
        bio,
        interests,
        linkedin,
        github,
        password,
        newPassword,
      
    }
    
    const result = await updateProfile(updateData).unwrap();
    console.log(result)
    if(result){
      alert("profile updated successfully")
    }
    
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-black text-white shadow-lg rounded-lg border border-yellow-500">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-6">Update Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Full Name" value={fullName} defaultValue={userInfo.fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="text" placeholder="Skills" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="text" placeholder="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="text" placeholder="Education" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300"></textarea>
        <input type="text" placeholder="Interests" value={interests} onChange={(e) => setInterests(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="url" placeholder="LinkedIn Profile" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="url" placeholder="GitHub Profile" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="password" placeholder="Current Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-3 border border-yellow-400 rounded-lg bg-gray-900 text-yellow-300" />
        <button type="submit" className="w-full bg-yellow-500 text-black font-semibold p-3 rounded-lg hover:bg-yellow-600 transition">Update Profile</button>
      </form>
      
      {isLoading && <Loader/>}
    </div>
  );
}

export default UpdateUserProfile;
