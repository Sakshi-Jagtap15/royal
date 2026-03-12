import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", guests: "1", attending: "yes" });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase
    .from("rsvps")
    .insert([
      {
        guest_name: form.name,
        guest_email: form.email,
        guest_count: Number(form.guests),
        attending: form.attending === "yes",
        invitation_slug: "test-wedding" // replace later with dynamic slug
      }
    ]);

  if (error) {
    toast.error("Something went wrong. Please try again.");
    console.error(error);
    return;
  }

  toast.success("Thank you! Your RSVP has been received.", {
    description: `We look forward to celebrating with you, ${form.name}!`,
  });

  setForm({ name: "", email: "", guests: "1", attending: "yes" });
};

  

  return (
    <section ref={ref} className="py-24 bg-maroon relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-xl">
        <motion.h2
          className="font-display text-3xl md:text-4xl gold-text-gradient text-center mb-4 tracking-[0.15em]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          RSVP
        </motion.h2>
        <motion.p
          className="text-center font-elegant text-lg mb-12 italic"
          style={{ color: "hsl(43, 70%, 70%)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Kindly respond by 1st November 2026
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "Your Name", type: "text", key: "name", placeholder: "Enter your full name" },
            { label: "Email Address", type: "email", key: "email", placeholder: "your@email.com" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(43, 70%, 70%)" }}>
                {field.label}
              </label>
              <input
                type={field.type}
                required
                value={form[field.key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-deep-maroon-light/30 border border-royal-gold/40 rounded-sm font-elegant text-lg focus:border-royal-gold focus:outline-none transition-colors placeholder:text-royal-gold/30"
                style={{ color: "hsl(36, 33%, 90%)" }}
              />
            </div>
          ))}

          <div>
            <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(43, 70%, 70%)" }}>
              Number of Guests
            </label>
            <select
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
              className="w-full px-4 py-3 bg-deep-maroon-light/30 border border-royal-gold/40 rounded-sm font-elegant text-lg focus:border-royal-gold focus:outline-none transition-colors"
              style={{ color: "hsl(36, 33%, 90%)" }}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n} className="bg-deep-maroon">{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(43, 70%, 70%)" }}>
              Will you attend?
            </label>
            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm({ ...form, attending: opt })}
                  className={`flex-1 py-3 rounded-sm font-display text-sm tracking-[0.15em] uppercase border transition-all duration-300 ${
                    form.attending === opt
                      ? "gradient-gold border-transparent"
                      : "border-royal-gold/40 hover:border-royal-gold"
                  }`}
                  style={{ color: form.attending === opt ? "hsl(345, 80%, 10%)" : "hsl(43, 70%, 70%)" }}
                >
                  {opt === "yes" ? "Joyfully Accept" : "Regretfully Decline"}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 font-display text-sm tracking-[0.2em] uppercase gold-shine rounded-sm border-2 border-royal-gold-light cursor-pointer"
            style={{ color: "hsl(345, 80%, 10%)" }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsla(43, 65%, 52%, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Send RSVP
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
