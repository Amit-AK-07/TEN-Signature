import { useState } from "react";
import { propertiesData } from "../../lib/Constant";
import Sidebar from "../../components/dashboard/Sidebar";
import Pagination from "../../components/common/pagination/Pagination";
import ServicesFooter from "../../components/dashboard/ServicesFooter";

export default function MyProperties() {
  const [properties] = useState(propertiesData);

  const handleLogout = () => {
    console.log("Logging out...");
  };
  const totalItems = 25;
  const pageSize = 5;
  const totalPages = Math.ceil(totalItems / pageSize);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex">
      <div className="">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1 px-4 md:px-15 bg-gray-100 min-h-screen">
        <div className="py-12">
          <h1 className="text-3xl font-bold mb-3">My Properties</h1>
          <p className="text-gray-500">We are glad to see you again!</p>
        </div>

        <div className=" bg-[#ffff] shadow rounded-lg p-6">
          <div className=" rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  <th className="text-left px-6 py-4 min-w-[200px]">
                    Listing Details
                  </th>
                  <th className="text-left px-6 py-4 min-w-[150px]">
                    Property For
                  </th>
                  <th className="text-left px-6 py-4 min-w-[150px]">Status</th>
                  <th className="text-left px-6 py-4 min-w-[150px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-gray-600 py-6">
                      No properties listed.
                    </td>
                  </tr>
                ) : (
                  properties.map((property, idx) => (
                    <tr key={idx} className="border-b border-[#dee2e6]">
                      <td className="px-6 py-4">{property.details}</td>
                      <td className="px-6 py-4">{property.for}</td>
                      <td className="px-6 py-4">{property.status}</td>
                      <td className="px-6 py-4">
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
