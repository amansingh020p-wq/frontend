'use client';

import { useEffect, useRef } from 'react';
import { Phone, Mail, MessageSquare, Send } from 'lucide-react';

export default function Contact() {
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1f1b]/95 to-[#0e1f1b]/85 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="section-transition">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Section - Hidden on mobile/tablet, visible only on desktop */}
            <div className="hidden lg:flex flex-col">
              <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9348.806334483925!2d57.479024445997744!3d-20.241328758585013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c5bb8ea4aa801%3A0x4794cd25f705cd6c!2sNEX%20Tower!5e1!3m2!1sen!2sin!4v1763975156061!5m2!1sen!2sin"
                  width="100%"
                  height="520"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Contact Form Section - Full width on mobile, half width on desktop */}
            <div className="lg:col-span-1 col-span-1">
              <div className="glassmorphism rounded-xl p-6 shadow-xl backdrop-blur-md">
                <div>
                  <h2 className="text-2xl font-bold text-black mb-6 flex items-center">
                    <MessageSquare className="h-6 w-6 text-[#43b852] mr-3" />
                    Contact Us
                  </h2>
                  
                  <form className="space-y-4">
                    <div className="group">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-white/20 focus:outline-none focus:border-[#43b852] focus:bg-white/95 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-white/20 focus:outline-none focus:border-[#43b852] focus:bg-white/95 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        rows="4"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-white/20 focus:outline-none focus:border-[#43b852] focus:bg-white/95 transition-all duration-300"
                      ></textarea>
                    </div>
                    <button className="w-full bg-[#43b852] text-white px-6 py-2.5 rounded-full hover:bg-[#0e1f1b] transition-all transform hover:scale-105 flex items-center justify-center group">
                      <span>Send Message</span>
                      <Send className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center  rounded-lg hover:bg-white/10 transition-colors">
                    <Phone className="h-4 w-4 text-[#43b852] mr-3" />
                    <span className="text-black text-sm">409-748-1384</span>
                  </div>
                  <div className="flex items-center rounded-lg hover:bg-white/10 transition-colors">
                    <Mail className="h-4 w-4 text-[#43b852] mr-3" />
                    <span className="text-black text-sm">contact@forexflow.com</span>
                  </div>
                  <div className="flex items-center rounded-lg hover:bg-white/10 transition-colors">
                    <MessageSquare className="h-4 w-4 text-[#43b852] mr-3" />
                    <span className="text-black text-sm">Live Chat Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}