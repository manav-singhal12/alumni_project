import React, { useState, useEffect } from 'react';
import { FiArrowRight, FiUsers, FiAward, FiBriefcase, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import image1 from './1.webp';
import image2 from './iiitu_image2.webp';
import image3 from './iiitu_image3.webp';
import image4 from './iiitu_inter.webp';

const LandingPage = () => {
  const fullText = "Weelcome to the Alumni Association";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

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
      
        image: image4,
        alt: "Community Outreach",
        title: "Community Outreach Program",
        description: "Be a part of our initiative to give back to the community on April 15, 2025. Join us in making a positive impact and forging lasting connections."
      
      
    },
    {
      image: image3,
      alt: "Webinar on Career Growth",
      title: "Webinar on Career Growth",
      description: "Exclusive webinar by industry leaders on October 22, 2024."
    },
   
   
  ];

  const stats = [
    { icon: FiUsers, value: "5000+", label: "Active Alumni" },
    { icon: FiAward, value: "150+", label: "Awards Won" },
    { icon: FiBriefcase, value: "89%", label: "Employment Rate" },
    { icon: FiCalendar, value: "40+", label: "Annual Events" },
  ];

  const successStories = [
    {
      image: "./piyush_kumar_linkedin.jpg",
      name: "Piyush Kumar",
      description:
        "ICPC Regionalist Piyush Kumar excels in C/C++, competitive programming, MERN Stack, and Flutter Development. As a Full-Stack Intern at Brihat Infotech, he built scalable software solutions, and his passion for innovation drives him to push tech boundaries and inspire future leaders at IIIT Una."
    },
    {
      image: "/shaksham_sharma_linkedin.jpg",
      name: "Shaksham Sharma",
      description:
        "An SDE at Swiggy and a CSE graduate from IIIT Una, Shaksham Sharma has excelled in Full-Stack Development, Problem-Solving, and Prompt Engineering. Previously a Full-Stack Developer at Praedico Global Research, he continues to innovate and push boundaries in the tech industry."
    },
    {
      image: "akshat_mittal_linkedin.jpg",
      name: "Akshat Mittal",
      description:
        "A Software Developer at Flipkart, Akshat Mittal specializes in Web Development and Automation, driving efficiency and innovation in the tech space. With a passion for building scalable solutions, he continues to make an impact in the industry."
    },
    {
      image: "devang_sharma_linkedin.jpg",
      name: "Devang Sharma",
      description:
        "An Engineering Backend Developer at MPL and an IIIT Una ’23 graduate, Devang Sharma previously contributed to Groww, showcasing expertise in backend development and problem-solving. His passion for scalable systems continues to drive innovation in the tech industry."
    }
  ];

  return (
    <main id="home">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${image3})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-70"></div>
        <div className="relative text-center text-white px-4 sm:px-6 md:px-8 animate-fadeIn">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-wider drop-shadow-lg">
            {displayedText}
          </h1>
          <p className="mt-6 text-xl sm:text-2xl md:text-3xl">
            Celebrating the achievements and memories of our alumni.
          </p>
        </div>
      </section>



      <section className="py-16 bg-white relative -mt-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-white rounded-2xl shadow-2xl p-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-white"
              >
                <stat.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#004d40] mb-12">
            Success Stories of our Alumni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex items-center mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 object-cover rounded-full mr-6 border-2 border-[#004d40]"
                  />
                  <h3 className="text-2xl font-semibold text-gray-800">{story.name}</h3>
                </div>
                <p className="text-gray-700 text-lg">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Grid Section */}
      <section className="relative overflow-hidden py-12 bg-gray-50">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
            .animate-fadeIn {
              animation: fadeIn 2s ease-in-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}
        </style>
        <div className="w-full overflow-hidden">
          <div className="flex animate-marquee" style={{ width: "max-content" }}>
            {[...gridItems, ...gridItems].map((item, index) => (
              <div
                key={index}
                className="relative group rounded-2xl overflow-hidden shadow-xl w-72 m-4 flex-shrink-0 transition transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-56 object-cover transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#004d40] bg-opacity-75 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 text-center">
                  <h2 className="text-white text-2xl font-bold mb-3">
                    {item.title}
                  </h2>
                  <p className="text-white text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded About Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 sm:p-12 shadow-2xl rounded-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#004d40] mb-8">
              About Our Alumni Association
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Our Alumni Association is dedicated to fostering lifelong connections and empowering our graduates. We celebrate the successes of our community, create valuable networking opportunities, and offer resources that promote professional growth.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Whether you're looking to reconnect with old friends, share your success story, or gain industry insights, our association is here to support you. Join us as we build a vibrant and collaborative network, uniting generations through shared achievements and mutual inspiration.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We also organize a variety of events throughout the year, including annual reunions, professional development workshops, and exclusive networking sessions. These gatherings provide the perfect platform for alumni to exchange ideas, forge new partnerships, and inspire the next generation of leaders.
            </p>
            <p className="text-lg text-gray-700">
              Our commitment extends beyond events and networking. We offer mentorship programs, career support, and continuous learning opportunities to help our members stay ahead in a rapidly evolving professional landscape. Together, we create a legacy of excellence, innovation, and community spirit.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;