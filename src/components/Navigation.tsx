"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Mail } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const navItems = [
  { name: "Home", icon: Home, id: "hero" },
  { name: "About", icon: User, id: "about" },
  { name: "Projects", icon: FolderOpen, id: "projects" },
  { name: "Experience", icon: Briefcase, id: "experience" },
  { name: "Contact", icon: Mail, id: "contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const mouseX = useMotionValue(Infinity);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex items-end gap-4 px-4 py-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {navItems.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            item={item}
            isActive={activeSection === item.id}
            onClick={() => {
              setActiveSection(item.id);
              scrollToSection(item.id);
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const DockIcon = ({ mouseX, item, isActive, onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="relative aspect-square rounded-full flex items-center justify-center group"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-0 bg-white/20 rounded-full blur-md"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </AnimatePresence>
      
      <span className="relative z-10 transition-colors duration-300 group-hover:text-white text-gray-400">
        <item.icon className="w-full h-full p-2" />
      </span>

      {/* Tooltip */}
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg border border-white/10 whitespace-nowrap pointer-events-none"
        >
          {item.name}
        </motion.span>
      </AnimatePresence>
      
      {isActive && (
         <motion.div 
            layoutId="activeDot"
            className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"
         />
      )}
    </motion.button>
  );
};

export default Navigation;
