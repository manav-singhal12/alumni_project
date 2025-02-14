import { useState } from "react";
import {useEventPostMutation} from '../../redux/api/events.ApiSlice.js'
// import { redirect, } from "react-router";
import {useNavigate } from "react-router-dom"
// import Loader from '../../components/Loader.jsx'
import {toast} from 'react-toastify'
import { useSelector } from "react-redux";
import { useGetEventsQuery } from "../../redux/api/events.ApiSlice.js";

function EventPosting() {


  const {userInfo } = useSelector(state=>state.auth)
  console.log(userInfo)
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [organiser, setOrganiser] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [eventMode, setEventMode] = useState("online");
  const [joiningLink, setJoiningLink] = useState("");

  const [postEvent ,{isLoading}] = useEventPostMutation();

  // console.log(postEvent)
  const navigate =useNavigate();
  const { data:eventData, error, isSuccess, isError } = useGetEventsQuery();
  // console.log("the first event is",events[0]);

  console.log(eventData)
  console.log("the events are", eventData?.data.length || 0);

 
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
 
  const [showPostForm, setShowPostForm] = useState(false);
 
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

                   <select
                          id="eventMode"
                          name="eventMode"
                          value={eventMode}
                          onChange={(e) => setEventMode(e.target.value)}
                          required
                          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
                        >
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                     </select>

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

              {/* Joining Link (Only for Online Events) */}
              {/* {x.eventMode === "online" && x.joiningLink && (
                <a
                  href={x.joiningLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#004d40] font-semibold hover:underline"
                >
                  Join Event
                </a>
              )}
            </div>
          ))} 
          </section>  */}
          




        
      </div>
    </main>
  );
};

export default EventPosting;












// import React, { useState, useContext, useEffect } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const Events = () => {
//   // Default events data
//   const defaultEvents = [
//     {
//       id: 1,
//       title: 'Campus Open House',
//       description:
//         'Explore our campus and facilities during our open house event. Meet faculty and discover our programs.',
//       date: '2025-03-15',
//       location: 'Main Campus',
//       image: '/images/campus_open_house.jpg',
//     },
//     {
//       id: 2,
//       title: 'Alumni Reunion',
//       description:
//         'Reconnect with old friends and celebrate our alumni community at our annual reunion.',
//       date: '2025-04-10',
//       location: 'Alumni Hall',
//       image: '/images/alumni_reunion.jpg',
//     },
//     {
//       id: 3,
//       title: 'Tech Conference',
//       description:
//         'Join industry leaders for a day of discussions on emerging technologies and innovation.',
//       date: '2025-05-05',
//       location: 'Convention Center',
//       image: '/images/tech_conference.jpg',
//     },
//   ];

//   // Function to load events from localStorage (or initialize with default events)
//   const loadEvents = () => {
//     const storedEvents = localStorage.getItem('events');
//     if (storedEvents) {
//       return JSON.parse(storedEvents);
//     } else {
//       localStorage.setItem('events', JSON.stringify(defaultEvents));
//       return defaultEvents;
//     }
//   };

//   // State for events
//   const [events, setEvents] = useState(loadEvents());
//   // Toggle for showing the post-event form
//   const [showPostForm, setShowPostForm] = useState(false);
//   // New event form state
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     description: '',
//     date: '',
//     location: '',
//     image: '',
//   });

//   // Get the current user from AuthContext
//   const { user } = useContext(AuthContext);

//   // Persist events to localStorage whenever events state changes
//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // Handle changes in the post-event form
//   const handleNewEventChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle posting a new event
//   const handlePostEvent = (e) => {
//     e.preventDefault();
//     // Compute a new unique id
//     const newId =
//       events.length > 0 ? Math.max(...events.map((ev) => ev.id)) + 1 : 1;
//     // Add a postedBy field (if the user is logged in)
//     const eventToAdd = {
//       ...newEvent,
//       id: newId,
//       postedBy: user ? user.email : null,
//     };
//     setEvents([...events, eventToAdd]);
//     // Reset the form and hide it
//     setNewEvent({
//       title: '',
//       description: '',
//       date: '',
//       location: '',
//       image: '',
//     });
//     setShowPostForm(false);
//   };

//   // Handle deletion of an event by id with confirmation
//   const handleDeleteEvent = (id) => {
//     // Ask the user for confirmation before deletion
//     const confirmed = window.confirm(
//       'Are you sure you want to delete this event?'
//     );
//     if (confirmed) {
//       setEvents(events.filter((ev) => ev.id !== id));
//     }
//   };

//   return (
//     <main className="p-6 bg-[#e0f2f1] min-h-screen">
//       <div className="container mx-auto">
//         {/* Page Header */}
//         <header className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold text-gray-800">
//             Upcoming Events
//           </h1>
//           <p className="mt-2 text-lg text-gray-600">
//             Stay updated with our latest events and activities!
//           </p>
//         </header>

//         {/* Show Post Event button for authorized users */}
//         {user && (user.role === 'alumni' || user.role === 'student') && (
//           <div className="mb-6 text-center">
//             <button
//               onClick={() => setShowPostForm(!showPostForm)}
//               className="px-4 py-2 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
//             >
//               {showPostForm ? 'Cancel' : 'Post an Event'}
//             </button>
//           </div>
//         )}

//         {/* Post Event Form */}
//         {showPostForm && (
//           <div className="mb-10 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               Post an Event
//             </h2>
//             <form onSubmit={handlePostEvent} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="title"
//                   className="block text-gray-700 font-medium mb-2"
//                 >
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   id="title"
//                   name="title"
//                   value={newEvent.title}
//                   onChange={handleNewEventChange}
//                   required
//                   className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   placeholder="Enter event title"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="description"
//                   className="block text-gray-700 font-medium mb-2"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   name="description"
//                   value={newEvent.description}
//                   onChange={handleNewEventChange}
//                   required
//                   className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   placeholder="Enter event description"
//                 ></textarea>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label
//                     htmlFor="date"
//                     className="block text-gray-700 font-medium mb-2"
//                   >
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     value={newEvent.date}
//                     onChange={handleNewEventChange}
//                     required
//                     className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="location"
//                     className="block text-gray-700 font-medium mb-2"
//                   >
//                     Location
//                   </label>
//                   <input
//                     type="text"
//                     id="location"
//                     name="location"
//                     value={newEvent.location}
//                     onChange={handleNewEventChange}
//                     required
//                     className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                     placeholder="Enter location"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="image"
//                   className="block text-gray-700 font-medium mb-2"
//                 >
//                   Image URL
//                 </label>
//                 <input
//                   type="url"
//                   id="image"
//                   name="image"
//                   value={newEvent.image}
//                   onChange={handleNewEventChange}
//                   placeholder="https://example.com/event.jpg"
//                   className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-[#004d40] text-white font-semibold rounded hover:bg-[#00796b] transition duration-300"
//               >
//                 Post Event
//               </button>
//             </form>
//           </div>
//         )}

//         {/* Display Events Grid */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {events.map((event) => (
//             <div
//               key={event.id}
//               className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 relative"
//             >
//               <img
//                 src={event.image || '/images/default_event.jpg'}
//                 alt={event.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   {event.title}
//                 </h2>
//                 <p className="text-gray-600 mt-2">{event.description}</p>
//                 <div className="mt-4">
//                   <span className="block text-gray-700 font-medium">
//                     Date: {event.date}
//                   </span>
//                   <span className="block text-gray-700 font-medium">
//                     Location: {event.location}
//                   </span>
//                 </div>
//                 {/* Show delete button if this event was posted by the logged-in user */}
//                 {user && event.postedBy === user.email && (
//                   <button
//                     onClick={() => handleDeleteEvent(event.id)}
//                     className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Events;
