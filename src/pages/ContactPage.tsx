import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="bg-[#faf8f5] py-16 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              GET IN TOUCH
            </span>
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 tracking-tight">
            Visit Our <span className="text-[#b8860b] italic font-serif">Flagship</span> Salon
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Have questions or special event inquiries? Drop by our Manhattan studio or reach out below.
          </p>
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-stone-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-serif font-bold text-stone-900 uppercase">
                Studio Information
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-stone-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f1ea] flex items-center justify-center text-[#b8860b] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase tracking-wider text-xs">
                      Address
                    </strong>
                    <span>123 Barber Street, Soho, New York, NY 10001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f1ea] flex items-center justify-center text-[#b8860b] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase tracking-wider text-xs">
                      Phone
                    </strong>
                    <span>(123) 456-7890</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f1ea] flex items-center justify-center text-[#b8860b] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase tracking-wider text-xs">
                      Email
                    </strong>
                    <span>hello@manebarbershop.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f1ea] flex items-center justify-center text-[#b8860b] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-bold uppercase tracking-wider text-xs">
                      Operating Hours
                    </strong>
                    <span>Monday – Sunday: 9:00 AM – 8:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking & Amenities note */}
            <div className="bg-[#121212] text-white p-6 border border-stone-800 space-y-2">
              <h3 className="text-xs font-bold tracking-widest text-[#c59b27] uppercase">
                Valet & Parking
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Complimentary valet parking is available for all appointment holders on Barber St. & 4th Avenue.
              </p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/90 p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Aurelius"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@empire.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Grooming inquiry, private event, feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can our master barbers assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#faf8f5] border border-stone-300 px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#b8860b]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] hover:bg-[#c59b27] text-white py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Send Message</span>
              </button>

              {sent && (
                <div className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 p-3 border border-green-200 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! Your message has been received. We will get back to you shortly.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
