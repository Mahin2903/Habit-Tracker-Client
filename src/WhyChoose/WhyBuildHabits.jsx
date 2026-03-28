import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaChartLine, FaUserCheck } from "react-icons/fa";

const data = [
  {
    title: "Save Mental Energy",
    desc: "Habits remove daily decision fatigue so you can focus on what truly matters.",
    icon: <FaBrain />,
  },
  {
    title: "Consistent Growth",
    desc: "Small daily actions compound into massive long-term success.",
    icon: <FaChartLine />,
  },
  {
    title: "Shape Your Identity",
    desc: "Your habits define who you become. Consistency builds identity.",
    icon: <FaUserCheck />,
  },
];

const WhyBuildHabits = () => {
  return (
    <div className="py-20 px-6 bg-base-100">
      
      {/* 🔥 Title */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-secondary mb-3">
          Why Build Habits?
        </h2>
        <p className="text-gray-500">
          Small actions lead to powerful life changes.
        </p>
      </div>

      {/* 💎 Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              y: -8,
            }}
            className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center"
          >
            {/* Icon */}
            <div className="text-4xl text-secondary mb-4 flex justify-center">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-accent mb-2">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyBuildHabits;