// Navbar.jsx
import React from "react";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 bg-transparent absolute top-0 z-20">
      <div className="flex items-center space-x-2">
        <span className="text-white text-2xl font-bold">Edu Play</span>
        <span className="text-gray-300 text-sm">Learn & Rise</span>
      </div>
      <div>
      </div>
    </div>
  );
}

export default Navbar;

