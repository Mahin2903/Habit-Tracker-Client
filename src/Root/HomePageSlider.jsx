/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    title: "Morning Workout",
    subtitle: "Start your day strong",
    description: "Build energy and discipline with daily exercise.",
    image:
      "https://www.verywellhealth.com/thmb/eWRpvdKzUglKID4Xx7tLrrSOPQQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/VWH-GettyImages-1334658317-b1a9ea2a6c644f77bdd43b9a3d3b127c.jpg",
  },
  {
    title: "Read Daily",
    subtitle: "Grow your knowledge",
    description: "Reading 10 pages a day changes your mindset.",
    image:
      "https://marvel-b1-cdn.bc0a.com/f00000000295632/cdn.lindamoodbell.com/wp-content/uploads/2024/09/Web-Blog-BenefitsReading-Blog-2.jpg",
  },
  {
    title: "Stay Hydrated",
    subtitle: "Health first",
    description: "Drink enough water to stay active and focused.",
    image:
      "https://goldcoastpt.com/wp-content/uploads/2023/07/importance-of-hydration-fyzical.jpg",
  },
];

const HabitSlider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden text-white">

      {/* ✅ Animated Image (NO opacity issue) */}
      <AnimatePresence >
        <motion.img
          key={slides[current].image}
          src={slides[current].image}
          alt=""
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut"  }}
          className="absolute w-full h-full object-cover object-left"
        />
      </AnimatePresence>

      {/* ✅ Overlay (controls darkness, no flash) */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* ✅ Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <motion.h1
          key={slides[current].title}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold tracking-wide"
        >
          {slides[current].title}
        </motion.h1>

        <motion.h2
          key={slides[current].subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-secondary text-xl mt-2"
        >
          {slides[current].subtitle}
        </motion.h2>

        <motion.p
          key={slides[current].description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl mt-4 text-gray-300"
        >
          {slides[current].description}
        </motion.p>
      </div>

      {/* ✅ Navigation */}
      <div className="absolute inset-0 flex justify-between items-center px-6 z-20">
        <button onClick={prevSlide} className="btn btn-circle">
          ❮
        </button>
        <button onClick={nextSlide} className="btn btn-circle">
          ❯
        </button>
      </div>

      {/* ✅ Indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              current === index ? "bg-secondary scale-125" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HabitSlider;