
"use client";
import { motion } from "framer-motion";



const  DecorativeElements = () =>{

return (

    <>

    <motion.div 
        className="absolute top-1/4 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

    </>
)

}

export default DecorativeElements