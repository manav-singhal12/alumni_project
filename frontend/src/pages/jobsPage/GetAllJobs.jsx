import { useEffect ,useState} from "react";
import { useJobPostingMutation } from "../../redux/api/jobs.ApiSlice.js";
import {useAllJobsQuery} from '../../redux/api/jobs.ApiSlice.js'
import { useSelector } from "react-redux";

import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";

// import { useGetJobsQuery } from "../redux/api/jobApi";



function GetAllJobs() {

  const { data: jobs, error } = useAllJobsQuery();

// jobs.length=0;
    console.log(jobs)
    // console.log("the length is ",jobs.length)

    const [postJob ,{isLoading} ] = useJobPostingMutation(); 

    const {userInfo} = useSelector((state)=>(state.auth))
  
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [salary, setSalary] = useState("");



   
    const handleSubmit = async(e) => {
        e.preventDefault();
       const jobsData = {
        title ,
        company ,
        location ,
        jobType,
        description,
        requirements,
        salary

       }
        try {
            
            const jobresult = await postJob(jobsData).unwrap(); 
            console.log(jobresult)
            toast.success("job posted successFully! ✅");
      
                        
          } catch (error) {
             let errorMessage = "job not posted successfully! ❌";                      
                        if (error?.data) {                        
                          const isHtml = typeof error.data === "string" && error.data.includes("<html");                     
                          if (isHtml) {                           
                            const match = error.data.match(/Error:\s(.*?)<br>/);
                            if (match) {
                              errorMessage = match[1];     }
                          } else if (error.data.message) {
                            errorMessage = error.data.message; 
                          }
                        }                      
                    toast.error(errorMessage, { position: "top-right" });
            console.error("Upload failed:", error); }  };

      const [showForm, setShowForm] = useState(false);
      const handleToggleForm = () => {
        setShowForm((prev) => !prev);
      };

      const handleSearchSubmit=()=>{

      }




  return (
    <main className="p-6 bg-[#e0f2f1] min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">Alumni Job Portal</h1>
          <p className="mt-2 text-lg text-gray-600">
            Find your dream job or post your opportunities
          </p>
        </header>
        

        {/* Search Filters */}
        {/* <section id="search-filters" className="mb-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Search &amp; Filter
          </h2>
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="search-title" className="font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                id="search-title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="e.g., Software Engineer"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="search-location" className="font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="search-location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="e.g., New York"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="search-type" className="font-medium text-gray-700">
                Job Type
              </label>
              <select
                id="search-type"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
              >
                <option value="">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-center">
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </section> */}



        {/* Job Posting Section */}
    {userInfo ? (
        userInfo.data.user.role === "alumni" ? (
          <section id="post-job" className="mb-10 bg-white p-3 rounded-lg shadow-md text-center w-7xl">
            {!showForm ? (
              <button
                onClick={handleToggleForm}
                className="w-6xl h-16 px-6 py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
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
      ) : null}






        {/* Job Listings Section */}
        <section id="job-listings" className="mb-10">
  <h2 className="text-2xl font-bold mb-4 text-gray-800">Jobs</h2>

  {/* Loading State */}
  {isLoading && <p className="text-gray-600">Loading job listings...</p>}

  {/* Error State */}
  {error && <p className="text-red-600">Error loading job listings: {error.message}</p>}

  {/* Empty State */}
  {!isLoading && !error && jobs?.length === 0 && (
    <p className="text-gray-600">No job listings available at the moment.</p>
  )}

  {/* Job Listings Grid */}
  {!isLoading && !error && jobs?.length > 0 && (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <article
          key={job.id || index}
          className="p-6 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          aria-labelledby={`job-title-${job.id || index}`}
        >
          <h3 id={`job-title-${job.id || index}`} className="text-xl font-bold text-gray-800 mb-2">
            {job.title}
          </h3>
          <p className="text-gray-700 mb-4">{job.description}</p>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Salary:</span> ₹{job.salary}
            </p>
            <p>
              <span className="font-medium">Company:</span> {job.company}
            </p>
            <p>
              <span className="font-medium">Location:</span> {job.location}
            </p>
            <p>
              <span className="font-medium">Type:</span> {job.jobType}
            </p>
            <p>
              <span className="font-medium">Requirements:</span> {job.requirements}
            </p>
          </div>

          <a
            href={job.applyLink || "#"}
            className="mt-4 inline-block text-blue-700 font-semibold text-lg hover:text-blue-900 transition-colors duration-300"
            aria-label={`Apply for ${job.title} at ${job.company}`}
          >
            Apply here
          </a>
        </article>
      ))}
    </div>
  )}
</section>



    {/* {job listing ends here } */}



      </div>
    </main>
  );
};

export default GetAllJobs;
