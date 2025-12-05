import { motion } from "framer-motion";
import { Calendar, Weight, Ruler, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface UserInfoSectionProps {
  dateOfBirth: Date | null;
  weight: number | null;
  height: number | null;
  onEditDOB: () => void;
  onEditWeight: () => void;
  onEditHeight: () => void;
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onEdit: () => void;
  delay: number;
  color: string;
}

const InfoRow = ({ icon, label, value, onEdit, delay, color }: InfoRowProps) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onEdit}
    className="w-full flex items-center justify-between py-3 px-3 rounded-lg bg-muted/30 border border-primary/10 hover:border-primary/30 hover:bg-muted/50 transition-all group"
  >
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ 
          backgroundColor: `${color}15`,
          border: `1px solid ${color}30`
        }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="text-left">
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="font-display text-base text-foreground">
          {value}
        </p>
      </div>
    </div>
    <ChevronRight 
      className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" 
    />
  </motion.button>
);

export const UserInfoSection = ({
  dateOfBirth,
  weight,
  height,
  onEditDOB,
  onEditWeight,
  onEditHeight,
}: UserInfoSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.1 }}
      className="px-4 mt-6"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-linear-to-r from-secondary/50 to-transparent" />
        <h2 className="font-display text-sm tracking-[0.2em] text-secondary">
          HUNTER DATA
        </h2>
        <div className="flex-1 h-px bg-linear-to-l from-secondary/50 to-transparent" />
      </div>

      <div className="system-window rounded-lg p-3 space-y-2">
        <InfoRow
          icon={<Calendar className="w-5 h-5" />}
          label="Birth Date"
          value={dateOfBirth ? format(dateOfBirth, "MMM dd, yyyy") : "Not Configured"}
          onEdit={onEditDOB}
          delay={1.2}
          color="hsl(195, 100%, 50%)"
        />
        <InfoRow
          icon={<Weight className="w-5 h-5" />}
          label="Weight"
          value={weight ? `${weight} kg` : "Not Configured"}
          onEdit={onEditWeight}
          delay={1.3}
          color="hsl(260, 80%, 55%)"
        />
        <InfoRow
          icon={<Ruler className="w-5 h-5" />}
          label="Height"
          value={height ? `${height} cm` : "Not Configured"}
          onEdit={onEditHeight}
          delay={1.4}
          color="hsl(280, 90%, 60%)"
        />
      </div>
    </motion.div>
  );
};
