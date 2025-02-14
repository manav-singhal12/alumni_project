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
