"use client";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon, WhatsappIcon } from "@/shared/ui/icons";

import { useState } from "react";
import { siteConfig } from "@/entities/office";
import { buildWhatsAppUrl, mailtoHref, telHref } from "@/entities/office";
import { buildConsultationMessage } from "@/features/consultation-request";

export function ContactSection() {
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
        <PhoneIcon className="size-5" />
      ),
    },
    {
      title: "واتساب",
      desc: "راسلنا مباشرة على الواتساب",
      href: buildWhatsAppUrl(),
      icon: (
        <WhatsappIcon className="size-5" />
      ),
    },
    {
      title: "العنوان",
      desc: siteConfig.address.short,
      href: siteConfig.address.mapsUrl,
      icon: (
        <MapPinIcon className="size-5" />
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
                  <SendIcon className="size-4" />
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
                <MapPinIcon className="size-4" />
                <span>فتح في خرائط جوجل</span>
              </a>
            </div>

            {/* Section 2: ساعات العمل */}
            <div className="space-y-3">
              <h3 className="text-c-white font-bold text-lg">ساعات العمل</h3>
              <div className="space-y-2 text-c-foreground text-xs">
                {siteConfig.hours.map((entry) => (
                  <div key={entry.days} className="flex items-center justify-start gap-2">
                    <ClockIcon className="size-4 text-gold" />
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
                <PhoneIcon className="size-4 text-gold" />
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>

              <a
                href={mailtoHref()}
                className="flex items-center justify-start gap-2 text-c-white text-xs hover:text-gold transition"
              >
                <MailIcon className="size-4 text-gold" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
