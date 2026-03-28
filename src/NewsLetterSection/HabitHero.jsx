import React from "react";
import { motion } from "framer-motion";
import customer from "../image/Mahin.jpeg";
import customer2 from "../image/customer2.png";
import customer3 from "../image/customer3.png";

const testimonials = [
  {
    text: "There are a lot of platforms out there - and I've tried them all. This habit tracker stands out head and shoulders above the rest!",
    name: "Mahin Khan",
    role: "User",
    img: customer,
  },
  {
    text: "I was a bit reluctant to try another habit app, but the simplicity and clean design impressed me from the start.",
    name: "Jake Warren",
    role: "User",
    img: customer2,
  },
  {
    text: "Whenever I struggle with consistency, this app keeps me on track. It’s been a real game changer for my daily routine.",
    name: "Kim Smith",
    role: "User",
    img: customer3,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

const HabitHero = () => {
  return (
    <div className="bg-base-100 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12"
        >
          What Our Users Say
        </motion.h2>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              variants={card}
              transition={{ duration: 0.09 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-base-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition"
            >
              <p className="text-gray-400 mb-8 leading-relaxed">
                “{item.text}”
              </p>

              <div className="flex items-center gap-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={item.img}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-secondary">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default HabitHero;