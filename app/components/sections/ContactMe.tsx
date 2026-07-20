"use client";
import { useLanguage } from "../../context/LanguageContext";
import { memo } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function ContactMe() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="w-full py-24 px-6 md:px-20 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black">
            {t.ContactMe.Header}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground text-lg">
            Have a project in mind? Let's work together to create something amazing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "masoud@example.com" },
              { icon: Phone, label: "Phone", value: "+98 123 456 7890" },
              { icon: MapPin, label: "Location", value: "Azerbaijan" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 border border-black/10 rounded-2xl hover:shadow-lg transition bg-white/5 dark:bg-white/5 backdrop-blur-sm hover:border-purple-400/30 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-black/5 dark:bg-white/10 rounded-xl group-hover:bg-purple-500/10 transition-colors">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="p-6 border border-black/10 rounded-2xl bg-white/5 dark:bg-white/5 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {["GitHub", "LinkedIn", "Twitter"].map((label) => (
                  <button
                    key={label}
                    className="px-4 py-2 border border-black/10 rounded-xl hover:bg-black/5 transition text-sm font-medium hover:border-purple-400/30"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="space-y-6 bg-white/5 dark:bg-white/5 p-8 md:p-10 rounded-3xl border border-black/10 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    {t.ContactMe.Name}
                  </label>
                  <input
                    type="text"
                    placeholder={t.ContactMe.namePlaceholder}
                    className="
                      w-full px-5 py-4 
                      border border-zinc-300 dark:border-zinc-700 
                      rounded-xl 
                      text-black dark:text-white 
                      placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                      focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white 
                      transition-all duration-300
                      text-lg
                      bg-white/50 dark:bg-zinc-800/50
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    {t.ContactMe.Subject}
                  </label>
                  <input
                    type="text"
                    placeholder={t.ContactMe.subjectPlaceholder}
                    className="
                      w-full px-5 py-4 
                      border border-zinc-300 dark:border-zinc-700 
                      rounded-xl 
                      text-black dark:text-white 
                      placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                      focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white 
                      transition-all duration-300
                      text-lg
                      bg-white/50 dark:bg-zinc-800/50
                    "
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="
                    w-full px-5 py-4 
                    border border-zinc-300 dark:border-zinc-700 
                    rounded-xl 
                    text-black dark:text-white 
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white 
                    transition-all duration-300
                    text-lg
                    bg-white/50 dark:bg-zinc-800/50
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Message</label>
                <textarea
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="
                    w-full px-5 py-4 
                    border border-zinc-300 dark:border-zinc-700 
                    rounded-xl 
                    text-black dark:text-white 
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white 
                    transition-all duration-300
                    text-lg
                    resize-none
                    bg-white/50 dark:bg-zinc-800/50
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full flex items-center justify-center gap-3
                  bg-black text-white 
                  font-semibold
                  py-4 rounded-xl 
                  hover:bg-gray-800 
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  text-lg
                  shadow-lg hover:shadow-xl hover:shadow-black/20
                "
              >
                <Send size={20} />
                {t.ContactMe.Button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ContactMe);
