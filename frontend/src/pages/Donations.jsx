// import React from 'react'

// const Donations = () => {
//     return (
//         <div >
//           <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
//             <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
//               <h2 className="text-2xl font-bold text-[#004d40] mb-4 text-center">
//                 Support Our Alumni Association
//               </h2>
//               <p className="mb-6 text-center">
//                 Your donation will help us continue our mission and support alumni activities.
//               </p>
//               <form onSubmit={handleSubmit} className="flex flex-col">
//                 <label htmlFor="name" className="mt-4 font-semibold text-[#004d40]">Full Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   value={name} onChange={(e) => setName(e.target.value)}
//                   className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//                 />
    
//                 {/* <label htmlFor="email" className="mt-4 font-semibold text-[#004d40]">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//                 /> */}
    
//                 <label htmlFor="Amount" className="mt-4 font-semibold text-[#004d40]">Donation Amount</label>
//                 <input
//                   type="number"
//                   id="Amount"
//                   name="Amount"
//                   required
//                   value={amount} onChange={(e) => setAmount(e.target.value)}
//                   className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]"
//                 />
    
//                 <label htmlFor="payment-method" className="mt-4 font-semibold text-[#004d40]">Payment Method</label>
//                 <select id="payment-method"
//                   name="payment-method"
//                   required className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]" value={paymentMethod} onChange={handlePaymentMethodChange}>
//                   <option value="">Select Payment Method</option>
//                   <option value="Solana">Solana</option>
//                   <option value="Razorpay">Razorpay</option>
//                 </select>
    
//                 {paymentMethod === "Solana" && (
//                   <div className="flex justify-center items-center">
//                     <button type="button" className="mt-2 p-3 border-2 border-[#004d40] rounded-lg bg-gray-100 focus:bg-[#e0f7fa] focus:border-[#00796b]" onClick={connectWallet}>
//                       {wallet ? "Connected" : "Connect Wallet"}
//                     </button>
//                     {/* {wallet && <p>Wallet: {walletAddress}</p>} */}
//                     {/* <input type="number" placeholder="Sol to send" value={quantity} onChange={(e) => setQuantity(e.target.value)} /> */}
//                     {/* <button type="button" onClick={sendSol}>Send SOL</button> */}
//                     {/* <p>{status}</p> */}
//                   </div>
//                 )}
//                 <button
//                   type="submit"
//                   className="mt-6 p-3 bg-[#004d40] text-white font-semibold rounded-lg hover:bg-[#00796b] transition transform hover:-translate-y-1"
//                   onClick={(e) => {
//                     e.preventDefault();
    
//                     if (paymentMethod === "Razorpay") {
//                       if (!amount || parseFloat(amount) <= 100) {
//                         alert("For Razorpay, the minimum donation amount must be greater than 100 INR.");
//                         return;
//                       }
//                       createRazorpayOrder(amount);
//                     } else if (paymentMethod === "Solana") {
//                       if (!amount || parseFloat(amount) < 0.01) {
//                         alert("For Solana, the minimum donation amount must be at least 0.01 SOL.");
//                         return;
//                       }
//                       sendSol();
//                     } else {
//                       alert("Please select a payment method.");
//                     }
//                   }}
//                 >
//                   Donate Now
//                 </button>
    
//               </form>
//             </div>
//           </div>
    
    
//         </div>
// }

// export default Donations
