import { useEffect ,useState } from "react";
import {useGetProjectsQuery ,useProjectPostMutation} from '../../redux/api/PostProject.ApiSlice.js'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ProjectCard from "./ProjectCard.jsx";
import {toast} from 'react-toastify'
// import { useGetJobsQuery } from "../redux/api/jobApi";



function ShowProjects() {
    const { data: projects, error, isLoading, isSuccess, isError } = useGetProjectsQuery();
    const [PostProject ] = useProjectPostMutation();
 

    const [title , setTitle]= useState("");
    const [description , setDescription] = useState("");
    const [githubRepoLink ,setGithubRepoLink] = useState("");

    const {userInfo} = useSelector((state)=>(state.auth))
    
    const navigate = useNavigate()

  
      const handleSubmit = async(e) => {
        e.preventDefault();
        const ProjectData = {
          title ,
          description,
          githubRepoLink
        }
        try {
          const result = await PostProject(ProjectData).unwrap();
          if(result){
            toast.success("project posted successFully! ✅");
          
          }
          
        } catch (error) {
           let errorMessage = "project not posted successfully! ❌"; 
              
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
          console.error("there is some error while posting the project from frontend ",error)
        }
    
      };

  

const [showPostForm, setShowPostForm] = useState(false);


    

  if (isLoading) return <p className="text-center text-gray-500">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching jobs</p>;

  const Handle =()=>{
    navigate('/projectposting')
  }
  return (
    <>



    <main className="p-6 bg-[#e0f2f1] min-h-screen">
    <div className="container mx-auto">



      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Open source project where you can contribute</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find project  or post your project 
        </p>
      </header>
      






{userInfo && (userInfo.data.user.role === 'alumni' || userInfo.data.user.role === 'student') && (
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowPostForm(!showPostForm)}
          className="px-4 py-2 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
        >
          {showPostForm ? 'Cancel' : 'Post an project'}
        </button>
      </div>
    )}



    
{showPostForm && (
          <div className="mb-10 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
          
          
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Post an Event
            </h2>


            <form onSubmit={handleSubmit} className="space-y-4">
             
             
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2" >Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
                  required
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                  placeholder="Enter ptoject title"  />
              </div>



              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description  </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e)=>setDescription (e.target.value)}
                  required
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                  placeholder="Enter project description"
                ></textarea>
              </div>


              <div className="grid ">
              


                <div>
                  <label htmlFor="githubRepoLink" className="block text-gray-700 font-medium mb-2"> Github Repo. Link </label>
                  <input
                    type="text"
                    id="githubRepoLink"
                    name="githubRepoLink"
                    value={githubRepoLink}
                    onChange={(e)=>setGithubRepoLink(e.target.value)}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    placeholder="Github Repo. link"
                  />
                </div>    


              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
              >
                Post Event
              </button>
            </form>
          </div>
        )}


<div className="min-h-screen bg-gradient-to-r  p-8">
      <div className="space-y-8 max-w-7xl mx-auto ">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>



    </div>
  </main>



</>
  );
}

export default ShowProjects;
