import { useGetPaymentQuery } from "../redux/api/Payment.ApiSlice";
// import navigate from "react-router-dom";
import { useNavigate } from "react-router";
const PaymentsList = () => {
  const { data: paymentData, isLoading, isError } = useGetPaymentQuery(); 

  console.log("Raw API Response:", paymentData); // Debugging

  // Extracting actual payments from object keys (if needed)
  const payments = paymentData ? Object.values(paymentData) : [];
  const navigate=useNavigate();
  return (
    <div className="container mx-auto p-4">
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100"> */}
      <h1 className="text-3xl font-bold mb-6">Choose Your Payment Method</h1>
      <div className="flex space-x-4">
      <button
          onClick={() => navigate("/donations/solana")}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Donate with Solana
        </button>
        <button
          onClick={() => navigate("/donations/razorpay")}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Donate with Razorpay
        </button>
      </div>
    {/* </div> */}
      <h1 className="text-2xl font-bold mb-4">Your Payment History</h1>

      {isLoading && <p>Loading payments...</p>}
      {isError && <p className="text-red-500">Failed to fetch payments.</p>}

      {!isLoading && !isError && payments.length === 0 && <p>No payments found.</p>}

      {payments.length > 0 && (
        <ul className="space-y-4">
          {payments.map((payment) => (
            <li key={payment._id} className="p-4 bg-white shadow rounded-md">
              <p><strong>Recipient:</strong> {payment.recipientEmail}</p>
              <p><strong>Amount:</strong> ${payment.amount}</p>
              <p><strong>Mode:</strong> {payment.mode}</p>
              <p><strong>Date:</strong> {new Date(payment.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentsList;
