// import { useState } from "react";
// import Loader from "../../components/Loader.jsx";
// import {useProjectPostMutation} from '../../redux/api/PostProject.ApiSlice.js'
// import { useNavigate } from "react-router";
// import {toast} from 'react-toastify'
// import { useSelector } from "react-redux";

// function OpenSourceProjectPosting() {
//   const {userInfo} = useSelector(state=>state.auth)
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [githubRepoLink, setGithubRepoLink] = useState("");

//   const navigate = useNavigate();
//   const [postProject ,{isLoading}]=useProjectPostMutation();

 


//   const handleSubmit = async(e) => {
//     e.preventDefault();

//     const projectData ={
//       title ,
//       description,
//       githubRepoLink
//     }

//     try {
//       const result = await postProject(projectData).unwrap();
     
//       if(result){
//         toast.success("project posted successFully! ✅");
//         navigate('/getallProjects')
//       }

      
//     } catch (error) {
//       let errorMessage = "project not submitted! ❌"; 
    
//       if (error?.data) {
       
//         const isHtml = typeof error.data === "string" && error.data.includes("<html");
    
//         if (isHtml) {
         
//           const match = error.data.match(/Error:\s(.*?)<br>/);
//           if (match) {
//             errorMessage = match[1]; 
//           }
//         } else if (error.data.message) {
//           errorMessage = error.data.message; 
//         }
//       }
    
//       toast.error(errorMessage, { position: "top-right" });
//       console.log("something went wrong while posting a  project ", error)
      
//     }



//   };

//   return (



//     <main className="p-6 bg-[#e0f2f1] min-h-screen">
//     <div className="container mx-auto">
//       {/* Header */}
//       <header className="text-center mb-10">
//         <h1 className="text-4xl font-extrabold text-gray-800">Open source project where you can contribute</h1>
//         <p className="mt-2 text-lg text-gray-600">
//           Find project  or post your project 
//         </p>
//       </header>
      



//       {/* Job Posting Section */}
//   {/* {userInfo ? (
//       userInfo.data.user.role === "alumni" ? (
//         <section id="post-job" className={`mb-10 bg-white p-3 rounded-lg shadow-md text-center `}>
//           {!showForm ? (
//             <button
//               onClick={handleToggleForm}
//               className=" h-16 px-6 py-3 w-76 md:w-6xl lg:w-6xl bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
//             >
//               Post a Job
//             </button>
//           ) : (
//             <>
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">
//                 Post a Job
//               </h2>
//               <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex flex-col">
//                     <label htmlFor="title" className="font-medium text-gray-700">
//                       Job Title
//                     </label>
//                     <input
//                       type="text"
//                       id="title"
//                       value={title}
//                       onChange={(e)=>setTitle(e.target.value)}
//                       placeholder="Enter job title"
//                       required
//                       className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label htmlFor="company" className="font-medium text-gray-700">
//                       Company
//                     </label>
//                     <input
//                       type="text"
//                       id="company"
//                       value={company}
//                       onChange={(e)=>setCompany(e.target.value)}
//                       placeholder="Company name"
//                       required
//                       className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label htmlFor="company" className="font-medium text-gray-700">
//                       Requirements
//                     </label>
//                     <input
//                       type="text"
//                       id="requirements"
//                       value={requirements}
//                       onChange={(e)=>setRequirements(e.target.value)}
//                       placeholder="Company name"
//                       required
//                       className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                     />
//                   </div>


//                   <div className="flex flex-col">
//                     <label htmlFor="company" className="font-medium text-gray-700">
//                       Salary
//                     </label>
//                     <input
//                       type="text"
//                       id="salary"
//                       value={salary}
//                       onChange={(e)=>setSalary(e.target.value)}
//                       placeholder="Company name"
//                       required
//                       className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex flex-col">
//                   <label htmlFor="description" className="font-medium text-gray-700">
//                     Job Description
//                   </label>
//                   <textarea
//                     id="description"
//                     value={description}
//                     onChange={(e)=>setDescription(e.target.value)}
//                     placeholder="Enter job description"
//                     required
//                     className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   ></textarea>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="flex flex-col">
//                     <label htmlFor="location" className="font-medium text-gray-700">
//                       Location
//                     </label>
//                     <input
//                       type="text"
//                       id="location"
//                       value={location}
//                       onChange={(e)=>setLocation(e.target.value)}
//                       placeholder="Job location"
//                       required
//                       className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                     />
//                   </div>
//                   <div className="flex flex-col">
//                     <label htmlFor="jobType" className="font-medium text-gray-700">
//                       Job Type
//                     </label>
//                     <select
//                       id="jobType"
//                       value={jobType}
//                       onChange={(e)=>setJobType(e.target.value)}
//                       required
//                       className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]" >
//                         <option value="">Job Type</option>
//                       <option value="Full-Time">Full-Time</option>
//                       <option value="Part-Time">Part-Time</option>
//                       <option value="Internship">Internship</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="flex justify-between">
//                   <button
//                     type="submit"
//                     className="px-6 py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
//                   >
//                     Post Job
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleToggleForm}
//                     className="px-6 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//                 {isLoading && <Loader/>}
//               </form>
              
//             </>
//           )}
//         </section>
//       ) : userInfo.data.user.role === "student" ? (
//         <section className="mb-10 text-center">
//           <p className="text-red-500 font-bold">
//             Only alumni can post jobs.
//           </p>
//         </section>
//       ) : null
//     ) : null} */}






   




//   <div className="container mx-auto px-4 py-8">
//     <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Job Listings</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {jobs?.map((job) => (
//         <JobCard key={job.id} job={job} />
//       ))}
//     </div>
//   </div>



//     </div>
//   </main>




//   );
// }

// export default OpenSourceProjectPosting;
