"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useTransition } from "react";
import { contact } from "@/src/services/workout/contact.service";

const schema = z.object({
  name: z.string().min(2, "Too short"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Required"),
  message: z.string().min(5, "Too short"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
    //   const res = await contact(data);
console.log(data)

    //   if (res?.success) {
    //     setSuccess(true);
    //     reset();

    //     // reset success msg
    //     setTimeout(() => setSuccess(false), 2000);
    //   } else {
    //     setErrorShake(true);
    //     setTimeout(() => setErrorShake(false), 600);
    //   }
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

      {/* LEFT INFO PANEL */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        {[
          { icon: Mail, label: "Email", value: "faysalsarker.dev@gmail.com" },
          { icon: Phone, label: "Phone", value: "01884570877" },
          { icon: MapPin, label: "Location", value: "Bangladesh, Dhaka" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
              <div className="font-semibold text-foreground">{item.value}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* RIGHT FORM */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-8 rounded-2xl bg-card border border-border/30"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <motion.div
          animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 gap-4"
        >
          <div>
            <Input placeholder="Your Name" {...register("name")} className="bg-muted/50" />
            {errors.name && (
              <motion.p
                className="text-red-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {errors.name.message}
              </motion.p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className="bg-muted/50"
            />
            {errors.email && (
              <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {errors.email.message}
              </motion.p>
            )}
          </div>
        </motion.div>

        <div>
          <Input placeholder="Subject" {...register("subject")} className="bg-muted/50" />
          {errors.subject && (
            <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {errors.subject.message}
            </motion.p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Your Message"
            rows={5}
            {...register("message")}
            className="bg-muted/50 resize-none"
          />
          {errors.message && (
            <motion.p className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {errors.message.message}
            </motion.p>
          )}
        </div>

        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            className="w-full gap-2"
            disabled={isPending}
          >
            <Send className="h-4 w-4" />
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>

        <AnimatePresence>
          {success && (
            <motion.p
              className="text-green-500 text-center font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              Message sent successfully!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
}
