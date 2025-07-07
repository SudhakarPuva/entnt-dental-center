import React from "react";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow sticky top-0 z-50">
      <div className="text-2xl font-bold text-primary flex items-center gap-2">
        <img src="/src/assets/medical-team.png" alt="logo" className="w-10 h-10" />
        ENTNT Dental Craft
      </div>
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link to="/#home" className="hover:underline">Home</Link>
      </nav>
    </header>
  );
};

export default LandingHeader;
