import React, { useState, useEffect } from 'react';

import image1 from './1.webp'
import image2 from './iiitu_image2.webp'
import image3 from './iiitu_image3.webp'
import image4 from './iiitu_inter.webp'


const LandingPage = () => {
  const fullText = "Weelcome to the Alumni Association";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [fullText]);

  const gridItems = [
    {
      image: image1,
      alt: "Event 1",
      title: "Annual Alumni Meet",
      description: "Join us for the grand annual meet on February 15, 2025."
    },
    {
      image: image2,
      alt: "Alumni Achievement 1",
      title: "Alumni Achievement",
      description: "Rohit wins the Best Entrepreneur of the Year award."
    },
    {
      image: image3,
      alt: "Webinar on Career Growth",
      title: "Webinar on Career Growth",
      description: "Exclusive webinar by industry leaders on October 22, 2024."
    },
    {
      image: image4,
      alt: "Alumni Achievement 2",
      title: "Alumni Spotlight",
      description: "Shreya recognized for her contributions to technology."
    },
  ];

  return (
    <main id="home">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${image3})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">
            {displayedText}
          </h1>
          <p className="mt-4 text-xl">
            Celebrating the achievements and memories of our alumni.
          </p>
        </div>
      </section>

      {/* Expanded About Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#004d40] mb-6">
            About Our Alumni Association
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Our Alumni Association is dedicated to fostering lifelong connections and empowering our graduates. We celebrate the successes of our community, create valuable networking opportunities, and offer resources that promote professional growth.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Whether you're looking to reconnect with old friends, share your success story, or gain industry insights, our association is here to support you. Join us as we build a vibrant and collaborative network, uniting generations through shared achievements and mutual inspiration.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            We also organize a variety of events throughout the year, including annual reunions, professional development workshops, and exclusive networking sessions. These gatherings provide the perfect platform for alumni to exchange ideas, forge new partnerships, and inspire the next generation of leaders.
          </p>
          <p className="text-lg text-gray-700">
            Our commitment extends beyond events and networking. We offer mentorship programs, career support, and continuous learning opportunities to help our members stay ahead in a rapidly evolving professional landscape. Together, we create a legacy of excellence, innovation, and community spirit.
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
        {gridItems.map((item, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
            <img src={item.image} alt={item.alt} className="w-full h-56 object-cover" />
            <div className="absolute inset-0 bg-[#004d40] bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
              <h2 className="text-white text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default LandingPage;





/*import React from "react";

const Team = () => {
  return (
    <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[510px] text-center">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Team
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Our Awesome Team
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          <TeamCard
            name="Coriss Ambady"
            profession="Web Developer"
            imageSrc="https://i.ibb.co/T1J9LD4/image-03-2.jpg"
          />
          <TeamCard
            name="Coriss Ambady"
            profession="Web Developer"
            imageSrc="https://i.ibb.co/8P6cvVy/image-01-1.jpg"
          />
          <TeamCard
            name="Coriss Ambady"
            profession="Web Developer"
            imageSrc="https://i.ibb.co/30tGtjP/image-04.jpg"
          />
          <TeamCard
            name="Coriss Ambady"
            profession="Web Developer"
            imageSrc="https://i.ibb.co/yVVT0Dp/image-02-2.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default Team;

const TeamCard = ({ imageSrc, name, profession }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 xl:w-1/4">
        <div className="mx-auto mb-10 w-full max-w-[370px]">
          <div className="relative overflow-hidden rounded-lg">
            <img src={imageSrc} alt="" className="w-full" />
            <div className="absolute bottom-5 left-0 w-full text-center">
              <div className="relative mx-5 overflow-hidden rounded-lg bg-white px-3 py-5 dark:bg-dark-2">
                <h3 className="text-base font-semibold text-dark dark:text-white">
                  {name}
                </h3>
                <p className="text-xs text-body-color dark:text-dark-6">
                  {profession}
                </p>
                <div>
                  <span className="absolute bottom-0 left-0">
                    <svg
                      width={61}
                      height={30}
                      viewBox="0 0 61 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx={16}
                        cy={45}
                        r={45}
                        fill="#13C296"
                        fillOpacity="0.11"
                      />
                    </svg>
                  </span>
                  <span className="absolute right-0 top-0">
                    <svg
                      width={20}
                      height={25}
                      viewBox="0 0 20 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="0.706257"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 0.706257 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 6.39669 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 12.0881 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="24.3533"
                        r="0.646687"
                        transform="rotate(-90 17.7785 24.3533)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 0.706257 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 6.39669 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 12.0881 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="18.6624"
                        r="0.646687"
                        transform="rotate(-90 17.7785 18.6624)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 0.706257 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 6.39669 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 12.0881 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="12.9717"
                        r="0.646687"
                        transform="rotate(-90 17.7785 12.9717)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 0.706257 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 6.39669 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 12.0881 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="7.28077"
                        r="0.646687"
                        transform="rotate(-90 17.7785 7.28077)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="0.706257"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 0.706257 1.58989)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="6.39669"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 6.39669 1.58989)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="12.0881"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 12.0881 1.58989)"
                        fill="#3056D3"
                      />
                      <circle
                        cx="17.7785"
                        cy="1.58989"
                        r="0.646687"
                        transform="rotate(-90 17.7785 1.58989)"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; */











// import React, { useState, useEffect } from 'react';

// const Home = () => {
//   const fullText = "Weelcome to the Alumni Association";
//   const [displayedText, setDisplayedText] = useState("");

//   useEffect(() => {
//     let index = 0;
//     const timer = setInterval(() => {
//       setDisplayedText((prev) => prev + fullText.charAt(index));
//       index++;
//       if (index === fullText.length) {
//         clearInterval(timer);
//       }
//     }, 100);
//     return () => clearInterval(timer);
//   }, []);

//   const gridItems = [
//     {
//       image: "/iiitu_academic.webp",
//       alt: "Event 1",
//       title: "Annual Alumni Meet",
//       description: "Join us for the grand annual meet on February 15, 2025."
//     },
//     {
//       image: "/iiitu_inter.webp",
//       alt: "Alumni Achievement 1",
//       title: "Alumni Achievement",
//       description: "Rohit wins the Best Entrepreneur of the Year award."
//     },
//     {
//       image: "/iiitu_image2.webp",
//       alt: "Webinar on Career Growth",
//       title: "Webinar on Career Growth",
//       description: "Exclusive webinar by industry leaders on October 22, 2024."
//     },
//     {
//       image: "/iiitu_inter.webp",
//       alt: "Alumni Achievement 2",
//       title: "Alumni Spotlight",
//       description: "Shreya recognized for her contributions to technology."
//     },
//   ];

//   const successStories = [
//     {
//       name: "Rohit Sharma",
//       title: "Innovative Entrepreneur",
//       description: "Rohit founded a tech startup that revolutionized online education, empowering thousands of students globally. Rohit founded a tech startup that revolutionized online education, empowering thousands of students globally."
//     },
//     {
//       name: "Shreya Kapoor",
//       title: "Tech Trailblazer",
//       description: "Shreya's breakthrough work in AI has earned her accolades and significantly advanced research in machine learning. Shreya's breakthrough work in AI has earned her accolades and significantly advanced research in machine learning."
//     },
//     {
//       name: "Amit Verma",
//       title: "Global Business Leader",
//       description: "Amit's visionary leadership has driven transformative changes across industries and fostered international collaborations. Amit's visionary leadership has driven transformative changes across industries and fostered international collaborations."
//     },
//     {
//       name: "Priya Singh",
//       title: "Social Impact Pioneer",
//       description: "Priya's commitment to social entrepreneurship has led to sustainable development initiatives in underprivileged communities. Priya's commitment to social entrepreneurship has led to sustainable development initiatives in underprivileged communities."
//     }
//   ];

//   return (
//     <main id="home">
//       {/* Hero Section */}
//       <section
//         className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
//         style={{ backgroundImage: "url('/iiitu_image3.webp')" }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative text-center text-white px-4">
//           <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">
//             {displayedText}
//           </h1>
//           <p className="mt-4 text-xl">
//             Celebrating the achievements and memories of our alumni.
//           </p>
//         </div>
//       </section>

//  {/* Success Stories Section */}
//  <section className="py-12 bg-white">
//         <div className="max-w-7xl  mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-[#004d40] mb-8">
//             Success Stories of our alumni 
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {successStories.map((story, index) => (
//               <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
//                 <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
//                 <p className="text-[#004d40] font-medium mb-2">{story.title}</p>
//                 <p className="text-gray-700">{story.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>


      
//       {/* Grid Section */}
//       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
//         {gridItems.map((item, index) => (
//           <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg">
//             <img src={item.image} alt={item.alt} className="w-full h-56 object-cover" />
//             <div className="absolute inset-0 bg-[#004d40] bg-opacity-70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
//               <h2 className="text-white text-xl font-bold mb-2">{item.title}</h2>
//               <p className="text-white text-sm">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Expanded About Section */}
//       <section className="py-12 bg-gray-100">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="bg-white p-8 shadow-xl rounded-lg">
//             <h2 className="text-3xl font-bold text-center text-[#004d40] mb-6">
//               About Our Alumni Association
//             </h2>
//             <p className="text-lg text-gray-700 mb-4">
//               Our Alumni Association is dedicated to fostering lifelong connections and empowering our graduates. We celebrate the successes of our community, create valuable networking opportunities, and offer resources that promote professional growth.
//             </p>
//             <p className="text-lg text-gray-700 mb-4">
//               Whether you're looking to reconnect with old friends, share your success story, or gain industry insights, our association is here to support you. Join us as we build a vibrant and collaborative network, uniting generations through shared achievements and mutual inspiration.
//             </p>
//             <p className="text-lg text-gray-700 mb-4">
//               We also organize a variety of events throughout the year, including annual reunions, professional development workshops, and exclusive networking sessions. These gatherings provide the perfect platform for alumni to exchange ideas, forge new partnerships, and inspire the next generation of leaders.
//             </p>
//             <p className="text-lg text-gray-700">
//               Our commitment extends beyond events and networking. We offer mentorship programs, career support, and continuous learning opportunities to help our members stay ahead in a rapidly evolving professional landscape. Together, we create a legacy of excellence, innovation, and community spirit.
//             </p>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;
