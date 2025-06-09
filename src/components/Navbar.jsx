import {
  MapPin,
  Trash2,
  TractorIcon,
  UserCheckIcon,
  CalendarIcon,
  Calculator,
  Menu,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const steps = [
  { path: "/postcode", label: "PostCode", icon: MapPin },
  { path: "/waste-type", label: "Waste Type", icon: Trash2 },
  { path: "/select-skip", label: "Select Skip", icon: TractorIcon },
  { path: "/permit-check", label: "Permit Check", icon: UserCheckIcon },
  { path: "/choose-date", label: "Choose Date", icon: CalendarIcon },
  { path: "/payment", label: "Payment", icon: Calculator },
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentIndex = steps.findIndex((step) =>
    location.pathname.startsWith(step.path)
  );

  return (
    <div className="bg-black text-white w-full p-4">
      {/* Header / Toggle */}
      <div className="flex justify-between items-center sm:hidden">
        <h1 className="text-xl font-bold">Rem Waste</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Nav Links */}
      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-6 sm:gap-0 text-lg font-semibold mt-4 sm:mt-0`}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isVisited = index <= currentIndex;
          const colorClass = isVisited ? "text-[#3B82F6]" : "text-gray-500";
          const hoverColor = isVisited
            ? "hover:text-[#60a5fa]"
            : "hover:text-gray-400";

          return (
            <div
              key={step.path}
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <Icon className={`${colorClass} w-6 h-6`} />
              <Link
                to={step.path}
                className={`${colorClass} ${hoverColor} transition-colors`}
                onClick={() => setIsOpen(false)} // close on link click
              >
                {step.label}
              </Link>
              <hr className="hidden sm:block border w-40" />
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Navbar;
