import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaFire, FaClock } from "react-icons/fa";

import fst from "../image/undraw_building-a-website_1wrp.svg";
import snd from "../image/undraw_fitness-stats_bd09.svg";
import trd from "../image/undraw_travel-booking_a6s2.svg";
import frt from "../image/undraw_online-community_3o0l.svg";

const features = [
  {
    title: "Build Strong Habits",
    desc: "Track daily routines and stay consistent with your goals.",
    icon: <FaFire />,
    image: fst,
  },
  {
    title: "Track Your Progress",
    desc: "Visualize your improvement with streaks and insights.",
    icon: <FaChartLine />,
    image: snd,
  },
  {
    title: "Stay Accountable",
    desc: "Keep yourself motivated and never miss a day.",
    icon: <FaClock />,
    image: trd,
  },
  {
    title: "Community Driven",
    desc: "Explore and adopt habits created by others.",
    icon: <FaUsers />,
    image: frt,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const WhyChoose = () => {
  return (
    <div className="py-20 px-6 bg-gray-100 text-white">
      
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-secondary mb-3">
          Why Choose Habit Tracker
        </h2>
        <p className="text-gray-400">
          Simple. Powerful. Designed for consistency.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg h-80 border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-secondary/80 transition duration-300 flex flex-col"
          >
            {/* 🖼 Image */}
            <div className="h-32 flex justify-center items-center mb-4">
              <img
                src={item.image}
                alt=""
                className="h-full object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Icon */}
            <div className="text-2xl text-secondary mb-2">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg text-accent font-bold mb-1">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 flex-grow">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyChoose;