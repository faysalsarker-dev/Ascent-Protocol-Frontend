"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Required"),
  message: z.string().min(5, "Too short"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "faysalsarker.dev@gmail.com",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "01884570877",
    gradient: "from-violet-500 to-purple-500",
    delay: 0.2
  },
  { 
    icon: MapPin, 
    label: "Location", 
    value: "Bangladesh, Dhaka",
    gradient: "from-rose-500 to-pink-500",
    delay: 0.3
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      console.log(data);
      // Uncomment when ready:
      // const res = await contact(data);
      // if (res?.success) { ... }
      
      // Simulating success for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 600);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-5 gap-8 lg:gap-12"
      >
        {/* Left Panel - Contact Info */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 space-y-6"
        >
          {/* Intro Card */}
          <motion.div
            className="relative p-8 rounded-3xl bg-linearsrc/-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
            <Sparkles className="w-10 h-10 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Let&apos;s Start a Conversation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We&apos;re here to help and answer any questions you might have. 
              Looking forward to hearing from you!
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay, type: "spring", stiffness: 100 }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="group relative p-5 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`relative p-3 rounded-xl bg-linear-to-br ${item.gradient} shadow-lg`}>
                    <item.icon className="w-5 h-5 text-white" />
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">
                      {item.label}
                    </p>
                    <p className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* Right Panel - Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit(onSubmit)}
          className={`lg:col-span-3 relative p-8 lg:p-10 rounded-3xl bg-card/60 border border-border/50 backdrop-blur-xl shadow-2xl shadow-primary/5 ${
            errorShake ? "animate-[shake_0.5s_ease-in-out]" : ""
          }`}
        >
          {/* Form header */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Send us a message</h3>
            <p className="text-muted-foreground">Fill out the form and we&apos;ll get back to you shortly.</p>
          </div>

          {/* Form fields */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Name field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  Your Name
                  {focusedField === 'name' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </label>
                <Input
                  {...register("name")}
                  placeholder="John Doe"
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 ${
                    errors.name ? "border-destructive focus:border-destructive" : ""
                  }`}
                />
                <AnimatePresence>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-xs font-medium"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  Email Address
                  {focusedField === 'email' && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className={`h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 ${
                    errors.email ? "border-destructive focus:border-destructive" : ""
                  }`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-destructive text-xs font-medium"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Subject field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                Subject
                {focusedField === 'subject' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </label>
              <Input
                {...register("subject")}
                placeholder="How can we help?"
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField(null)}
                className={`h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 ${
                  errors.subject ? "border-destructive focus:border-destructive" : ""
                }`}
              />
              <AnimatePresence>
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.subject.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Message field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                Message
                {focusedField === 'message' && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
              </label>
              <Textarea
                {...register("message")}
                placeholder="Tell us more about your project, needs, or questions..."
                rows={5}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className={`rounded-xl bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50 ${
                  errors.message ? "border-destructive focus:border-destructive" : ""
                }`}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-destructive text-xs font-medium"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={isPending || success}
                className="w-full h-14 rounded-xl text-base font-semibold bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 gap-3"
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Message Sent!
                    </motion.div>
                  ) : isPending ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                      Sending...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Privacy note */}
            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our{" "}
              <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl pointer-events-none" />
        </motion.form>
      </motion.div>
    </div>
  );
}
