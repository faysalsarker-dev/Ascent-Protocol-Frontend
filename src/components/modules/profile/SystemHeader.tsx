import { motion } from "framer-motion";

 const SystemHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative pt-4 pb-2 px-4"
    >
      {/* System notification bar */}
      <div className="flex items-center justify-center gap-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px bg-linear-to-r from-transparent to-primary"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] tracking-[0.4em] text-primary/80 uppercase"
        >
          ◆ Player Status ◆
        </motion.span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 40 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-px bg-linear-to-r from-transparent to-primary"
        />
      </div>
    </motion.div>
  );
};


export default SystemHeader;