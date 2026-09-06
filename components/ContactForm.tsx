export default function ContactForm() {
  return (
    <section className="bg-gray-900 text-white py-16 px-16">
      <div className="max-w-6xl mx-auto flex gap-12 items-start">
        {/* معلومات التواصل */}
        <div className="flex-1">
          <h4 className="text-3xl font-bold mb-4">تواصل معنا</h4>
          <p className="text-gray-400 mb-6">للاستفسارات والطلبات، يرجى ملء النموذج أدناه</p>
          <p className="text-gray-300 mb-2">📞 123456789</p>
          <p className="text-gray-300">✉️ info@lawyer.com</p>
        </div>

        {/* الفورم */}
        <div className="flex-1 flex flex-col gap-4">
          <input
            placeholder="الاسم"
            className="bg-transparent border border-gray-600 rounded p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <input
            placeholder="التليفون"
            className="bg-transparent border border-gray-600 rounded p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <input
            placeholder="البريد الإلكتروني"
            className="bg-transparent border border-gray-600 rounded p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <textarea
            placeholder="الرسالة"
            rows={4}
            className="bg-transparent border border-gray-600 rounded p-3 w-full text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
          <button className="bg-white text-black font-bold py-3 px-6 rounded hover:bg-gray-200 transition">
            إرسال
          </button>
        </div>
      </div>
    </section>
  );
}
