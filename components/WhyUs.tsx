export default function WhyUs() {

    const services = [
      { icon: "⚖️", title: "ثقة", desc: "نلتزم بالشفافية التامة مع عملائنا ونضع مصالحهم فوق كل اعتبار" },
      { icon: "📋", title: "خبرة", desc: "فريقنا من المحامين المتخصصين يمتلك خبرة واسعة في كافة أنواع القضايا" },
      { icon: "🏛️", title: "مصداقية", desc: "سجل حافل من النجاحات يثبت قدرتنا على تحقيق أفضل النتائج لعملائنا" },
    ];

    return (
      <section className=" container my-5 px-16 py-10 ">
        <div className=" text-center">
          {/* grid  */}
          <div className="grid grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-mist-500 p-4 shadow-2xl border rounded-lg border-gray-300">
                <p className="text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-white mx-auto mb-4">
                  {service.icon}
                </p>
                <h4 className="text-2xl font-bold">{service.title}</h4>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}