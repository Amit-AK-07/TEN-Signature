import React from "react";
import { Link } from "react-router-dom"; // Optional: if using React Router

const ServicesFooter = () => {
  
  return (
    <footer className="w-full mt-5 text-sm text-[#181a20] py-4 px-6 flex flex-col md:flex-row items-center justify-between">
      <div className="mb-2 md:mb-0">
        © Broki Services Private Limited 2025 <span className="text-[#181a20]">broki.in</span> – All rights reserved
      </div>
      <div className="flex gap-4 text-[#181a20]">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/refund">Refund</Link>
        <Link to="/sitemap">Sitemap</Link>
      </div>
    </footer>
  );
};

export default ServicesFooter;
