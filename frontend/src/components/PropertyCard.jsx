import { faObjectGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white shadow-md rounded-lg cursor-pointer"
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          className="w-full h-[230px] object-cover rounded-lg img-animattion"
          src={property.imgSrc}
          alt={property.imgAlt}
        />
      </div>
      <div className="p-4">
        <div className="mt-4 text-base leading-5 text-gray-900 font-semibold">
          <span className="font-extrabold">{property.priceBold}</span>
          <span className="font-normal italic"> {property.priceNormal}</span>
        </div>
        <h3 className="mt-1 font-semibold text-gray-900 text-base leading-5">
          {property.title}
        </h3>
        <p className="mt-2 text-sm text-gray-900 flex items-center gap-2 font-normal">
          <FontAwesomeIcon icon={faObjectGroup} />
          {property.sqft}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
