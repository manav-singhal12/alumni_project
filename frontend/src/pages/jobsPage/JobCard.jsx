import React from 'react';
import { FaBuilding, FaMapMarkerAlt, FaBriefcase, FaMoneyBillAlt, FaCheckCircle } from 'react-icons/fa';

// Job Card Component
const JobCard = ({ job }) => {
  return (
    <div className="w-full bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 border border-white/20 relative flex flex-col min-h-[500px]">
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>

      <div className="p-8 relative z-10 flex flex-col flex-grow">
        {/* Job Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 truncate">{job.title}</h2>

        {/* Company and Location */}
        <div className="flex items-center text-gray-600 mb-4">
          <FaBuilding className="mr-2" />
          <span className="font-semibold truncate">{job.company}</span>
          <span className="mx-2">·</span>
          <FaMapMarkerAlt className="mr-2" />
          <span className="truncate">{job.location}</span>
        </div>

        {/* Job Type */}
        <div className="flex items-center text-gray-600 mb-6">
          <FaBriefcase className="mr-2" />
          <span className="font-semibold truncate">{job.jobType}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Description */}
        <p className="text-gray-700 mb-6 line-clamp-3">{job.description}</p>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaCheckCircle className="mr-2 text-blue-600" />
            Requirements
          </h3>
          <p className="text-gray-600 line-clamp-2">{job.requirements}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Salary */}
        <div className="flex items-center text-gray-800 mb-8">
          <FaMoneyBillAlt className="mr-2 text-green-600" />
          <span className="font-bold">Salary:</span>
          <span className="ml-2 text-green-600 font-semibold truncate">{job.salary}</span>
        </div>

        {/* Apply Button */}
        <a
          href="#"
          className="mt-auto inline-block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard