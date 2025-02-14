import { useState } from "react";
import Loader from "../../components/Loader.jsx";
import {useProjectPostMutation} from '../../redux/api/PostProject.ApiSlice.js'
import { useNavigate } from "react-router";
import {toast} from 'react-toastify'

function OpenSourceProjectPosting() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubRepoLink, setGithubRepoLink] = useState("");

  const navigate = useNavigate();
  const [postProject ,{isLoading}]=useProjectPostMutation();


  const handleSubmit = async(e) => {
    e.preventDefault();

    const projectData ={
      title ,
      description,
      githubRepoLink
    }

    try {
      const result = await postProject(projectData).unwrap();
     
      if(result){
        toast.success("project posted successFully! ✅");
        navigate('/getallProjects')
      }

      
    } catch (error) {
      let errorMessage = "project not submitted! ❌"; 
    
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
      console.log("something went wrong while posting a  project ", error)
      
    }



  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Post an Open Source Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        ></textarea>
        <input
          type="url"
          placeholder="GitHub Repository Link"
          value={githubRepoLink}
          onChange={(e) => setGithubRepoLink(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold p-3 rounded-lg hover:bg-green-700 transition"
        >
          Post Project
        </button>
      </form>
      {isLoading && <Loader/>}
    </div>
  );
}

export default OpenSourceProjectPosting;
