export default function Services() {

const services = [
  { title: "قانون الأعمال التجارية", desc: "نص الخدمة..." },
  { title: "الملكية الفكرية", desc: "نص الخدمة..." },
  { title: "المنازعات العقارية", desc: "نص الخدمة..." },
  { title: "قانون جنائي", desc: "نص الخدمة..." },
  { title: "قانون الأسرة", desc: "نص الخدمة..." },
  { title: "الإصابات الشخصية", desc: "نص الخدمة..." },
];

  return (
    <section className=" container my-5 px-16 py-20">
      <div className="w-full text-center ">
        <p>نحــــــن خبــــــراء فــــي</p>
        <h2 className="text-3xl font-bold p-4">مجالات الممارسة القانونية</h2>
        <p>
          يتمتعمكتب محمد سعيد الشامسي للمحاماة والاستشارات القانونية بخبرة واسعة في التعامل مع جميع أنواع القضايا، بما
          في ذلك على سبيل المثال لا الحصر القضايا المدنية والتجارية والجنائية وقضايا الأحوال الشخصية. مع مكتب محمد سعيد
          الشامسي للمحاماة والاستشارات للاستشارات القانونية، نسعى دائمًا إلى تحديث معلوماتنا القانونية ونسأل أنفسنا
          باستمرار: ماذا يمكننا أن نضيف إلى معلوماتنا؟ إذا كنت ترغب في الحصول على مشورة قانونية، فستجد جميع المحامين ذوي
          الخبرة لدينا في خدمتك لتزويدك بالمشورة القانونية الصحيحة بشأن المسائل القانونية التي تهمك. نحن نقيس نجاحنا من
          خلال نجاح عملائنا
        </p>


        <h2 className="text-2xl font-bold p-4">مجالات عمل المكتب</h2>
      </div>
      <div className=" text-center p-20">
        {/* grid  */}
        <div className="grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="p-4 shadow-2xl border rounded-lg border-gray-300">
              <h4>{service.title}</h4>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
