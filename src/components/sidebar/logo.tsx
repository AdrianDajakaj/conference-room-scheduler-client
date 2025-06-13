"use client";
import { motion } from "motion/react";
import logoIcon from "@/assets/logo.png";


export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
        <img
            src={logoIcon}
            alt="Logo"
            className="h-8 w-10 shrink-0  rounded-tr-sm rounded-br-lg rounded-bl-sm"
        />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Conference Rooms
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
        href="#"
        className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
        <img
            src={logoIcon}
            alt="Logo"
            className="h-8 w-10 shrink-0  rounded-tr-sm rounded-br-lg rounded-bl-sm"
        />
    </a>
  );
};