import { useGetPaymentQuery } from "../redux/api/Payment.ApiSlice";
import { useNavigate } from "react-router";
import { FaWallet, FaCreditCard, FaHistory, FaCheckCircle } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import Loader from "../components/Loader";

const PaymentsList = () => {
  const { data: paymentData, isLoading, isError } = useGetPaymentQuery();
  const navigate = useNavigate();

  const payments = paymentData ? Object.values(paymentData) : [];

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-[#e0f2f1] to-[#b2dfdb]">
      <div className="max-w-4xl mx-auto">
        {/* Payment Methods Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
            <FaWallet className="text-emerald-600" />
            Choose Payment Method
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => navigate("/donations/solana")}
              className="p-6 bg-gradient-to-r from-cyan-700 to-green-200 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <SiSolana className="text-2xl" />
              <span className="text-lg font-semibold">Donate with Solana</span>
            </button>
            
            <button
              onClick={() => navigate("/donations/razorpay")}
              className="p-6 bg-gradient-to-r from-green-200 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <FaCreditCard className="text-2xl" />
              <span className="text-lg font-semibold">Donate with Razorpay</span>
            </button>
          </div>
        </section>

        {/* Payment History Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <FaHistory className="text-amber-600" />
            Payment History
          </h2>

          {isLoading && (
            <div className="flex justify-center items-center h-32">
              <Loader />
            </div>
          )}

          {isError && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
              <FaCheckCircle className="flex-shrink-0" />
              Failed to load payment history
            </div>
          )}

          {!isLoading && !isError && payments.length === 0 && (
            <div className="p-6 bg-white rounded-lg shadow-md text-center text-gray-500">
              No transactions found
            </div>
          )}

          {payments.length > 0 && (
            <div className="grid gap-4">
              {payments.map((payment) => (
                <div 
                  key={payment._id}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-emerald-500"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                        <FaCheckCircle className="text-emerald-500" />
                        <span className="uppercase">{payment.mode}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        ${payment.amount}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">To:</span> {payment.recipientEmail}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(payment.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PaymentsList;