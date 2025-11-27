"use client";

import { motion } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", icon: Home, id: "hero" },
  { name: "About", icon: User, id: "about" },
  { name: "Projects", icon: FolderOpen, id: "projects" },
  { name: "Experience", icon: Briefcase, id: "experience" },
  { name: "Contact", icon: Mail, id: "contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl"
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              setActiveSection(item.id);
              scrollToSection(item.id);
            }}
            className={`relative p-3 rounded-full transition-all duration-300 group ${
              activeSection === item.id ? "bg-white/20 text-white" : "text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <item.icon className="w-5 h-5" />
            
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.name}
            </span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default Navigation;
