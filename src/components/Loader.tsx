"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Simulated slow loading
  useEffect(() => {
    const duration = 1500; // 1.5 seconds total load time
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowButton(true);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!started && (
        <div className="fixed inset-0 z-[100] overflow-hidden pointer-events-none font-sans">
             <motion.div 
                className="absolute inset-0 z-[100] flex items-center justify-center bg-black pointer-events-auto"
                initial={{ opacity: 1 }}
                exit={{ 
                    opacity: 0, 
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 } 
                }}
             >
                {/* Flash Overlay */}
                <motion.div
                    className="absolute inset-0 bg-white pointer-events-none z-50 mix-blend-overlay"
                    initial={{ opacity: 0 }}
                    exit={{ opacity: [0, 1, 0], transition: { duration: 0.3, times: [0, 0.1, 1] } }}
                />

                <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
                    {/* Quote */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ scale: 1.5, opacity: 0, filter: "blur(10px)", transition: { duration: 0.4 } }}
                        transition={{ duration: 1 }}
                        className="mb-16 relative"
                    >
                        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-white leading-tight">
                            If you can't <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse">fly</span>, <br />
                            then <span className="italic text-white/80">run</span>
                        </h1>
                        {/* Glitch Effect Layer */}
                        <motion.h1 
                            className="absolute inset-0 text-4xl md:text-7xl font-black uppercase tracking-tighter text-red-500 leading-tight opacity-0"
                            animate={{ 
                                opacity: [0, 0.5, 0, 0.3, 0],
                                x: [0, -2, 2, -1, 0],
                                y: [0, 1, -1, 0, 0]
                            }}
                            transition={{ 
                                duration: 0.2, 
                                repeat: Infinity, 
                                repeatDelay: 3,
                                repeatType: "mirror"
                            }}
                        >
                            If you can't fly, <br />
                            then run
                        </motion.h1>
                    </motion.div>

                    {/* Loading Line & Button Container */}
                    <div className="h-24 flex flex-col items-center justify-center w-full relative">
                        <AnimatePresence mode="wait">
                            {!showButton ? (
                                <motion.div 
                                    key="loader"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="w-full max-w-md flex flex-col items-center gap-4"
                                >
                                    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 w-full"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: `${progress - 100}%` }}
                                            transition={{ ease: "linear", duration: 0 }}
                                        />
                                        {/* Glowing Head */}
                                        <motion.div 
                                            className="absolute top-1/2 -translate-y-1/2 h-1 w-20 bg-white blur-md"
                                            style={{ left: `${progress}%`, x: "-100%" }}
                                        />
                                    </div>
                                    <div className="flex justify-between w-full text-xs font-mono text-white/40 uppercase tracking-widest">
                                        <span>System_Boot</span>
                                        <span>{Math.round(progress)}%</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="button"
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setStarted(true)}
                                    className="group relative px-16 py-4 bg-white text-black font-black text-xl uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-indigo-600 hover:text-white"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Run <span className="text-indigo-600 group-hover:text-white transition-colors">→</span>
                                    </span>
                                    <div className="absolute inset-0 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Explosive Shards Background */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 w-full h-1/2 bg-black border-b border-white/5"
                        exit={{ 
                            y: -1000, 
                            rotate: -15, 
                            scale: 1.1,
                            transition: { duration: 0.5, ease: [0.7, 0, 0.3, 1] } 
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-black border-t border-white/5"
                        exit={{ 
                            y: 1000, 
                            rotate: 15, 
                            scale: 1.1,
                            transition: { duration: 0.5, ease: [0.7, 0, 0.3, 1] } 
                        }}
                    />
                    
                    {/* Extra Shards for Detail */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white/5 backdrop-blur-sm"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: "50%",
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)"
                            }}
                            initial={{ opacity: 0 }}
                            exit={{ 
                                opacity: [0, 1, 0],
                                x: (Math.random() - 0.5) * 1000,
                                y: (Math.random() - 0.5) * 1000,
                                rotate: Math.random() * 360,
                                scale: Math.random() * 2,
                                transition: { duration: 0.6, ease: "easeOut" }
                            }}
                        />
                    ))}
                </div>
             </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
