import { useEffect } from "react";
import {useGetProjectsQuery} from '../../redux/api/PostProject.ApiSlice.js'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { useGetJobsQuery } from "../redux/api/jobApi";



function ShowProjects() {
    const { data: projects, error, isLoading, isSuccess, isError } = useGetProjectsQuery();
    // console.log(projects)
    console.log(error)
    console.log(isLoading)
    console.log(isSuccess)
    console.log(isError);
    

    const {userInfo} = useSelector((state)=>(state.auth))
    
    const navigate = useNavigate()
    // console.log(userInfo.data.user.role)
  
    

  

  if (isLoading) return <p className="text-center text-gray-500">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching jobs</p>;

  const Handle =()=>{
    navigate('/projectposting')
  }
  return (
    // <div className="max-w-4xl mx-auto p-6">
    //   <h2 className="text-3xl font-bold text-center mb-6">projects you can work on </h2>
    // { userInfo.data.user.role=="alumni" ?<button className="bg-red-500 w-72 py-3 rounded-2xl my-4" onClick={Handle}>post</button> :null }
    //   <div className="grid gap-6">
    //     {projects?.map((project) => (
    //       <div key={project.id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
    //         <h3 className="text-xl font-semibold text-blue-600">{project.title}</h3>
    //         <p className="text-gray-700 font-medium">{project.description}</p>
    //         <a href={project.githubRepoLink} className="text-blue-600 hover:text-red-700">github Link</a>
            
    //       </div>

    //     ))}

    //   </div>
    // </div>



    

    <main className="p-6 bg-[#e0f2f1] min-h-screen">
    <div className="container mx-auto">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">Open source project where you can contribute</h1>
        <p className="mt-2 text-lg text-gray-600">
          Find project  or post your project 
        </p>
      </header>
      



      {/* Job Posting Section */}
  {/* {userInfo ? (
      userInfo.data.user.role === "alumni" ? (
        <section id="post-job" className={`mb-10 bg-white p-3 rounded-lg shadow-md text-center `}>
          {!showForm ? (
            <button
              onClick={handleToggleForm}
              className=" h-16 px-6 py-3 w-76 md:w-6xl lg:w-6xl bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
            >
              Post a Job
            </button>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Post a Job
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="title" className="font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      placeholder="Enter job title"
                      required
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="company" className="font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={company}
                      onChange={(e)=>setCompany(e.target.value)}
                      placeholder="Company name"
                      required
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="company" className="font-medium text-gray-700">
                      Requirements
                    </label>
                    <input
                      type="text"
                      id="requirements"
                      value={requirements}
                      onChange={(e)=>setRequirements(e.target.value)}
                      placeholder="Company name"
                      required
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    />
                  </div>


                  <div className="flex flex-col">
                    <label htmlFor="company" className="font-medium text-gray-700">
                      Salary
                    </label>
                    <input
                      type="text"
                      id="salary"
                      value={salary}
                      onChange={(e)=>setSalary(e.target.value)}
                      placeholder="Company name"
                      required
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="font-medium text-gray-700">
                    Job Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    placeholder="Enter job description"
                    required
                    className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label htmlFor="location" className="font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e)=>setLocation(e.target.value)}
                      placeholder="Job location"
                      required
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="jobType" className="font-medium text-gray-700">
                      Job Type
                    </label>
                    <select
                      id="jobType"
                      value={jobType}
                      onChange={(e)=>setJobType(e.target.value)}
                      required
                      className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]" >
                        <option value="">Job Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
                  >
                    Post Job
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleForm}
                    className="px-6 py-3 bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
                {isLoading && <Loader/>}
              </form>
              
            </>
          )}
        </section>
      ) : userInfo.data.user.role === "student" ? (
        <section className="mb-10 text-center">
          <p className="text-red-500 font-bold">
            Only alumni can post jobs.
          </p>
        </section>
      ) : null
    ) : null} */}






   




  <div className="container mx-auto px-4 py-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Job Listings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs?.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  </div>



    </div>
  </main>

  );
}

export default ShowProjects;
