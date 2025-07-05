import { useState } from "react";
import { propertiesData } from "../../lib/Constant";
import Sidebar from "../../components/dashboard/Sidebar";
import Pagination from "../../components/common/pagination/Pagination";
import ServicesFooter from "../../components/dashboard/ServicesFooter";
import { useLogout } from "../../hooks/useAuth";

export default function MyProperties() {
  const [properties] = useState(propertiesData);
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  const totalItems = 25;
  const pageSize = 5;
  const totalPages = Math.ceil(totalItems / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex w-full overflow-hidden ">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 bg-gray-100 min-h-screen px-4 md:px-15 overflow-x-hidden">
        <div className="py-12 mt-10">
          <h1 className="text-3xl font-bold mb-3 ">My Properties</h1>
          <p className="text-gray-500">We are glad to see you again!</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          {/* ✅ Only this scrolls horizontally */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[00px]">
              <table className="w-full table-auto text-sm">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="text-left px-6 py-4">Listing Details</th>
                    <th className="text-left px-6 py-4">Property For</th>
                    <th className="text-left px-6 py-4">Status</th>
                    <th className="text-left px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-gray-600 py-8"
                      >
                        No properties listed.
                      </td>
                    </tr>
                  ) : (
                    properties.map((property, idx) => (
                      <tr key={idx} className="border-b border-gray-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.details}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.for}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-blue-600 hover:underline">
                            {property.action}
                          </button>
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