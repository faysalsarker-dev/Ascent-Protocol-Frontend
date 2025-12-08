"use client";
import { motion } from 'framer-motion';

const AnimatedOrbs = () => {
    return (
    <>
              <motion.div 
                  className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl"
                  animate={{ x: [0, 50, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl"
                  animate={{ x: [0, -50, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 12, repeat: Infinity, delay: 3 }}
                />
    </>
    );
};

export default AnimatedOrbs;