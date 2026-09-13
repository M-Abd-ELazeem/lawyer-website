import { CheckCircleIcon } from "@/shared/ui/icons";

const points = [
  "خبرة عميقة بالتشريعات الإماراتية ومحاكم أبوظبي.",
  "سرية تامة في التعامل مع ملفات الموكلين.",
  "متابعة شخصية من المستشار في كل مرحلة.",
  "حلول استراتيجية تختصر الوقت وتقلل المخاطر.",
];

export function WhyUs() {
  return (
    <section id="why-us" className=" w-full bg-dark-section py-16 px-6 lg:px-15 ">
      <div className="max-w-7xl mx-auto space-y-16 flex flex-col lg:flex-row gap-12 items-center px-6  lg:px-10">
        {/*right  */}
        <div className="w-full lg:flex-1 text-right space-y-4">
          {/* gold line */}
          <span className="gold-divider mb-6"></span>
          <h2 className="text-2xl lg:text-3xl font-bold text-c-white leading-tight">لماذا تختار مكتبنا؟</h2>
          <p className="text-c-foreground py-4">
            نلتزم بأعلى معايير المهنية والسرية التامة، ونعمل جنبًا إلى جنب مع موكلينا لفهم احتياجاتهم وصياغة حلول
            قانونية واقعية وفعّالة.
          </p>
          <ul className="text-c-foreground mt-4 space-y-4">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircleIcon className="size-5 text-gold mt-0.5 shrink-0" />
                <span className="text-foreground/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* left */}
        <div className="relative w-full lg:flex-1 text-right space-y-4  ">
          <div className="absolute -inset-4 bg-gradient-gold/30 blur-2xl rounded-3xl"></div>
          <blockquote className="relative rounded-2xl border border-gold bg-dark-secondary p-10 shadow-elegant">
            <div className="text-gold text-6xl leading-none font-display">”</div>
            <p className="mt-2 text-lg leading-loose text-c-foreground">
              العدالة ليست مجرد نص قانوني… بل التزام إنساني تجاه كل موكل، وثقة لا تُمنح إلا بعد جهد ومصداقية.
            </p>
            <footer className="mt-6 text-sm text-gold tracking-widest">— محمود حسن</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
