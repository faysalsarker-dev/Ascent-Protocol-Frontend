"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { motion } from "framer-motion";

const WorkoutCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      <Card
        className="
          w-full
          flex flex-row items-center 
          gap-4 p-4
          rounded-3xl
          bg-gradient-to-br from-[#2a2236] to-[#1c1a26]
          border border-[#3a3344]/40
          shadow-[0_8px_20px_rgba(0,0,0,0.35)]
        "
      >
        {/* LEFT IMAGE */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcyqT1ilwqpiBHg__xE7jeUlMTU868vLdPnA&s'
            alt="Workout"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        {/* RIGHT CONTENT (stays on same line) */}
        <div className="flex flex-col justify-center w-full">
          <h2 className="text-white font-semibold text-lg leading-tight">
            Chest – Incline Bench Press
          </h2>

          {/* Row layout like the screenshot */}
          <div className="flex flex-row items-center justify-between mt-2 w-full text-sm">
            <div>
              <p className="text-gray-300">Sets</p>
              <p className="text-white font-medium">4</p>
            </div>

            <div>
              <p className="text-gray-300">Reps</p>
              <p className="text-white font-medium">12</p>
            </div>

            <div className="text-right">
              <p className="text-gray-300">Rest</p>
              <p className="text-white font-medium">60s</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WorkoutCard;
