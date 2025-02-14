import { useEffect } from "react";
import {useGetEventsQuery} from '../../redux/api/events.ApiSlice.js'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { useGetJobsQuery } from "../redux/api/jobApi";



function GetAllEvents() {
    const { data: events, error, isLoading, isSuccess, isError } = useGetEventsQuery();
    console.log(events)
    // console.log(error)
    // console.log(isLoading)
    // console.log(isSuccess)
    // console.log(isError);
    

    const {userInfo} = useSelector((state)=>(state.auth))
    
    const navigate = useNavigate()
    // console.log(userInfo.data.user.role)
  
    

  

  if (isLoading) return <p className="text-center text-gray-500">Loading jobs...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching jobs</p>;

  const Handle =()=>{
    navigate('/eventposting')
  }
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">projects you can work on </h2>
    { userInfo.data.user.role=="alumni" ?<button className="bg-red-500 w-72 py-3 rounded-2xl my-4" onClick={Handle}>post</button> :null }
      <div className="grid gap-6">
        {events?.map((event) => (
          <div key={event._id} className="bg-white p-4 shadow-md rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
            <p className="text-gray-700 font-medium">{event.about}</p>
            <p className="text-gray-700 font-medium">{event.eventMode}</p>
            <p className="text-gray-700 font-medium">{event.organiser}</p>
            <p className="text-gray-700 font-medium">{event.joiningLink}</p>
           
            
          </div>

        ))}

      </div>
    </div>
  );
}

export default GetAllEvents;
