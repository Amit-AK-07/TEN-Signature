import { useState } from "react";
import { bookingsData } from "../../lib/Constant";
import Sidebar from "../../components/dashboard/Sidebar";
import ServicesFooter from "../../components/dashboard/ServicesFooter";
import Pagination from "../../components/common/pagination/Pagination";
import { useLogout } from "../../hooks/useAuth";

export default function MyBookings() {
  const [bookings] = useState(bookingsData);
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  const totalItems = 25;
  const pageSize = 5;
  const totalPages = Math.ceil(totalItems / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex w-full">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 px-4 md:px-8 bg-gray-100 min-h-screen overflow-x-hidden">
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-3 mt-10">My Bookings</h1>
          <p className="text-gray-500">We are glad to see you again!</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    {[
                      "ID",
                      "Service",
                      "Booking Date",
                      "User",
                      "Provider",
                      "Status",
                      "Amount",
                      "Payment",
                    ].map((col) => (
                      <th
                        key={col}
                        className="text-left px-6 py-4 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-gray-600 py-8"
                      >
                        You have no bookings yet.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.user}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.provider}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.payment}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
          />
        </div>

        <ServicesFooter />
      </div>
    </div>
  );
}