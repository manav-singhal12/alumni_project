import React from "react";
import { FaCalendarAlt, FaUser, FaLink, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ event }) => {
  return (
    <div className="w-80 bg-white shadow-lg rounded-xl p-4 relative border border-gray-300 transition-transform hover:scale-105 hover:shadow-xl">
      {/* Event Title */}
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-2">
        <FaCalendarAlt className="text-green-800" />
        {event.title}
      </h2>

      {/* Event About */}
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{event.about}</p>

      {/* Event Details */}
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        <div className="flex items-center gap-2">
          <FaUser className="text-blue-500" /> {event.organiser}
        </div>
        <div className="flex items-center gap-2">
          {event.eventMode === "online" ? (
            <FaGlobe className="text-green-500" />
          ) : (
            <FaMapMarkerAlt className="text-yellow-500" />
          )}
          {event.eventMode === "online" ? "Online" : "In-Person"}
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-black-500" /> {event.date}
        </div>
      </div>

      {/* Joining Link */}
      <a
        href={event.joiningLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 hover:underline block truncate mb-3"
      >
        {event.joiningLink}
      </a>

      {/* Join Button */}
      <a
        href={event.joiningLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center bg-gradient-to-r from-green-800 to-green-200 text-white font-medium py-2 rounded-md hover:from-green-600 hover:to-green-900 transition-all"
      >
        <FaLink className="mr-1" /> Join Event
      </a>
    </div>
  );
};

export default EventCard;
