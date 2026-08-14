import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Heart, User, Users, Utensils, MessageSquare, AlertCircle, Mail } from 'lucide-react';
import { weddingConfig } from '../config/weddingData';
import { OrnamentalDivider } from './OrnamentalDivider';

interface RSVPData {
  fullName: string;
  email: string;
  guestsCount: number;
  attending: 'yes' | 'no';
  dietaryPreference: string;
  message: string;
}

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<RSVPData>({
    fullName: '',
    email: '',
    guestsCount: 1,
    attending: 'yes',
    dietaryPreference: weddingConfig.rsvp.dietaryOptions[0] || 'No Specific Preferences',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMsg('Please enter a valid email address to receive the wedding details.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const submissionPayload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      // 1. Try sending to backend Express API
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });

      if (!res.ok) {
        console.warn('Backend API request returned non-OK status, utilizing local storage fallback.');
      }
    } catch (err) {
      console.warn('Backend server connection fallback to localStorage:', err);
    }

    // 2. Save locally in browser storage for resilience
    try {
      const existingRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existingRsvps.push(submissionPayload);
      localStorage.setItem('wedding_rsvps', JSON.stringify(existingRsvps));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }

    // 2b. Send confirmation email with wedding details & live location
    try {
      const emailRes = await fetch('/api/rsvp/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });
      setEmailSent(emailRes.ok);
    } catch (err) {
      console.warn('Confirmation email could not be sent:', err);
      setEmailSent(false);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    // 3. Trigger confetti celebration if attending
    if (formData.attending === 'yes') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#6B1D2F', '#FAF0CA', '#C5A059'],
      });
    }
  };

  return (
    <section id="rsvp" className="py-20 sm:py-28 bg-maroon-dark text-cream-100 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-maroon-light/30 via-maroon-dark to-maroon-deep opacity-95" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-gold/90 font-medium block mb-2">
            R.S.V.P
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cream-100 font-semibold tracking-wide">
            We Would Love to Celebrate With You
          </h2>
          <OrnamentalDivider variant="gold" />
          <p className="text-cream-200 text-sm sm:text-base italic">
            Kindly confirm your presence by {weddingConfig.rsvp.deadline}
          </p>
        </motion.div>

        {/* Confirmation Card OR RSVP Form */}
        {submitted ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-12 rounded-3xl glass-dark-card gold-border-glow text-center max-w-2xl mx-auto shadow-2xl"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20 border border-gold text-gold flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-gold font-bold mb-3">
              {formData.attending === 'yes'
                ? 'Thank You For Celebrating With Us!'
                : 'Thank You For Letting Us Know'}
            </h3>

            <p className="text-cream-200 text-base sm:text-lg leading-relaxed mb-6">
              {formData.attending === 'yes'
                ? `Dearest ${formData.fullName}, we are overjoyed to receive your confirmation for ${formData.guestsCount} guest(s). We look forward to creating unforgettable memories together!`
                : `Dearest ${formData.fullName}, we will miss your presence on our special day. Thank you for your warm wishes and love.`}
            </p>

            {emailSent ? (
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold text-sm mb-6">
                <Mail className="w-4 h-4" />
                Wedding details &amp; live location sent to {formData.email}
              </p>
            ) : (
              <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-maroon-light/40 border border-gold/30 text-cream-200 text-sm mb-6">
                <Mail className="w-4 h-4 text-gold/70" />
                Your RSVP was recorded. The confirmation email couldn't be sent right now.
              </p>
            )}

            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-widest bg-gold/20 border border-gold text-gold hover:bg-gold hover:text-maroon-dark transition-all"
            >
              EDIT RESPONSE
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="p-8 sm:p-12 rounded-3xl glass-dark-card gold-border shadow-2xl space-y-6"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-900/50 border border-red-500/50 text-red-200 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Attendance Choice Buttons */}
            <div>
              <label className="text-xs uppercase tracking-widest text-gold font-semibold block mb-3 text-center">
                Will you be attending our wedding? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`py-4 px-6 rounded-2xl border text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    formData.attending === 'yes'
                      ? 'bg-gold-gradient text-maroon-dark border-gold shadow-lg shadow-gold/20 scale-[1.02]'
                      : 'bg-maroon-deep/60 text-cream-200 border-gold/30 hover:border-gold'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${formData.attending === 'yes' ? 'fill-maroon-dark' : ''}`} />
                  YES, I'LL BE THERE ❤️
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`py-4 px-6 rounded-2xl border text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    formData.attending === 'no'
                      ? 'bg-maroon-light text-cream-100 border-gold shadow-lg scale-[1.02]'
                      : 'bg-maroon-deep/60 text-cream-200 border-gold/30 hover:border-gold'
                  }`}
                >
                  SORRY, I CAN'T ATTEND
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-xs uppercase tracking-widest text-cream-300 font-semibold block mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-maroon-deep/70 border border-gold/40 text-cream-100 placeholder-cream-300/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-widest text-cream-300 font-semibold block mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-maroon-deep/70 border border-gold/40 text-cream-100 placeholder-cream-300/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm"
                />
              </div>
              <p className="mt-2 text-xs text-cream-300/60 flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold/70" />
                We'll email you the wedding date, venue &amp; live location details.
              </p>
            </div>

            {/* Number of Guests & Dietary Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-cream-300 font-semibold block mb-2">
                  Number of Guests
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                  <select
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-maroon-deep/70 border border-gold/40 text-cream-100 focus:outline-none focus:border-gold text-sm appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-maroon-dark text-cream-100">
                        {num} Guest{num > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-cream-300 font-semibold block mb-2">
                  Dietary Preferences
                </label>
                <div className="relative">
                  <Utensils className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60" />
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-maroon-deep/70 border border-gold/40 text-cream-100 focus:outline-none focus:border-gold text-sm appearance-none"
                  >
                    {weddingConfig.rsvp.dietaryOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-maroon-dark text-cream-100">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Personal Message */}
            <div>
              <label className="text-xs uppercase tracking-widest text-cream-300 font-semibold block mb-2">
                Personal Message for Bride & Groom
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gold/60" />
                <textarea
                  rows={3}
                  placeholder="Share a wish or note for the couple..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-maroon-deep/70 border border-gold/40 text-cream-100 placeholder-cream-300/50 focus:outline-none focus:border-gold text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-bold tracking-widest text-sm bg-gold-gradient text-maroon-dark hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>SUBMITTING CONFIRMATION...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  SUBMIT RSVP RESPONSE
                </>
              )}
            </button>

          </motion.form>
        )}

      </div>
    </section>
  );
};
