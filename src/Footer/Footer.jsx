import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";
import mahin from "../image/Mahin.jpeg";

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#004a94] via-[#43c3dd] to-[#d9edf8] text-white mt-20">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10 items-center"
      >

        {/* 👤 Profile */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={mahin}
            alt="Mahin"
            className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-4"
          />

          <h2 className="text-xl font-bold">Mubashshir Khan Mahin</h2>
          <p className="text-sm text-white/80 mt-1">
            Full Stack Developer | MERN
          </p>
        </div>

        {/* 📌 Middle */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3">
            Habit Tracker
          </h3>

          <p className="text-sm text-white/80 max-w-xs mx-auto">
            Build consistency, track progress, and transform your life with powerful daily habits.
          </p>
        </div>

        {/* 🔗 Social Links */}
        <div className="flex justify-center md:justify-end gap-6">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/mubashshir-khan-mahin-944380365"
            target="_blank"
            className="text-2xl hover:scale-125 transition duration-300"
          >
            <FaLinkedin />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/mahiinnnn/"
            target="_blank"
            className="text-2xl hover:scale-125 transition duration-300"
          >
            <FaFacebook />
          </a>

          {/* Email */}
          <a
            href="mailto:mubashshirmahin01@gmail.com"
            className="text-2xl hover:scale-125 transition duration-300"
          >
            <FaEnvelope />
          </a>
        </div>
      </motion.div>

      {/* 🔻 Bottom */}
      <div className="text-center text-sm text-white/70 pb-6">
        © {new Date().getFullYear()} Habit Tracker — Built by Mahin
      </div>
    </div>
  );
};

export default Footer;