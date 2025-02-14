import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Donation = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // donation submission 
    alert('Thank you for your donation!');
    // ('/thankyou');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#004d40] mb-4 text-center">
          Support Our Alumni Association
        </h2>
        <p className="mb-6 text-center">
          Your donation will help us continue our mission and support alumni activities.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name" className="mt-4 font-semibold text-[#004d40]">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
          />

          <label htmlFor="email" className="mt-4 font-semibold text-[#004d40]">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
          />

          <label htmlFor="amount" className="mt-4 font-semibold text-[#004d40]">Donation Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="1"
            required
            className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
          />

          <label htmlFor="payment-method" className="mt-4 font-semibold text-[#004d40]">Payment Method</label>
          <select
            id="payment-method"
            name="payment-method"
            required
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
          >
            <option value="">Select Payment Method</option>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>

          {paymentMethod === 'credit-card' && (
            <div id="credit-card-info" className="mt-4 space-y-4">
              <label htmlFor="card-number" className="font-semibold text-[#004d40]">Card Number</label>
              <input
                type="text"
                id="card-number"
                name="card-number"
                required
                className="p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
              />

              <label htmlFor="expiry-date" className="font-semibold text-[#004d40]">Expiry Date</label>
              <input
                type="text"
                id="expiry-date"
                name="expiry-date"
                placeholder="MM/YY"
                required
                className="p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
              />

              <label htmlFor="cvv" className="font-semibold text-[#004d40]">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                required
                className="p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
              />
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div id="paypal-info" className="mt-4">
              <p className="text-[#004d40]">
                You will be redirected to PayPal to complete your donation.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 p-3 bg-[#004d40] text-white font-semibold rounded-lg hover:bg-[#00796b] transition transform hover:-translate-y-1"
          >
            Donate Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donation;











// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Donation = () => {
//   const { user } = useContext(AuthContext); // Retrieve the logged-in user
//   const navigate = useNavigate();
//   const [paymentMethod, setPaymentMethod] = useState('');
  
//   // State for general donation form (for association donation)
//   const [generalDonation, setGeneralDonation] = useState({
//     name: '',
//     email: '',
//     amount: ''
//   });
  
//   // State for student project posting form
//   const [projectForm, setProjectForm] = useState({
//     title: '',
//     description: '',
//     donationGoal: ''
//   });
  
//   // State for list of posted projects (for students)
//   const [projects, setProjects] = useState([]);
  
//   // State for project search term (to filter projects by name)
//   const [projectSearchTerm, setProjectSearchTerm] = useState('');

//   // Load projects from localStorage on mount (if any)
//   useEffect(() => {
//     const storedProjects = localStorage.getItem('projects');
//     if (storedProjects) {
//       setProjects(JSON.parse(storedProjects));
//     }
//   }, []);

//   // Persist projects to localStorage whenever projects state changes
//   useEffect(() => {
//     localStorage.setItem('projects', JSON.stringify(projects));
//   }, [projects]);

//   // Filter projects by the search term (by project title)
//   const filteredProjects = projects.filter((project) =>
//     project.title.toLowerCase().includes(projectSearchTerm.toLowerCase())
//   );

//   // --- General Donation Form Handlers ---
//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleGeneralDonationChange = (e) => {
//     const { name, value } = e.target;
//     setGeneralDonation((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleGeneralDonationSubmit = (e) => {
//     e.preventDefault();
//     alert('Thank you for your donation to the Alumni Association!');
//     // Optionally, reset the form:
//     setGeneralDonation({ name: '', email: '', amount: '' });
//   };

//   // --- Student Project Form Handlers ---
//   const handleProjectFormChange = (e) => {
//     const { name, value } = e.target;
//     setProjectForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleProjectFormSubmit = (e) => {
//     e.preventDefault();
//     // Create a new project with a unique id and tag it with the student's email
//     const newProject = {
//       id: Date.now(),
//       ...projectForm,
//       postedBy: user.email,
//       donations: 0, // initial donation total (optional)
//     };
//     setProjects([...projects, newProject]);
//     setProjectForm({ title: '', description: '', donationGoal: '' });
//   };

//   // Handler for donating to a specific project
//   const handleDonateProject = (projectId) => {
//     alert('Thank you for donating to this project!');
//     // Here you can update the project's donation total if needed.
//   };

//   return (
//     <div className="min-h-screen bg-[#e0f2f1] p-4">
//       <div className="container mx-auto">
//         {/* Page Header */}
//         <header className="text-center mb-10">
//           <h2 className="text-2xl font-bold text-[#004d40]">
//             Support Our Alumni Association
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Your donation will help us continue our mission and support alumni activities.
//           </p>
//         </header>

//         {/* General Donation Form */}
//         {user && (user.role === 'alumni' || user.role === 'student') ? (
//           <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mb-10">
//             <form onSubmit={handleGeneralDonationSubmit} className="flex flex-col">
//               <label htmlFor="name" className="mt-4 font-semibold text-[#004d40]">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 placeholder="Your full name"
//                 value={generalDonation.name}
//                 onChange={handleGeneralDonationChange}
//                 required
//                 className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//               />
//               <label htmlFor="email" className="mt-4 font-semibold text-[#004d40]">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 value={generalDonation.email}
//                 onChange={handleGeneralDonationChange}
//                 required
//                 className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//               />
//               <label htmlFor="amount" className="mt-4 font-semibold text-[#004d40]">
//                 Donation Amount
//               </label>
//               <input
//                 type="number"
//                 id="amount"
//                 name="amount"
//                 placeholder="Enter amount"
//                 min="1"
//                 value={generalDonation.amount}
//                 onChange={handleGeneralDonationChange}
//                 required
//                 className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//               />
//               <label htmlFor="payment-method" className="mt-4 font-semibold text-[#004d40]">
//                 Payment Method
//               </label>
//               <select
//                 id="payment-method"
//                 name="payment-method"
//                 required
//                 value={paymentMethod}
//                 onChange={handlePaymentMethodChange}
//                 className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//               >
//                 <option value="">Select Payment Method</option>
//                 <option value="credit-card">Credit Card</option>
//                 <option value="paypal">PayPal</option>
//                 <option value="bank-transfer">Bank Transfer</option>
//               </select>

//               {paymentMethod === 'credit-card' && (
//                 <div id="credit-card-info" className="mt-4 space-y-4">
//                   <label htmlFor="card-number" className="font-semibold text-[#004d40]">
//                     Card Number
//                   </label>
//                   <input
//                     type="text"
//                     id="card-number"
//                     name="card-number"
//                     required
//                     className="p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//                   />
//                   <label htmlFor="expiry-date" className="font-semibold text-[#004d40]">
//                     Expiry Date
//                   </label>
//                   <input
//                     type="text"
//                     id="expiry-date"
//                     name="expiry-date"
//                     placeholder="MM/YY"
//                     required
//                     className="p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//                   />
//                   <label htmlFor="cvv" className="font-semibold text-[#004d40]">
//                     CVV
//                   </label>
//                   <input
//                     type="text"
//                     id="cvv"
//                     name="cvv"
//                     required
//                     className="p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//                   />
//                 </div>
//               )}

//               {paymentMethod === 'paypal' && (
//                 <div id="paypal-info" className="mt-4">
//                   <p className="text-[#004d40]">
//                     You will be redirected to PayPal to complete your donation.
//                   </p>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className="mt-6 p-3 bg-[#004d40] text-white font-semibold rounded-lg hover:bg-[#00796b] transition transform hover:-translate-y-1"
//               >
//                 Donate Now
//               </button>
//             </form>
//           </div>
//         ) : (
//           <div className="text-center mb-10">
//             <p className="text-red-500 font-bold">Please log in to donate.</p>
//           </div>
//         )}

//         {/* If the user is a student, display the two cards side by side */}
//         {user && user.role === 'student' ? (
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Post Your Project Card */}
//             <div className="flex-1 bg-white p-8 rounded-xl shadow-lg">
//               <header className="text-center mb-6">
//                 <h2 className="text-2xl font-bold text-[#004d40]">Post Your Project</h2>
//                 <p className="text-gray-600">
//                   Share your project or idea to receive donations from the community!
//                 </p>
//               </header>
//               <form onSubmit={handleProjectFormSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
//                     Project Title
//                   </label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     placeholder="Enter project title"
//                     value={projectForm.title}
//                     onChange={handleProjectFormChange}
//                     required
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
//                     Project Description
//                   </label>
//                   <textarea
//                     id="description"
//                     name="description"
//                     placeholder="Describe your project or idea"
//                     value={projectForm.description}
//                     onChange={handleProjectFormChange}
//                     required
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   ></textarea>
//                 </div>
//                 <div>
//                   <label htmlFor="donationGoal" className="block text-gray-700 font-medium mb-2">
//                     Donation Goal ($)
//                   </label>
//                   <input
//                     type="number"
//                     id="donationGoal"
//                     name="donationGoal"
//                     placeholder="Enter donation goal"
//                     value={projectForm.donationGoal}
//                     onChange={handleProjectFormChange}
//                     required
//                     className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d40]"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-[#004d40] text-white font-semibold rounded-md hover:bg-[#00796b] transition duration-300"
//                 >
//                   Post Project
//                 </button>
//               </form>
//             </div>
//             {/* Donate to a Project Card */}
//             <div className="flex-1 bg-white p-8 rounded-xl shadow-lg">
//               <h2 className="text-2xl font-bold text-[#004d40] text-center mb-4">
//                 Donate to a Project
//               </h2>
//               <input
//                 type="text"
//                 placeholder="Search projects by name..."
//                 value={projectSearchTerm}
//                 onChange={(e) => setProjectSearchTerm(e.target.value)}
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d40] mb-4"
//               />
//               {filteredProjects.length > 0 ? (
//                 filteredProjects.map((project) => (
//                   <div key={project.id} className="border p-4 rounded-md mb-4">
//                     <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
//                     <p className="mt-2 text-gray-700">{project.description}</p>
//                     <p className="mt-2 text-sm text-gray-600">
//                       Goal: ${project.donationGoal}
//                     </p>
//                     <button
//                       onClick={() => handleDonateProject(project.id)}
//                       className="mt-4 px-4 py-2 bg-[#004d40] text-white rounded-md hover:bg-[#00796b] transition duration-300"
//                     >
//                       Donate to Project
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-600">No projects found.</p>
//               )}
//             </div>
//           </div>
//         ) : (
//           // For alumni, display only the Donate to a Project card
//           user && user.role === 'alumni' && (
//             <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto mb-10">
//               <h2 className="text-2xl font-bold text-[#004d40] text-center mb-4">
//                 Donate to a Project
//               </h2>
//               <input
//                 type="text"
//                 placeholder="Search projects by name..."
//                 value={projectSearchTerm}
//                 onChange={(e) => setProjectSearchTerm(e.target.value)}
//                 className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004d40] mb-4"
//               />
//               {filteredProjects.length > 0 ? (
//                 filteredProjects.map((project) => (
//                   <div key={project.id} className="border p-4 rounded-md mb-4">
//                     <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
//                     <p className="mt-2 text-gray-700">{project.description}</p>
//                     <p className="mt-2 text-sm text-gray-600">
//                       Goal: ${project.donationGoal}
//                     </p>
//                     <button
//                       onClick={() => handleDonateProject(project.id)}
//                       className="mt-4 px-4 py-2 bg-[#004d40] text-white rounded-md hover:bg-[#00796b] transition duration-300"
//                     >
//                       Donate to Project
//                     </button>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-center text-gray-600">No projects found.</p>
//               )}
//             </div>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default Donation;
