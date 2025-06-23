import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DownloadButton = ({ href, icon, smallText, boldText }) => {
  return (
    <a
      href={href}
      className="flex  items-center gap-4 bg-[#0c2340] text-white rounded-xl px-6 py-4 w-full sm:w-auto max-w-xs"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={icon} className="text-3xl" />
      <div className="border-l border-white pl-4 text-left">
        <p className="text-xs">{smallText}</p>
        <p className="font-bold text-lg">{boldText}</p>
      </div>
    </a>
  );
};
export default DownloadButton;
