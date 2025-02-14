import { useNavigate } from "react-router-dom";

const Donations = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
    </div>
  );
};

export default Donations;