import { useState } from "react";
import {useEventPostMutation} from '../../redux/api/events.ApiSlice.js'
import { redirect, useNavigate } from "react-router";
import Loader from '../../components/Loader.jsx'
import {toast} from 'react-toastify'
import { useSelector } from "react-redux";
import { useGetEventsQuery } from "../../redux/api/events.ApiSlice.js";

function EventPosting() {


  const {userInfo } = useSelector(state=>state.auth)
  console.log(userInfo)
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [organiser, setOrganiser] = useState("");
  const [date ,setDate]= useState("")
  const [eventMode, setEventMode] = useState("online");
  const [joiningLink, setJoiningLink] = useState("");

  const [postEvent ,{isLoading}] = useEventPostMutation();

  // console.log(postEvent)
  const navigate =useNavigate();
  const { data: events, error, isSuccess, isError } = useGetEventsQuery();

  
  console.log("the events are",events)
  console.log(error);
  console.log(isSuccess);
  console.log(isError)
  
  


  const handleSubmit = async(e) => {
    e.preventDefault();
    const eventData = {
      title ,
      about ,
      organiser,
      date,
      eventMode,
      joiningLink
    }
    try {
      const result = await postEvent(eventData).unwrap();
      if(result){
        toast.success("event posted successFully! ✅");
        navigate('/getallevents')
      }
      
    } catch (error) {
       let errorMessage = "event not posted successfully! ❌"; 
          
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
      console.error("there is some error while posting the event from frontend ",error)
    }

  };

//   return (

//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
//       <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Post an Event</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Event Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         <textarea
//           placeholder="About the Event"
//           value={about}
//           onChange={(e) => setAbout(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           required
//         ></textarea>
//         <input
//           type="text"
//           placeholder="Organiser Name"
//           value={organiser}
//           onChange={(e) => setOrganiser(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           required
//         />
//         <select
//           value={eventMode}
//           onChange={(e) => setEventMode(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//         >
//           <option value="online">online</option>
//           <option value="offline">offline</option>
//         </select>
//         <input
//           type="url"
//           placeholder="Joining Link (if Online)"
//           value={joiningLink}
//           onChange={(e) => setJoiningLink(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition"
//         >
//           Post Event
//         </button>
//       </form>
//       {isLoading && <Loader/>}
//     </div>
//   );
// }
















  // State for events
  // const [events, setEvents] = useState(loadEvents();
  // Toggle for showing the post-event form
 
 
 
  const [showPostForm, setShowPostForm] = useState(false);
 


 
  // Handle changes in the post-event form
  // const handleNewEventChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewEvent((prev) => ({ ...prev, [name]: value }));
  // };

  // Handle posting a new event
  // const handlePostEvent = (e) => {
  //   e.preventDefault();
    // Compute a new unique id
    // const newId =
    //   events.length > 0 ? Math.max(...events.map((ev) => ev.id)) + 1 : 1;
    // Add a postedBy field (if the user is logged in)
    // const eventToAdd = {
    //   ...newEvent,
    //   id: newId,
    //   postedBy: user ? user.email : null,
    // };
    // setEvents([...events, eventToAdd]);
    // Reset the form and hide it
  
  //   setShowPostForm(false);
  // };

  // Handle deletion of an event by id with confirmation


  // const handleDeleteEvent = (id) => {
  //   // Ask the user for confirmation before deletion
  //   const confirmed = window.confirm(
  //     'Are you sure you want to delete this event?'
  //   );
  //   if (confirmed) {
  //     setEvents(events.filter((ev) => ev.id !== id));
  //   }
  // };



  return (
    <main className="p-6 bg-[#e0f2f1] min-h-screen">
      <div className="container mx-auto">

        {/* Page Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Upcoming Events
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Stay updated with our latest events and activities!
          </p>
        </header>

        {/* Show Post Event button for authorized users */}

        {userInfo && (userInfo.data.user.role === 'alumni' || userInfo.data.user.role === 'student') && (
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowPostForm(!showPostForm)}
              className="px-4 py-2 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
            >
              {showPostForm ? 'Cancel' : 'Post an Event'}
            </button>
          </div>
        )}

        {/* Post Event Form */}

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
                  placeholder="Enter event title"  />

              </div>


              <div>
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description  </label>
                <textarea
                  id="about"
                  name="about"
                  value={about}
                  onChange={(e)=>setAbout(e.target.value)}
                  required
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                  placeholder="Enter event description"
                ></textarea>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e)=>setDate(e.target.value)}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                  />
                </div>


                <div>
                  <label htmlFor="organiser" className="block text-gray-700 font-medium mb-2"> organiser </label>
                  <input
                    type="text"
                    id="organiser"
                    name="organiser"
                    value={organiser}
                    onChange={(e)=>setOrganiser(e.target.value)}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    placeholder="organiser"
                  />
                </div>

                <div>
                  <label htmlFor="eventMode" className="block text-gray-700 font-medium mb-2">  event mode </label>
                  <input
                    type="text"
                    id="eventMode"
                    name="eventMode"
                    value={eventMode}
                    onChange={(e)=>setEventMode(e.target.value)}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    placeholder="offline or onlie"
                  />
                </div>


                <div>
                  <label htmlFor="joiningLink" className="block text-gray-700 font-medium mb-2">  Joining Link </label>
                  <input
                    type="url"
                    id="joiningLink"
                    name="joiningLink"
                    value={joiningLink}
                    onChange={(e)=>setJoiningLink(e.target.value)}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                    placeholder="Enter location"
                  />
                </div>



              </div>

              {/* <div>
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Image URL
                </label>
                <input
                  type=""
                  id="image"
                  name="image"
                  value={newEvent.image}
                  onChange={(e)=>(e.target.value)}
                  placeholder="https://example.com/event.jpg"
                  className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                />
              </div> */}



              <button
                type="submit"
                className="w-full py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
              >
                Post Event
              </button>
            </form>
          </div>
        )}

       
       
        {/* Display Events Grid */}
      
      
      
      
      
          {/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 relative"
            >
              <img
                src={event.image || '/images/default_event.jpg'}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-600 mt-2">{event.about}</p>
                <div className="mt-4">
                  <span className="block text-gray-700 font-medium">
                    Date: {event.date}
                  </span>
                  <span className="block text-gray-700 font-medium">
                    Location: {event.location}
                  </span>
                </div> */}
                {/* Show delete button if this event was posted by the logged-in user */}
                 {/* {user && event.postedBy === user.email && (
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))} 
          </section>  */}
          




        
      </div>
    </main>
  );
};

export default EventPosting;
