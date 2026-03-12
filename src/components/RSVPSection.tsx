import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "1",
    attending: "yes",
  });

  const [submitted, setSubmitted] = useState(false);
  const { slug } = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("rsvps").insert([
      {
        guest_name: form.name,
        guest_email: form.email,
        guest_count: Number(form.guests),
        attending: form.attending === "yes",
        invitation_slug: slug,
      },
    ]);

    if (error) {
      console.error(error);
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-deep-maroon text-center px-6">
        <div>
          <h2 className="font-display text-4xl md:text-5xl gold-text-gradient mb-6">
            Thank You!
          </h2>

          <p className="font-elegant text-lg md:text-xl text-royal-gold mb-6">
            Your RSVP has been received.
          </p>

          <p className="font-elegant text-lg text-royal-gold">
            We look forward to celebrating with you!
          </p>

          <div className="mt-10">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-maroon transition"
            >
              Back to Invitation
            </button>
          </div>
        </div>
      </section>
    );
  }

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
          {/* Name */}
          <div>
            <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2 text-royal-gold">
              Your Name
            </label>

            <input
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-deep-maroon-light/30 border border-royal-gold/40 rounded-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2 text-royal-gold">
              Email Address
            </label>

            <input
              type="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-deep-maroon-light/30 border border-royal-gold/40 rounded-sm"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2 text-royal-gold">
              Number of Guests
            </label>

            <select
              value={form.guests}
              onChange={(e) =>
                setForm({ ...form, guests: e.target.value })
              }
              className="w-full px-4 py-3 bg-deep-maroon-light/30 border border-royal-gold/40 rounded-sm"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Attending */}
          <div>
            <label className="block font-display text-xs tracking-[0.2em] uppercase mb-2 text-royal-gold">
              Will you attend?
            </label>

            <div className="flex gap-4">
              {["yes", "no"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, attending: opt })
                  }
                  className={`flex-1 py-3 border rounded-sm ${
                    form.attending === opt
                      ? "gradient-gold"
                      : "border-royal-gold/40"
                  }`}
                >
                  {opt === "yes"
                    ? "Joyfully Accept"
                    : "Regretfully Decline"}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 border-2 border-royal-gold-light"
          >
            Send RSVP
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;