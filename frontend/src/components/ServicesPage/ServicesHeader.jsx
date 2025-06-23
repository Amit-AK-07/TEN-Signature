import { Link } from "react-router-dom";

const ServiceHeader = ({ name, price, category, itemsCovered, serviceId }) => {
  return (
    <>
      <nav className="text-sm text-gray-500 mb-2 mx-2" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-0">
          <li>
            <Link to="/" className="hover:text-[#26c4a0] ">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link
              to="/services"
              className="hover:text-[#26c4a0] "
            >
              Services
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-700 font-semibold">{category}</li>
        </ol>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mx-2 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{`${category} by ${name}`}</h1>
          <div className="flex items-center gap-4 text-sm mt-2 text-gray-600">
            <span>{category}</span>
            <span className="text-[#26c4a0] font-medium">● Fixed Price</span>
            <span>🕒 Items Covered: {itemsCovered}</span>
            <span className="flex items-center gap-1">
              <i className="fas fa-circle-info text-gray-600"></i>
              Service-ID-{serviceId}
            </span>
          </div>
        </div>
        <div className="md:mt-0 text-right mr-10">
          <h2 className="text-2xl font-semibold text-gray-800">₹{price}</h2>
          <p className="text-sm text-gray-500">
            Price per item: ₹{Math.floor(price / itemsCovered)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ServiceHeader;
