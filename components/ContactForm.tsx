"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  buildConsultationMessage,
  buildWhatsAppUrl,
  mailtoHref,
  telHref,
} from "@/lib/utils/contact-links";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    consultationType: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    window.open(buildWhatsAppUrl(buildConsultationMessage(formData)), "_blank");
  };

  const contactInfo = [
    {
      title: "اتصل بنا",
      desc: siteConfig.phone.display,
      href: telHref(),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
    },
    {
      title: "واتساب",
      desc: "راسلنا مباشرة على الواتساب",
      href: buildWhatsAppUrl(),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"></path>
        </svg>
      ),
    },
    {
      title: "العنوان",
      desc: siteConfig.address.short,
      href: siteConfig.address.mapsUrl,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
    },
  ];

  return (
    <section id="contact" className="bg-dark-section py-20 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-12 px-6 lg:px-10">
        {/* الهيدر مع الخط الذهبي بالنص */}
        <div className="text-center space-y-2">
          <span className="gold-divider"></span>
          <p className="text-gold text-sm font-medium">تواصل معي</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-c-white">نحن هنا لخدمتك</h2>
          <p className="text-c-foreground text-sm">اترك لنا تفاصيل قضيتك وسنعاود التواصل معك خلال أقرب وقت ممكن.</p>
        </div>

        {/* الكروت الثلاثة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="card text-center flex flex-col items-center"
            >
              <div className="icon-box mb-4">{item.icon}</div>
              <h3 className="text-c-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-c-foreground text-xs leading-relaxed">{item.desc}</p>
            </a>
          ))}
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form (احجز استشارة) */}
          <div className="lg:col-span-7 bg-dark-card border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-bold text-c-white">احجز استشارة</h2>
              <p className="text-c-foreground text-xs">
                سيتم تحويلك إلى الواتساب لإرسال الطلب مباشرةً إلى المكتب. جميع المعلومات تُعامل بسرية تامة.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              {/* Field 1 & 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-c-foreground text-xs block">الاسم الكامل</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-dark-section border border-white/10 rounded-md p-3 w-full text-c-white text-sm focus:outline-none focus:border-gold transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-c-foreground text-xs block">رقم الهاتف</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-dark-section border border-white/10 rounded-md p-3 w-full text-c-white text-sm focus:outline-none focus:border-gold transition"
                  />
                </div>
              </div>

              {/* Field 3 */}
              <div className="space-y-1.5">
                <label className="text-c-foreground text-xs block">البريد الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-dark-section border border-white/10 rounded-md p-3 w-full text-c-white text-sm focus:outline-none focus:border-gold transition"
                />
              </div>

              {/* Field 4 */}
              <div className="space-y-1.5">
                <label className="text-c-foreground text-xs block">نوع الاستشارة</label>
                <input
                  type="text"
                  name="consultationType"
                  required
                  value={formData.consultationType}
                  onChange={handleChange}
                  className="bg-dark-section border border-white/10 rounded-md p-3 w-full text-c-white text-sm focus:outline-none focus:border-gold transition"
                />
              </div>

              {/* Field 5 */}
              <div className="space-y-1.5">
                <label className="text-c-foreground text-xs block">تفاصيل القضية</label>
                <textarea
                  name="details"
                  rows={4}
                  required
                  value={formData.details}
                  onChange={handleChange}
                  className="bg-dark-section border border-white/10 rounded-md p-3 w-full text-c-white text-sm focus:outline-none focus:border-gold transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-start pt-2">
                <button
                  type="submit"
                  className="btn-gold flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold"
                >
                  <span>إرسال الطلب عبر الواتساب</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* Side Info Card */}
          <div className="lg:col-span-5 bg-dark-card border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 text-right">
            {/* Section 1: العنوان */}
            <div className="space-y-2">
              <h3 className="text-c-white font-bold text-lg">العنوان</h3>
              <p className="text-c-foreground text-xs leading-relaxed">
                {siteConfig.address.full}
              </p>
              <a
                href={siteConfig.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs font-semibold inline-flex items-center gap-1.5 hover:underline pt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>فتح في خرائط جوجل</span>
              </a>
            </div>

            {/* Section 2: ساعات العمل */}
            <div className="space-y-3">
              <h3 className="text-c-white font-bold text-lg">ساعات العمل</h3>
              <div className="space-y-2 text-c-foreground text-xs">
                {siteConfig.hours.map((entry) => (
                  <div key={entry.days} className="flex items-center justify-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gold"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>
                      {entry.days}: {entry.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-white/10 my-4" />

            {/* Section 3: الهاتف والبريد */}
            <div className="space-y-2.5">
              <a
                href={telHref()}
                className="flex items-center justify-start gap-2 text-c-white text-xs hover:text-gold transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>

              <a
                href={mailtoHref()}
                className="flex items-center justify-start gap-2 text-c-white text-xs hover:text-gold transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
