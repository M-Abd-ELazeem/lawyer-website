# دليل إعادة هيكلة المشروع

### فرع `refactor/project-structure` — شرح تفصيلي كامل

> **لمن هذا المستند؟** لأي مطوّر واجهات سيعمل على هذا المشروع بعد إعادة الهيكلة.
> **اقرأه بالكامل قبل كتابة أول سطر كود**، وخصوصاً القسم 9 (القواعد المفروضة) والقسم 18 (أين أضع الملف الجديد؟).
>
> 🇬🇧 English version: [`REFACTOR-GUIDE.md`](./REFACTOR-GUIDE.md)

---

## ملخص تنفيذي

| البند | القيمة |
| --- | --- |
| عدد الـ commits | 10 |
| الملفات المتغيّرة | 108 ملف |
| الأسطر المضافة / المحذوفة | +2,822 / −1,307 |
| عدد ملفات الكود الآن | 93 ملف `.ts` / `.tsx` |
| عدد الطبقات المعمارية | 6 |
| عدد الشرائح (slices) | 16 |
| أخطاء حقيقية أُصلحت | 10 |
| المسارات (routes) | 5 |

**أهم ثلاثة أشياء حدثت:**

1. **المشروع لم يكن يُبنى أصلاً.** الأمر `npm run build` كان يفشل على `main` بسبب ملف فارغ. هذا أول ما أُصلح.
2. **إعادة هيكلة كاملة** من مجلد `components/` مسطّح إلى معمارية **Feature-Sliced Design**، مع فرض قواعدها تلقائياً عبر ESLint.
3. **بناء طبقة بيانات** تجعل ربط أي CMS أو backend لاحقاً **تعديلاً في ملف واحد**، بصفر تغييرات في المكوّنات.

> الفرع لم يمسّ `main` إطلاقاً. كل شيء قابل للمراجعة والتراجع.

---

## جدول المحتويات

1. [الوضع قبل التغيير](#1-الوضع-قبل-التغيير)
2. [سجل الـ commits](#2-سجل-الـ-commits)
3. [ما هي Feature-Sliced Design؟](#3-ما-هي-feature-sliced-design)
4. [الطبقات الست بالتفصيل](#4-الطبقات-الست-بالتفصيل)
5. [لماذا `views` وليس `pages`؟](#5-لماذا-views-وليس-pages)
6. [الشرائح والقطاعات](#6-الشرائح-والقطاعات-slices--segments)
7. [جدول نقل الملفات الكامل](#7-جدول-نقل-الملفات-الكامل)
8. [شجرة الملفات الكاملة](#8-شجرة-الملفات-الكاملة)
9. [القواعد المفروضة تلقائياً](#9-القواعد-المفروضة-تلقائياً)
10. [طبقة البيانات و الـ API](#10-طبقة-البيانات-و-الـ-api)
11. [نظام الأيقونات](#11-نظام-الأيقونات)
12. [مكتبة الواجهة `shared/ui`](#12-مكتبة-الواجهة-sharedui)
13. [الكيانات `entities`](#13-الكيانات-entities)
14. [الميزات `features`](#14-الميزات-features)
15. [الـ `widgets`](#15-الـ-widgets)
16. [الـ `views` والمسارات](#16-الـ-views-والمسارات)
17. [الأخطاء التي أُصلحت](#17-الأخطاء-التي-أُصلحت)
18. [أين أضع الملف الجديد؟](#18-أين-أضع-الملف-الجديد)
19. [الأنماط والألوان](#19-الأنماط-والألوان)
20. [أوامر التشغيل](#20-أوامر-التشغيل)
21. [أمور خاصة بـ Next.js 16](#21-أمور-خاصة-بـ-nextjs-16)
22. [ما تبقى من عمل](#22-ما-تبقى-من-عمل)

---

## 1. الوضع قبل التغيير

### البنية القديمة

```
app/
  page.tsx          ← الصفحة الرئيسية
  layout.tsx        ← بلا metadata إطلاقاً
  globals.css
  articles/page.tsx ← ملف فارغ تماماً (0 بايت) — كان يكسر البناء
  services/page.js  ← ملف JavaScript في مشروع TypeScript
components/         ← 8 ملفات في مجلد واحد مسطّح
  Navbar.tsx        93 سطراً
  Footer.tsx        158 سطراً
  Hero.tsx          60 سطراً
  About.tsx         144 سطراً
  Services.tsx      176 سطراً
  WhyUs.tsx         111 سطراً
  CTA.tsx           34 سطراً
  ContactForm.tsx   377 سطراً  ← الأكبر والأكثر تشابكاً
  Articles.tsx      ملف فارغ، غير مستخدم
```

### المشكلة الأولى: المحتوى مدفون داخل المكوّنات

في `Services.tsx` كانت مصفوفة بطول 150 سطراً، **والأيقونة كانت JSX داخل البيانات نفسها**:

```tsx
const services = [
  {
    title: "القانون التجاري",
    desc: "تأسيس الشركات، العقود التجارية...",
    icon: (
      <svg xmlns="..." viewBox="0 0 24 24" ...>
        <path d="M10 12h4" />
        ...
      </svg>
    ),
  },
  // ... 5 خدمات أخرى بنفس الطريقة
];
```

**لماذا هذه مشكلة قاتلة؟**

لأن أي API في العالم يُرسل البيانات عبر **JSON**، و JSON لا يستطيع أن يحمل JSX. لو أردنا لاحقاً جلب الخدمات من لوحة تحكّم، سنضطر لإعادة كتابة المكوّن بالكامل، لأن شكل البيانات المحلية لا يشبه إطلاقاً شكل استجابة الـ API.

هذه النقطة تحديداً هي **السبب الرئيسي** الذي جعل إعادة الهيكلة ضرورية.

### المشكلة الثانية: تكرار بيانات التواصل

| البيانات | أين كانت مكرّرة |
| --- | --- |
| رقم الهاتف `+971 56 648 1670` | `CTA.tsx` و `ContactForm.tsx` و `Footer.tsx` |
| البريد `info@mahmoud-hassan.ae` | `ContactForm.tsx` و `Footer.tsx` |
| العنوان (مزيد مول) | `CTA.tsx` و `ContactForm.tsx` و `Footer.tsx` |
| ساعات العمل (3 أسطر) | `ContactForm.tsx` و `Footer.tsx` |

**ونتيجة التكرار حدثت فعلاً:** في `CTA.tsx` كُتب الرابط هكذا:

```
https://wa.me/+971 56 648 1670
```

فيه **مسافات** وعلامة **`+`** داخل رابط. هذا الرابط **لم يكن يعمل إطلاقاً** — وهو أهم زر تحويل في الموقع كله.

### المشكلة الثالثة: تكرار الـ SVG

| الأيقونة | التكرار | الموقع |
| --- | --- | --- |
| `circle-check` | 4 مرات **متطابقة حرفياً** | `WhyUs.tsx` |
| `clock` | 3 مرات متطابقة | `ContactForm.tsx` |
| `phone` | 3 مرات | `ContactForm.tsx` (مرتان) + `Footer.tsx` |
| `map-pin` | 3 مرات | `ContactForm.tsx` (مرتان) + `Footer.tsx` |
| `scale` (الشعار) | 3 مرات | `Navbar.tsx` + `Footer.tsx` + `Services.tsx` |
| `mail` | مرتان | `ContactForm.tsx` + `Footer.tsx` |

**المجموع: 27 عنصر `<svg>` مكتوب يدوياً**، كل واحد منها من 8 إلى 15 سطراً.

### المشكلة الرابعة: تكرار الأنماط

| النمط | عدد مرات النسخ |
| --- | --- |
| غلاف القسم `container bg-dark-* py-16 px-6 lg:px-16` | 5 أقسام، مع اختلافات طفيفة في كل مرة |
| العنوان مع الخط الذهبي | 4 أقسام |
| `btn-gold` | 4 مرات |
| `btn-light` | 3 مرات |
| زوج `label` + `input` بنفس الكلاسات الطويلة | 5 مرات داخل ملف واحد |

---

## 2. سجل الـ commits

الفرع مقسّم إلى 10 خطوات، **كل واحدة منها تُبنى بنجاح بشكل مستقل**:

| # | الـ commit | الوصف | الملفات | +/− |
| --- | --- | --- | --- | --- |
| 1 | `9794c7a` | إصلاح المسارات والروابط وروابط الواتساب المعطوبة | 12 | +51 / −33 |
| 2 | `ffd9fb5` | إضافة `config` و `types` و `utils` كمصدر وحيد للحقيقة | 20 | +352 / −165 |
| 3 | `1a00429` | استخراج الـ SVG إلى مجموعة أيقونات مع registry | 11 | +376 / −527 |
| 4 | `c3f2db1` | **إعادة الهيكلة إلى طبقات FSD** | 47 | +244 / −106 |
| 5 | `eb71901` | مكتبة الواجهة + طبقة الـ API + backend للنموذج | 48 | +1,256 / −404 |
| 6 | `a0f6ace` | بناء صفحات المقالات والخدمات من طبقة الـ API | 17 | +537 / −133 |
| 7 | `0666bf5` | إرجاع 404 حقيقي للمقالات غير الموجودة + تنظيم الأصول | 36 | +93 / −78 |
| 8 | `1ca64b4` | توثيق طبقة الـ API وخصوصيات Next 16 | 1 | +52 |
| 9 | `7fdb34f` | سدّ ثلاث ثغرات في الالتزام بـ FSD | 11 | +168 / −145 |
| 10 | `6f2cb5b` | تعطيل دمج المجلدات في VS Code | 1 | +7 |

**لاحظ الـ commit رقم 3:** حذف 527 سطراً وأضاف 376 — أي أن استخراج الأيقونات وحده **قلّص الكود بـ 151 سطراً**.

---

## 3. ما هي Feature-Sliced Design؟

منهجية لتنظيم مشاريع الواجهات، فكرتها أن تقسّم الكود إلى **طبقات** مرتّبة، وأن تسمح للاستيراد بأن يسير في **اتجاه واحد فقط**.

### الترتيب

```
app      ← الأعلى (التوجيه)
  ↓
views    ← الصفحات
  ↓
widgets  ← أقسام الصفحة
  ↓
features ← أفعال المستخدم
  ↓
entities ← كيانات مجال العمل
  ↓
shared   ← الأدنى (عام تماماً)
```

### القاعدة الذهبية

> **الطبقة تستورد فقط من الطبقات الأدنى منها. ولا تستورد أبداً من طبقة أعلى، ولا من شريحة أخرى في نفس طبقتها.**

### لماذا هذه القاعدة مهمة؟

لأنها تمنع **الاعتماد الدائري** (circular dependency) وتضمن أن كل قطعة كود لها مكان واحد منطقي.

مثال عملي: `entities/service` لا يعرف شيئاً عن الصفحة الرئيسية. لذلك تستطيع أن تستخدم الخدمات في عشر صفحات مختلفة دون أي تعديل. لو سمحنا للكيان أن يستورد من الصفحة، لأصبح مرتبطاً بها إلى الأبد.

**الفائدة العملية الحقيقية:** عندما يصلك طلب تعديل، تعرف فوراً أين تذهب:

| التعديل المطلوب | الملف الذي تفتحه |
| --- | --- |
| جلب الخدمات من لوحة التحكّم بدل البيانات المحلية | `entities/service/api/` فقط |
| تغيير الشبكة من 3 أعمدة إلى 4 | `widgets/services-grid/ui/` فقط |
| نقل قسم الخدمات فوق قسم «نبذة عني» | `views/home/` فقط |
| إضافة حقل «الميزانية» للنموذج | `features/consultation-request/` فقط |

---

## 4. الطبقات الست بالتفصيل

### `shared/` — الطبقة الأدنى

**التعريف:** كل ما هو عام ولا علاقة له بمكتب محاماة إطلاقاً. لو نسخت هذا المجلد إلى مشروع مطعم، لعمل كما هو دون أي تعديل.

**الاختبار:** هل يذكر هذا الملف كلمة «محامي» أو «استشارة» أو يستورد `siteConfig`؟ إن كانت الإجابة نعم، فهو **ليس** في `shared`.

```
shared/
  ui/            مكوّنات الواجهة العامة (Button, Card, Input...)
  ui/icons/      مجموعة الأيقونات + الـ registry
  lib/           cn.ts (دمج الكلاسات) — format.ts (تنسيق التاريخ)
  api/           client.ts (غلاف مُنمَّط حول fetch)
  config/        navigation.ts (روابط القوائم) — env.ts (متغيّرات البيئة)
```

> **استثناء مهم:** `shared` لا ينقسم إلى شرائح (slices) بل إلى **قطاعات (segments)** مباشرة. لذلك يُسمح باستيراد `@/shared/ui` و `@/shared/lib/cn` مباشرة، وهي مداخله المقصودة.

### `entities/` — «الأسماء» في مجال العمل

**التعريف:** الأشياء التي **توجد** في مجال عملنا. الكيان يعرف ثلاثة أشياء فقط:
1. **ما هو الشيء** (النوع / الـ type)
2. **من أين نجلبه** (دالة الجلب)
3. **كيف نعرض واحداً منه** (بطاقة واحدة)

الكيان **لا يعرف شيئاً** عن الصفحات ولا عن ترتيبها.

```
entities/
  office/     المكتب: الاسم، الهاتف، العنوان، ساعات العمل، الشعار
  service/    الخدمة القانونية
  article/    المقال القانوني
```

### `features/` — «الأفعال» التي يقوم بها المستخدم

**التعريف:** ما الذي **يستطيع المستخدم أن يفعله**؟

```
features/consultation-request/     ← طلب استشارة
```

**انتبه للتسمية جيداً:** المجلد اسمه `consultation-request` (طلب استشارة) وهو **فعل**، وليس `services` وهو **اسم**. الخدمات مجرّد مكوّن داخل النموذج (قائمة منسدلة)، أما الفعل نفسه فهو إرسال الطلب.

> **سؤال متوقع: لماذا يوجد feature واحد فقط؟**
> لأن الموقع تعريفي، ولا يحتوي فعلياً إلا على فعل واحد للمستخدم: إرسال طلب استشارة. **من الخطأ اختراع features إضافية لملء الفراغ.** الطبقة تستحق وجودها لأنها تجمع كل ما يخص النموذج — التحقق، الإرسال، بناء الرسالة — في مكان واحد بدل تشتيته داخل widget.

### `widgets/` — أقسام الصفحة

**التعريف:** قطعة كبيرة ومكتملة من الصفحة، تجمع بين entities و features. **وظيفتها الترتيب فقط.**

```
widgets/
  navbar           شريط التنقّل العلوي
  footer           التذييل
  hero             القسم الأول (الصورة الكبيرة)
  about            نبذة عني
  services-grid    شبكة الخدمات
  why-us           لماذا تختار مكتبنا
  cta-banner       شريط الدعوة للتواصل
  contact-section  قسم التواصل الكامل
```

**أوضح مثال** — `widgets/contact-section/ui/ContactSection.tsx`، انظر إلى استيراداته:

```tsx
import { ContactInfoCards, OfficeInfoPanel } from "@/entities/office";   // من الكيان
import { ConsultationForm } from "@/features/consultation-request";       // من الفعل
import { Container, Section, SectionHeading } from "@/shared/ui";         // من العام
```

الـ widget **لا يملك بيانات ولا منطقاً ولا حالة**. وظيفته الوحيدة أن يقرّر أن النموذج يأخذ 7 أعمدة ولوحة المكتب تأخذ 5 أعمدة. هذا كل شيء. لذلك حجمه 34 سطراً فقط، بعد أن كان الملف الأصلي 377 سطراً.

### `views/` — الصفحات

**التعريف:** تركيبة كاملة لمسار واحد. وظيفتها ترتيب الـ widgets وجلب البيانات مرة واحدة.

```
views/
  home/            /
  articles/        /articles
  article-detail/  /articles/[slug]
  services/        /services
```

مثال `views/home/ui/HomePage.tsx`:

```tsx
export async function HomePage() {
  // نجلب مرة واحدة هنا ونمرّرها للأسفل: شبكة الخدمات
  // وقائمة «نوع الاستشارة» في النموذج هما نفس القائمة.
  const services = await getServices();

  return (
    <main>
      <Hero />
      <About />
      <ServicesGrid services={services} />
      <WhyUs />
      <CtaBanner />
      <ContactSection services={services} />
    </main>
  );
}
```

### `app/` — التوجيه فقط

بعد إعادة الهيكلة، ملفات المسارات أصبحت **رفيعة جداً**، وظيفتها ربط المسار بالـ view ليس إلا:

```tsx
// app/page.tsx — 3 أسطر فقط
import { HomePage } from "@/views/home";

export default HomePage;
```

> **قاعدة إلزامية:** ملفات `page.tsx` و `layout.tsx` و `route.ts` و `error.tsx` **يجب** أن تصدّر `export default` لأن Next.js يشترط ذلك. في كل مكان آخر في المشروع نستخدم **named exports**.

---

## 5. لماذا `views` وليس `pages`؟

في توثيق FSD الرسمي، هذه الطبقة اسمها **`pages`**.

**لا يمكن استخدام هذا الاسم هنا إطلاقاً.**

السبب: أي مجلد اسمه `pages/` في جذر مشروع Next.js يُعتبر **Pages Router** (نظام التوجيه القديم). سيحاول Next أن يحوّل كل ملف بداخله إلى مسار فعلي، وسينكسر البناء لأن ملفاتنا ليست بالشكل الذي يتوقّعه.

لذلك استخدمنا **`views/`**، وهو الاسم المتعارف عليه في مجتمع FSD عند العمل مع Next.js. هذا هو **الانحراف الوحيد المقصود** عن المعيار، وهو انحراف ضروري لا اختياري.

---

## 6. الشرائح والقطاعات (Slices & Segments)

كل طبقة (ما عدا `shared`) تنقسم إلى **شرائح**، وكل شريحة تنقسم إلى **قطاعات**:

```
widgets/contact-section/      ← الشريحة (slice)
  ui/                         ← قطاع: المكوّنات
  model/                      ← قطاع: الأنواع والبيانات والحالة
  lib/                        ← قطاع: دوال مساعدة خاصة بهذه الشريحة
  api/                        ← قطاع: جلب البيانات
  index.ts                    ← الواجهة العامة (Public API)
```

### القطاعات الموجودة فعلياً في مشروعنا

| الشريحة | القطاعات |
| --- | --- |
| `entities/article` | `api` `model` `ui` |
| `entities/office` | `config` `lib` `model` `ui` |
| `entities/service` | `api` `model` |
| `features/consultation-request` | `api` `lib` `model` `ui` |
| `widgets/about` | `model` `ui` |
| `widgets/why-us` | `model` `ui` |
| باقي الـ widgets والـ views | `ui` فقط |

> **لماذا بعض الشرائح فيها `ui` فقط؟**
> لأن `widgets/hero` مثلاً لا يملك بيانات ولا حالة خاصة به. **القطاع يُضاف عندما يوجد ما نضعه فيه**، لا قبل ذلك. إنشاء مجلدات فارغة «للتناسق» مخالف لروح المنهجية.

### قاعدة الواجهة العامة — مهمة جداً

**استورد الشريحة من `index.ts` فقط.**

```tsx
import { Hero } from "@/widgets/hero";            // ✅ صحيح
import { Hero } from "@/widgets/hero/ui/Hero";    // ❌ خطأ — سيفشل الـ lint
```

**لماذا؟** لأنك عندما تستورد من الداخل تصبح مرتبطاً بالتفاصيل الداخلية للشريحة. لو أعاد أحد ترتيب الملفات داخلها لاحقاً، سينكسر كودك. الـ `index.ts` هو **العقد** الذي تتعامل معه، وما بداخل الشريحة حرّ في التغيّر.

---

## 7. جدول نقل الملفات الكامل

هذه خريطة كاملة لكل ملف انتقل من مكانه القديم إلى الجديد:

### المكوّنات

| المسار القديم | المسار الجديد |
| --- | --- |
| `components/Navbar.tsx` | `widgets/navbar/ui/Navbar.tsx` |
| `components/Footer.tsx` | `widgets/footer/ui/Footer.tsx` |
| `components/Hero.tsx` | `widgets/hero/ui/Hero.tsx` |
| `components/About.tsx` | `widgets/about/ui/About.tsx` |
| `components/Services.tsx` | `widgets/services-grid/ui/ServicesGrid.tsx` |
| `components/WhyUs.tsx` | `widgets/why-us/ui/WhyUs.tsx` |
| `components/CTA.tsx` | `widgets/cta-banner/ui/CtaBanner.tsx` |
| `components/ContactForm.tsx` | `widgets/contact-section/ui/ContactSection.tsx` |
| `components/Articles.tsx` | **حُذف** (كان فارغاً وغير مستخدم) |

### الأنواع والإعدادات

| المسار القديم | المسار الجديد |
| --- | --- |
| `config/site.ts` | `entities/office/config/site.ts` |
| `config/navigation.ts` | `shared/config/navigation.ts` |
| `types/service.ts` | `entities/service/model/types.ts` |
| `types/article.ts` | `entities/article/model/types.ts` |
| `types/content.ts` | `entities/office/model/types.ts` |
| `types/contact.ts` | `features/consultation-request/model/types.ts` |
| `types/icon.ts` | `shared/ui/icons/types.ts` |
| `types/index.ts` | **حُذف** (استُبدل بـ `index.ts` لكل شريحة) |

### الأدوات والأيقونات

| المسار القديم | المسار الجديد |
| --- | --- |
| `lib/utils/cn.ts` | `shared/lib/cn.ts` |
| `lib/utils/format.ts` | `shared/lib/format.ts` |
| `lib/utils/contact-links.ts` | `entities/office/lib/contact-links.ts` |
| `components/icons/index.tsx` | `shared/ui/icons/icons.tsx` |
| `components/icons/registry.ts` | `shared/ui/icons/registry.ts` |

### الصور

| المسار القديم | المسار الجديد |
| --- | --- |
| `public/hero-lawyer-CKDTvzYb.jpg` | `public/hero-lawyer.jpg` |
| `public/about-desk-9hQc1FT4.jpg` | `public/about-desk.jpg` |

> الاسمان القديمان كانا يحملان بصمة بناء (build hash) لا معنى لها. ومساراهما الآن مسجّلان في `siteConfig.images` بدل كتابتهما داخل المكوّنات.

### تغيير مهم في نوع التصدير

جميع المكوّنات تحوّلت من **default export** إلى **named export**:

```tsx
// قبل
export default function Navbar() { ... }
import Navbar from "@/components/Navbar";

// بعد
export function Navbar() { ... }
import { Navbar } from "@/widgets/navbar";
```

**السبب:** الـ default export أصبح محجوزاً حصرياً لملفات المسارات في `app/` التي يفرضها Next.js.

### دالة انتقلت لأنها كانت تكسر القاعدة

`buildConsultationMessage` كانت في `entities/office/lib/contact-links.ts`، لكنها تحتاج النوع `ConsultationRequest` الموجود في `features/`. وهذا **استيراد لأعلى** ممنوع.

نُقلت إلى `features/consultation-request/lib/build-message.ts`، وهو مكانها الصحيح لأنها تخصّ الفعل لا الكيان.

---

## 8. شجرة الملفات الكاملة

الأرقام على اليسار هي عدد الأسطر:

```
app/                                      ← التوجيه فقط
   3  page.tsx                            الصفحة الرئيسية → views/home
  45  layout.tsx                          الـ layout الجذري + metadata + الخط
 138  globals.css                         الأنماط العامة + @theme
   9  services/page.tsx                   → views/services
   9  articles/(list)/page.tsx            → views/articles
  22  articles/(list)/loading.tsx         هيكل تحميل المقالات
  33  articles/[slug]/page.tsx            صفحة المقال + generateStaticParams
  30  articles/error.tsx                  حدود الخطأ للمقالات
  66  api/contact/route.ts                استقبال نموذج التواصل

views/                                    ← الصفحات
  24  home/ui/HomePage.tsx
  29  articles/ui/ArticlesPage.tsx
  51  article-detail/ui/ArticleDetailPage.tsx
  38  services/ui/ServicesPage.tsx

widgets/                                  ← أقسام الصفحة
  54  navbar/ui/Navbar.tsx                (كان 93)
  66  footer/ui/Footer.tsx                (كان 158)
  59  hero/ui/Hero.tsx                    (كان 60)
  67  about/ui/About.tsx                  (كان 144)
  32  about/model/features.ts             ← المحتوى مفصول عن الواجهة
  36  services-grid/ui/ServicesGrid.tsx   (كان 176)
  39  why-us/ui/WhyUs.tsx                 (كان 111)
   7  why-us/model/points.ts              ← المحتوى مفصول
  36  cta-banner/ui/CtaBanner.tsx
  34  contact-section/ui/ContactSection.tsx  (كان 377)

features/consultation-request/            ← فعل المستخدم
 166  ui/ConsultationForm.tsx             النموذج
  39  model/schema.ts                     قواعد التحقق
  13  model/types.ts                      أنواع الطلب والنتيجة
  21  api/submit.ts                       الإرسال للسيرفر
  15  lib/build-message.ts                بناء رسالة الواتساب

entities/office/                          ← كيان المكتب
  49  config/site.ts                      كل بيانات المكتب
  22  lib/contact-links.ts                روابط tel / mailto / wa.me
  36  model/contact-channels.ts           قنوات التواصل الثلاث
  10  model/types.ts                      نوع Feature
  23  ui/Logo.tsx                         الشعار (كان مكرّراً مرتين)
  25  ui/OpeningHours.tsx                 ساعات العمل (كانت مكرّرة مرتين)
  29  ui/ContactInfoCards.tsx             بطاقات التواصل الثلاث
  50  ui/OfficeInfoPanel.tsx              لوحة العنوان والساعات

entities/service/                         ← كيان الخدمة
   9  model/types.ts                      نوع Service
  47  model/services.ts                   البيانات المحلية (6 خدمات)
  35  api/get-services.ts                 ← نقطة ربط الـ API

entities/article/                         ← كيان المقال
  12  model/types.ts                      نوع Article
  46  model/articles.ts                   3 مقالات تجريبية
  56  api/get-articles.ts                 ← نقطة ربط الـ API
  30  ui/ArticleCard.tsx                  بطاقة مقال واحد

shared/                                   ← العام
  52  api/client.ts                       غلاف fetch مُنمَّط
  18  config/env.ts                       متغيّرات البيئة
  26  config/navigation.ts                روابط القوائم
   4  lib/cn.ts                           دمج الكلاسات
  15  lib/format.ts                       تنسيق التاريخ
 193  ui/icons/icons.tsx                  17 أيقونة
  52  ui/icons/registry.ts                خريطة المفتاح ← المكوّن
  25  ui/icons/types.ts                   نوع IconKey
  29  ui/index.ts                         الواجهة العامة للمكتبة
       ui/*.tsx                           26 مكوّناً (تفصيلها في القسم 12)
```

**الإجمالي: 93 ملف كود.**

---

## 9. القواعد المفروضة تلقائياً

**هذا أهم قسم عملياً في المستند كله.**

ملف `eslint.config.mjs` يمنع **ثلاث مخالفات**، وأي واحدة منها **تُفشل** `npm run lint`:

### المخالفة 1: الاستيراد لأعلى

```ts
// داخل ملف في entities/
import { Navbar } from "@/widgets/navbar";   // ❌
```

```
FSD: "entities" may only import from layers below it.
"app", "views", "widgets", "features" are above it
```

### المخالفة 2: الاستيراد الجانبي (بين شرائح نفس الطبقة)

```ts
// داخل entities/office/
import type { Service } from "@/entities/service";   // ❌
```

```
FSD: "entities" slices must not import each other.
Move the shared code down a layer.
```

### المخالفة 3: الاستيراد العميق (تجاوز الواجهة العامة)

```ts
import { Hero } from "@/widgets/hero/ui/Hero";   // ❌
```

```
FSD: import a slice through its index.ts, not its internals.
Use "@/widgets/hero", not "@/widgets/hero/ui/Hero".
```

### جرّبها بنفسك

هذه ليست نظرية. افتح أي ملف في `entities/` وأضف سطراً مخالفاً، ثم شغّل `npm run lint` وسترى الخطأ فوراً. القواعد الثلاث **مُختبرة فعلياً**.

### ماذا أفعل لو منعني الـ lint؟

**لا تعطّل القاعدة، ولا تضف `eslint-disable`.** المنع يعني أن الكود في المكان الخطأ.

الحل في 90% من الحالات: **انقل الكود المشترك إلى طبقة أدنى**.

مثال واقعي حدث فعلاً في هذا الفرع: دالة `buildConsultationMessage` كانت في `entities/office` وتحتاج نوعاً من `features`. الحل لم يكن تعطيل القاعدة، بل نقل الدالة إلى `features` حيث تنتمي منطقياً.

### ⚠️ تنبيه فني لمن سيعدّل `eslint.config.mjs`

القواعد الثلاث موضوعة كلها داخل **مدخل واحد** من `no-restricted-imports` لكل طبقة، وهذا **مقصود وضروري**.

في الـ flat config الخاص بـ ESLint، البلوك المتأخّر **يستبدل** خيارات القاعدة ولا يدمجها. لو فصلتها إلى بلوكين منفصلين، **سيُلغى الأول بصمت** — سيمر الـ lint بنجاح وستظن أن كل شيء سليم، بينما القاعدة معطّلة تماماً.

هذا حدث فعلاً أثناء العمل واكتُشف بالاختبار فقط.

---

## 10. طبقة البيانات و الـ API

هذا هو **الهدف الأساسي** من إعادة الهيكلة كلها.

### المبدأ

كل دالة جلب بيانات موجودة في قطاع `api/` داخل الكيان، وتُرجع **نموذج المجال**:

```ts
// entities/service/api/get-services.ts

export async function getServices(): Promise<Service[]> {
  if (!hasApi) return seedServices;          // بيانات محلية ما دام API_BASE_URL فارغاً

  const dto = await apiGet<ServiceDto[]>("/services", {
    revalidate: 3600,                         // إعادة التحقق كل ساعة
    tags: ["services"],                       // وسم للإبطال عند الطلب
  });
  return dto.map(toService);                  // تحويل DTO ← نموذج المجال
}

// شكل البيانات القادم من الـ backend — منفصل عن نموذج المجال
type ServiceDto = { id: string; title: string; description: string; icon: string };

function toService(dto: ServiceDto): Service {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    icon: (dto.icon as Service["icon"]) ?? "scale",   // أيقونة احتياطية بدل الانهيار
  };
}
```

### لماذا نفصل `ServiceDto` عن `Service`؟

لأن شكل البيانات في الـ backend قد يتغيّر أو يكون مختلفاً عمّا تحتاجه الواجهة. دالة `toService` هي **الحاجز** بينهما. لو غيّر الـ backend اسم حقل، تعدّل `toService` فقط، ولا يتأثّر أي مكوّن.

### القاعدة الذهبية للبيانات

> **المكوّنات تستدعي `getServices()` ولا تلمس `seedServices` أبداً.**

لذلك عند وصول الـ CMS، التعديل يكون في **هذا الملف فقط**، وصفر تعديلات في المكوّنات.

### جدول الربط

| ما تريد ربطه | الملف / المتغيّر |
| --- | --- |
| محتوى الخدمات من CMS | `entities/service/api/get-services.ts` |
| المقالات من CMS | `entities/article/api/get-articles.ts` |
| استقبال نموذج التواصل | `CONTACT_WEBHOOK_URL` في `.env.local` |
| عنوان الـ backend | `API_BASE_URL` في `.env.local` |

### `shared/api/client.ts`

غلاف بسيط ومُنمَّط حول `fetch`:

- يبني الرابط الكامل من `API_BASE_URL`
- يحوّل أي استجابة غير ناجحة إلى `ApiError` فيها `status` و `url`
- يُرجع JSON مُنمَّطاً — المستدعي لا يرى كائن `Response` إطلاقاً
- يمرّر خيارات التخزين المؤقت لكل نداء على حدة

> **مهم:** في Next.js 16، `fetch` **لم يعد مخزّناً افتراضياً**. لذلك التخزين اختياري ويُحدَّد لكل نداء عبر `revalidate` و `tags`.

### التعامل مع الأخطاء

- `getArticle(slug)` تُرجع **`null`** إن لم يوجد المقال، ولا ترمي خطأ. الصفحة تحوّل ذلك إلى **404** عبر `notFound()`.
- `getArticles()` ترمي الخطأ فعلياً، ويلتقطه `app/articles/error.tsx` ويعرض `ErrorState` مع زر إعادة المحاولة.

### التفعيل

الملفات تعمل الآن ببيانات محلية لأن `API_BASE_URL` غير معرّف. بمجرد وضعه في `.env.local` يبدأ النظام بالجلب الفعلي. انظر `.env.example`.

---

## 11. نظام الأيقونات

### المشكلة التي يحلّها

كانت الأيقونة تُخزَّن كـ JSX داخل مصفوفة البيانات. وهذا يستحيل أن يأتي من API.

### الحل: مفتاح نصّي + registry

**الخطوة 1** — المحتوى يخزّن الأيقونة كنص:

```ts
{ id: "commercial", title: "القانون التجاري", icon: "building" }
```

**الخطوة 2** — النوع `IconKey` يحدّد المفاتيح المسموحة:

```ts
export type IconKey = "scale" | "building" | "house" | "users" | "file-text" | ...
```

**الخطوة 3** — الـ registry يحوّل المفتاح إلى مكوّن:

```tsx
export const iconRegistry: Record<IconKey, ComponentType<IconProps>> = {
  scale: ScaleIcon,
  building: BuildingIcon,
  // ...
};
```

**الخطوة 4** — المكوّن يستخدمه:

```tsx
const Icon = iconRegistry[service.icon];
<Icon className="size-6" />
```

### لماذا هذا مهم جداً؟

**هذا بالضبط ما يجعل الـ API ممكناً.** الـ JSON يستطيع أن يرسل `"icon": "building"`، ولا يستطيع أبداً أن يرسل `<svg>`.

### أمان إضافي

الـ registry مكتوب كـ **`Record<IconKey, ...>` كامل**. أي أنك لو أضفت مفتاحاً جديداً إلى `IconKey` ونسيت تسجيل مكوّنه، **سيفشل البناء فوراً** بدل أن تظهر مساحة فارغة في الصفحة دون أن يلاحظ أحد.

### الأيقونات المتاحة (17)

| المفتاح | المكوّن | الاستخدام |
| --- | --- | --- |
| `scale` | `ScaleIcon` | الشعار + الاستشارات العامة |
| `building` | `BuildingIcon` | القانون التجاري |
| `house` | `HouseIcon` | القانون العقاري |
| `users` | `UsersIcon` | الأحوال الشخصية |
| `file-text` | `FileTextIcon` | صياغة العقود |
| `gavel` | `GavelIcon` | التقاضي والتحكيم |
| `phone` | `PhoneIcon` | الهاتف |
| `mail` | `MailIcon` | البريد |
| `map-pin` | `MapPinIcon` | العنوان |
| `clock` | `ClockIcon` | ساعات العمل |
| `whatsapp` | `WhatsappIcon` | واتساب |
| `send` | `SendIcon` | زر الإرسال |
| `check-circle` | `CheckCircleIcon` | نقاط «لماذا تختار مكتبنا» |
| `user-check` | `UserCheckIcon` | اعتماد قانوني |
| `briefcase` | `BriefcaseIcon` | خبرة عملية |
| `book-open` | `BookOpenIcon` | خلفية أكاديمية |
| `languages` | `LanguagesIcon` | ثنائي اللغة |

### البنية الداخلية

جميع الأيقونات تشترك في مكوّن أساسي `SvgIcon` يوحّد الـ `viewBox` و `stroke` و `currentColor`. لذلك:

- **اللون** يأتي من `className` مثل `text-gold`
- **الحجم** يأتي من `className` مثل `size-5`
- جميعها `aria-hidden="true"` لأنها زخرفية وبجانبها نص مقروء

### كيف أضيف أيقونة جديدة؟

1. أضف المكوّن في `shared/ui/icons/icons.tsx`
2. أضف المفتاح إلى `IconKey` في `shared/ui/icons/types.ts`
3. سجّلها في `registry.ts` — **وإن نسيت، سيفشل البناء ويذكّرك**

---

## 12. مكتبة الواجهة `shared/ui`

**مبدأ البناء:** كل مكوّن هنا بُني من شيء كان **مكرّراً فعلاً** في الكود، لا من تخمين لما قد نحتاجه.

### المكوّنات الأساسية

| المكوّن | الخصائص (props) | ماذا استبدل |
| --- | --- | --- |
| `Section` | `id` `tone` `className` | غلاف القسم المكرّر في **5** أقسام |
| `Container` | `className` | العمود الداخلي `max-w-7xl mx-auto` |
| `Button` | `variant` + خصائص `<button>` | `btn-gold` / `btn-light` |
| `ButtonLink` | `href` `variant` | روابط داخلية عبر `next/link` |
| `ButtonExternalLink` | `href` `variant` | روابط خارجية (يضيف `noopener` تلقائياً) |
| `Card` | `className` | كلاس `.card` في **3** أماكن |
| `IconBox` | `className` | المربّع الملوّن حول الأيقونة |
| `Divider` | `variant: "gold" \| "rule"` | الخط الذهبي و `<hr>` |
| `SectionHeading` | `eyebrow` `title` `subtitle` `align` | كتلة العنوان المكرّرة في **4** أقسام |
| `PageHeader` | `title` `subtitle` | عنوان الصفحات الداخلية |
| `Breadcrumbs` | `items: Crumb[]` | مسار التنقّل في صفحة المقال |

#### ملاحظة على `Section`

```tsx
<Section id="about" tone="dark">        {/* الخلفية الأساسية */}
<Section id="services" tone="secondary"> {/* الخلفية المتناوبة */}
```

خاصية `id` هنا ليست تفصيلاً — هي التي **أصلحت روابط التنقّل** التي كانت معطوبة، لأن الأقسام لم يكن لها `id` أصلاً.

#### لماذا ثلاثة مكوّنات للأزرار بدل واحد؟

لأن خصائص `<button>` و `<a>` و `<Link>` **مختلفة فعلاً**. توحيدها في مكوّن واحد بخاصية `as` يكلّف تعقيداً كبيراً في الأنواع أكثر بكثير مما يوفّره في موضع الاستخدام.

### مكوّنات النماذج `shared/ui/form/`

| المكوّن | الوظيفة |
| --- | --- |
| `Field` | يجمع `Label` + الحقل + رسالة الخطأ — **استبدل تكراراً خماسياً** |
| `Input` | حقل نصّي، يقبل `invalid` ويضبط `aria-invalid` |
| `Textarea` | حقل متعدّد الأسطر |
| `Select` | قائمة منسدلة |
| `Label` | تسمية الحقل |
| `FormError` | رسالة خطأ مع `role="alert"` |
| `SubmitButton` | زر إرسال مع `Spinner` ومنع الضغط المزدوج |

كل حقول الإدخال تشترك في `control-styles.ts` حتى **لا تنحرف أنماطها عن بعضها** مع الوقت.

### مكوّنات الحالة `shared/ui/feedback/`

هذه أصبحت ضرورية بمجرّد وجود API — لأن البيانات صارت قد تكون «قيد التحميل» أو «فارغة» أو «فشلت»:

| المكوّن | متى يُستخدم |
| --- | --- |
| `Spinner` | أثناء إرسال النموذج |
| `Skeleton` | هيكل التحميل في `loading.tsx` |
| `Alert` | رسائل النجاح والفشل — `tone: "success" \| "error"` |
| `EmptyState` | لا توجد مقالات |
| `ErrorState` | فشل الجلب، مع زر إعادة المحاولة |

> **قرار مقصود:** `Alert` مكوّن **داخل الصفحة** وليس نظام toast. المستخدم الوحيد له هو رسالة نتيجة النموذج، ويجب أن تظهر **بجانب النموذج** لا في زاوية الشاشة. بناء نظام toast كامل لموضع استخدام واحد تعقيد بلا مقابل.

### مكوّنات المحتوى `shared/ui/content/`

| المكوّن | الوظيفة |
| --- | --- |
| `Badge` | وسوم المقالات |
| `Prose` | تنسيق النصوص الطويلة (محتوى المقال) |
| `Pagination` | ترقيم الصفحات |

#### ⚠️ تحذير أمني مهم بخصوص `Prose`

`Prose` يستقبل **عناصر React جاهزة**، ولا يستقبل نص HTML خام.

لو أرجع الـ CMS لاحقاً محتوى HTML، **يجب تنظيفه (sanitize) على السيرفر** قبل عرضه. تمرير HTML غير موثوق مباشرة إلى `dangerouslySetInnerHTML` في موقع عام هو **ثغرة XSS مخزّنة**. استخدم مكتبة مثل `isomorphic-dompurify`.

### طريقة الاستيراد

```tsx
import { Section, Container, Button, Card } from "@/shared/ui";
```

كل شيء يُصدَّر من `shared/ui/index.ts`.

---

## 13. الكيانات `entities`

### `entities/office` — المكتب

**الملف الأهم:** `config/site.ts` — كل بيانات المكتب في مكان واحد:

```ts
export const siteConfig = {
  name: "محمود حسن",
  title: "مستشار قانوني",
  legalName: "مكتب المستشار محمود حسن للاستشارات القانونية",
  description: "...",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mahmoud-hassan.ae",
  locale: "ar_AE",

  phone: {
    display: "+971 56 648 1670",   // للعرض للبشر — فيه مسافات
    raw: "971566481670",           // للروابط — أرقام فقط
  },

  email: "info@mahmoud-hassan.ae",
  address: { short, full, mapsUrl },
  hours: [ { days, time }, ... ],
  images: { hero, about },
  stats: [ { value, label }, ... ],
} as const;
```

#### ⚠️ لماذا `phone.display` و `phone.raw` منفصلان؟

**هذه النقطة سببت الخطأ الأصلي.** الصيغة المعروضة فيها مسافات لتكون مقروءة، والصيغة الخام أرقام فقط لأن `tel:` و `wa.me` يشترطان ذلك.

عندما دُمجا في قيمة واحدة، نتج الرابط المعطوب `https://wa.me/+971 56 648 1670`.

> **لا تدمجهما مهما بدا ذلك مغرياً.**

**باقي ملفات الكيان:**

| الملف | الوظيفة |
| --- | --- |
| `lib/contact-links.ts` | **المكان الوحيد** الذي يبني روابط `wa.me` و `tel:` و `mailto:` |
| `model/contact-channels.ts` | قنوات التواصل الثلاث كبيانات |
| `ui/Logo.tsx` | الشعار — كان مكرّراً في `Navbar` و `Footer` |
| `ui/OpeningHours.tsx` | ساعات العمل — كانت مكرّرة في `Footer` و لوحة التواصل |
| `ui/ContactInfoCards.tsx` | البطاقات الثلاث |
| `ui/OfficeInfoPanel.tsx` | لوحة العنوان والساعات والتواصل |

#### دالة `buildWhatsAppUrl`

```ts
export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.phone.raw}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
```

تستخدم `phone.raw` دائماً، وتُشفّر الرسالة دائماً. **جميع روابط الواتساب في الموقع تمرّ من هنا** — لا تبنِ رابطاً يدوياً في أي مكان آخر.

### `entities/service` — الخدمة

| الملف | الوظيفة |
| --- | --- |
| `model/types.ts` | `Service = { id, title, description, icon }` |
| `model/services.ts` | 6 خدمات كبيانات محلية |
| `api/get-services.ts` | `getServices()` — **نقطة ربط الـ API** |

### `entities/article` — المقال

| الملف | الوظيفة |
| --- | --- |
| `model/types.ts` | `Article = { slug, title, excerpt, publishedAt, tags, coverImage?, body? }` |
| `model/articles.ts` | 3 مقالات تجريبية |
| `api/get-articles.ts` | `getArticles()` و `getArticle(slug)` |
| `ui/ArticleCard.tsx` | بطاقة مقال واحد |

> لاحظ أن `body` اختياري — يُملأ في صفحة التفاصيل فقط، ولا داعي لجلبه في القائمة.

---

## 14. الميزات `features`

### `features/consultation-request` — طلب استشارة

هذه الشريحة تملك **كل ما يخصّ إرسال طلب استشارة**:

```
ui/ConsultationForm.tsx     النموذج (مكوّن client)
model/schema.ts             قواعد التحقق
model/types.ts              ConsultationRequest و ContactResult
api/submit.ts               الإرسال إلى /api/contact
lib/build-message.ts        بناء رسالة الواتساب
```

### قواعد التحقق بالتفصيل

`model/schema.ts` — **بلا أي مكتبة خارجية**:

| الحقل | القاعدة | رسالة الخطأ |
| --- | --- | --- |
| `name` | حرفان على الأقل | «يرجى إدخال الاسم الكامل.» |
| `phone` | مطلوب + نمط دولي | «رقم الهاتف غير صالح.» |
| `email` | اختياري، لكن إن وُجد فبنمط صحيح | «البريد الإلكتروني غير صالح.» |
| `consultationType` | مطلوب | «يرجى اختيار نوع الاستشارة.» |
| `details` | 10 أحرف على الأقل | «يرجى إضافة تفاصيل كافية...» |

#### النقطة الأهم في التحقق

> **نفس ملف التحقق يُستخدم في المتصفح وفي السيرفر معاً.**

```ts
// في المتصفح — features/consultation-request/ui/ConsultationForm.tsx
const nextErrors = validateConsultationRequest(values);

// في السيرفر — app/api/contact/route.ts
const fieldErrors = validateConsultationRequest(payload);
```

لذلك **يستحيل** أن يختلف المتصفح والسيرفر حول ما هو صالح. ولا يمكن لأحد أن يتجاوز التحقق بإرسال طلب مباشر إلى الـ API.

### حالات النموذج

```
idle  →  submitting  →  success
                    ↘  error
```

- `idle` — الحالة الأولى
- `submitting` — الزر معطّل ويعرض `Spinner`، ومنع الضغط المزدوج
- `success` — `Alert` أخضر + تفريغ النموذج
- `error` — `Alert` أحمر + رسائل خطأ تحت كل حقل

كما أن خطأ أي حقل **يُمسح فور أن يبدأ المستخدم بتعديله**، بدل أن يبقى ظاهراً بشكل مزعج.

### تحسين مهم: القائمة المنسدلة

كان حقل «نوع الاستشارة» حقلاً نصّياً حرّاً، أي أن **أي نص** كان يصل إلى الـ backend.

أصبح الآن `<select>` مبنيّاً من `getServices()` نفسها، فالقيم الواصلة نظيفة ومضبوطة دائماً.

### الواتساب كخيار ثانوي

الزر الأساسي يرسل إلى الـ API. وبقي زر ثانٍ للواتساب **عمداً**، حتى لا تضيع طلبات العملاء لو تعطّل الـ backend. هذا أهم مسار تحويل في الموقع.

---

## 15. الـ `widgets`

| الـ widget | الوظيفة | الأسطر (قبل ← بعد) |
| --- | --- | --- |
| `navbar` | شريط التنقّل + قائمة الجوال | 93 ← 54 |
| `footer` | التذييل بأربعة أعمدة | 158 ← 66 |
| `hero` | القسم الأول بالصورة الخلفية | 60 ← 59 |
| `about` | نبذة عني + 4 بطاقات مزايا | 144 ← 67 + 32 |
| `services-grid` | شبكة الخدمات الست | 176 ← 36 |
| `why-us` | لماذا تختار مكتبنا + اقتباس | 111 ← 39 + 7 |
| `cta-banner` | شريط الدعوة للتواصل | 34 ← 36 |
| `contact-section` | قسم التواصل الكامل | **377 ← 34** |

### تفكيك `contact-section`

الملف الأصلي (377 سطراً) كان يخلط أربعة أشياء. فُكّك إلى:

| الجزء | مكانه الجديد | لماذا |
| --- | --- | --- |
| النموذج | `features/consultation-request/ui/` | لأنه **فعل** للمستخدم |
| البطاقات الثلاث | `entities/office/ui/ContactInfoCards` | لأنها بيانات **المكتب** |
| لوحة العنوان والساعات | `entities/office/ui/OfficeInfoPanel` | نفس السبب |
| الترتيب والتخطيط | `widgets/contact-section` (34 سطراً) | هذا كل ما يبقى للـ widget |

### فصل المحتوى عن الواجهة

`widgets/about` و `widgets/why-us` لديهما قطاع `model/`:

```ts
// widgets/about/model/features.ts
export const aboutFeatures: Feature[] = [
  { id: "licensed", title: "اعتماد قانوني", description: "...", icon: "user-check" },
  // ...
];
```

المكوّن يستوردها ولا يعرّفها بداخله. **هذا يجعل المحتوى جاهزاً للانتقال إلى CMS** دون لمس الواجهة.

---

## 16. الـ `views` والمسارات

| المسار | الـ view | النوع في البناء |
| --- | --- | --- |
| `/` | `views/home` | ثابت (Static) |
| `/services` | `views/services` | ثابت |
| `/articles` | `views/articles` | ثابت |
| `/articles/[slug]` | `views/article-detail` | **SSG** — 3 صفحات مُولّدة مسبقاً |
| `/api/contact` | — | ديناميكي (Dynamic) |

### مخرجات البناء الفعلية

```
┌ ○ /
├ ○ /_not-found
├ ƒ /api/contact
├ ○ /articles
├ ● /articles/[slug]
│ ├ /articles/commercial-contracts-uae
│ ├ /articles/tenancy-disputes-abu-dhabi
│ └ /articles/inheritance-law-basics
└ ○ /services
```

### `generateStaticParams`

```tsx
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}
```

تجعل Next يبني كل مقال معروف مسبقاً وقت البناء، فتُقدَّم كصفحات ثابتة سريعة.

### `generateMetadata`

كل مقال يحصل على `<title>` و `description` و Open Graph خاصّة به، مبنيّة من بياناته:

```tsx
export async function generateMetadata({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;      // ← لاحظ await
  const article = await getArticle(slug);
  if (!article) return { title: "المقال غير موجود" };
  return { title: article.title, description: article.excerpt, openGraph: { ... } };
}
```

---

## 17. الأخطاء التي أُصلحت

**كل الأخطاء التالية كانت موجودة فعلاً في `main`**، ولم تُخترع لتبرير إعادة الهيكلة.

### 1. البناء كان يفشل تماماً 🔴

```
Type error: File 'app/articles/page.tsx' is not a module.
```

الملف كان **فارغاً (0 بايت)**، وبلا `export default`. Next يشترط default export من ملفات `page.tsx`.

**النتيجة:** `npm run build` كان يفشل على `main`. لم يكن المشروع قابلاً للنشر إطلاقاً.

### 2. رابط الواتساب في `CTA` معطوب 🔴

```tsx
href="https://wa.me/+971 56 648 1670"   // مسافات و + داخل رابط
```

لم يكن يعمل. وهو **أهم زر تحويل في الموقع**.

### 3. رسالة الواتساب غير مشفّرة 🔴

```tsx
const message = `*طلب استشارة جديد*%0A%0A` + `*الاسم الكامل:* ${formData.name}%0A` + ...;
const url = `https://wa.me/${number}?text=${message}`;   // بلا تشفير
```

مشكلتان معاً: `%0A` مكتوبة كنص، والنص العربي والمسافات وعلامات `*` **لم تُشفَّر إطلاقاً**.

**الإصلاح** — لاحظ أن التعديلين **يجب** أن يحدثا معاً:

```ts
const message = [ "*طلب استشارة جديد*", "", `*الاسم الكامل:* ${request.name}`, ... ].join("\n");
const url = `https://wa.me/${raw}?text=${encodeURIComponent(message)}`;
```

> **لماذا معاً؟** لو شفّرت نصاً يحتوي `%0A` حرفياً، ستحصل على `%250A` وتزداد المشكلة سوءاً.

**التحقق الفعلي** — الرابط الناتج يُفكّ إلى:

```
*طلب استشارة جديد*

*الاسم الكامل:* 
*رقم الهاتف:* 
*البريد الإلكتروني:* غير محدد
*نوع الاستشارة:* 
*تفاصيل القضية:*
```

نص عربي مقروء بأسطر حقيقية. ✅

### 4. روابط تؤدي إلى 404

`Navbar` كان يشير إلى `/about` و `/contact` — **وهما غير موجودين أصلاً**.

`Footer` كان يشير إلى `#about` و `#services` — **والأقسام لم يكن لها `id`**.

**الإصلاح:** كل الروابط أصبحت `/#about` بالصيغة الكاملة. **السبب:** `Navbar` و `Footer` موجودان في الـ layout الجذري ويظهران في **كل** الصفحات. لو كتبت `#about` وأنت في `/articles`، لن يحدث شيء. الصيغة `/#about` تنقلك للرئيسية ثم تنزل للقسم.

### 5. أزرار لا تعمل

- زرّا الـ Hero كانا `<a>` **بلا `href`** — غير قابلين للنقر ولا للوصول بلوحة المفاتيح
- زر «احجز استشارتك» في `Navbar` كان `<button>` **بلا أي وظيفة**

### 6. صورة الـ Hero في موضع خاطئ

```tsx
<section className="container ...">        {/* بلا relative */}
  <Image className="absolute inset-0" />   {/* تُحسب على عنصر خاطئ */}
```

`absolute` تحتاج أباً فيه `relative`. أُضيفت.

### 7. ثلاثة `<h1>` في صفحة واحدة

Hero كان فيه **عنوانان `<h1>`**، و `WhyUs` عنوان ثالث. هذا سيئ لمحرّكات البحث ولقارئات الشاشة.

**الإصلاح:** `<h1>` واحد في Hero مع `<span>` للسطر الثاني (المظهر لم يتغيّر)، و `WhyUs` تحوّل إلى `<h2>`.

### 8. قائمة الجوال لا تُغلق

بعد الضغط على أي رابط، كانت القائمة تبقى مفتوحة فوق المحتوى. أُضيف `onClick={close}`، مع `aria-expanded` و `aria-label` لزر القائمة.

### 9. كلاس غير موجود

```tsx
<span className="block h-0.2 w-8 ..." />   // h-0.2 ليس كلاساً في Tailwind
```

لم يكن يفعل شيئاً. أصبح `h-0.5`.

### 10. صفحة 404 وهمية (soft 404) 🔴

`/articles/أي-شيء-غير-موجود` كان يُرجع **`200 OK`** بدل `404`.

**النتيجة:** محرّكات البحث كانت ستفهرس صفحات غير موجودة كصفحات صالحة.

#### شرح السبب (مهم للفهم)

عندما يبدأ Next بالـ **streaming** — أي بعد أن يُعرض أول `Suspense` مثل `loading.tsx` — تكون الـ **headers قد أُرسلت بالفعل**، ولا يمكن تغيير الـ status code بعدها. لذلك `notFound()` لا يستطيع سوى وضع `noindex`.

والمشكلة أن `app/articles/loading.tsx` كان ينطبق على **القسم كله** بما فيه `[slug]`.

#### الإصلاح

نُقلت القائمة و `loading.tsx` إلى **route group** باسم `(list)`:

```
app/articles/
  (list)/page.tsx       ← القائمة
  (list)/loading.tsx    ← الهيكل — لم يعد يغلّف [slug]
  [slug]/page.tsx       ← خارج المجموعة
  error.tsx             ← يغطّي الاثنين
```

> الأقواس `( )` تعني أن اسم المجلد **لا يظهر في الرابط**. المسار يبقى `/articles`.

**النتيجة بعد الإصلاح:**

| المسار | قبل | بعد |
| --- | --- | --- |
| `/articles/not-real` | `200` ❌ | `404` ✅ |
| `/articles/commercial-contracts-uae` | `200` | `200` ✅ |
| `/articles` | `200` | `200` ✅ |

**درس للمستقبل:** انتبه جيداً قبل إضافة `loading.tsx` إلى قسم له أبناء ديناميكيون.

### 11. وسم `robots` متعارض

كان الـ layout يُصدر `robots: { index: true, follow: true }`، وصفحات 404 تُصدر `noindex` من Next. النتيجة **وسمان متناقضان** في نفس الصفحة.

حُذف الوسم من الـ layout لأنه يكرّر السلوك الافتراضي أصلاً.

### نتائج الاختبار النهائي على سيرفر إنتاج حقيقي

| الاختبار | النتيجة |
| --- | --- |
| `/` و `/articles` و `/services` | `200` ✅ |
| المقالات الثلاثة | `200` ✅ |
| مسار غير موجود | `404` ✅ |
| مقال غير موجود | `404` ✅ |
| `POST /api/contact` ببيانات صحيحة | `200 {"ok":true}` ✅ |
| `POST` ببيانات ناقصة | `422` + خطأ لكل حقل بالعربية ✅ |
| `POST` بـ body تالف | `400` ✅ |
| `GET /api/contact` | `405` ✅ |
| عدد `<h1>` في الرئيسية | `1` ✅ |
| عدد الأيقونات المعروضة | `29` ✅ |
| اتجاه الصفحة | `lang="ar" dir="rtl"` ✅ |

---

## 18. أين أضع الملف الجديد؟

**السؤال العملي الأهم.** اسأل نفسك بالترتيب:

### 1️⃣ هل هو عام تماماً ولا علاقة له بمكتب محاماة؟
مثل: زر، مودال، tooltip، دالة تنسيق
→ **`shared/`**

### 2️⃣ هل هو «شيء» موجود في مجال العمل؟
مثل: شهادة عميل، محامٍ، قضية
→ **`entities/<الاسم>/`**

### 3️⃣ هل هو «فعل» يقوم به المستخدم؟
مثل: اشتراك في نشرة، حجز موعد، تحميل ملف
→ **`features/<الفعل>/`**

### 4️⃣ هل هو قسم كامل من صفحة يجمع عدة أشياء؟
→ **`widgets/<القسم>/`**

### 5️⃣ هل هو صفحة كاملة؟
→ **`views/<الصفحة>/`** + ملف رفيع في `app/`

---

### القاعدة التي تحسم الحالات الصعبة

عندما تتردّد بين **entity** و **widget**، اسأل:

> **هل يعرض عنصراً واحداً، أم مجموعة مرتّبة على صفحة؟**

| المكوّن | الطبقة |
| --- | --- |
| بطاقة مقال واحد | **entity** → `entities/article/ui/ArticleCard.tsx` |
| شبكة مقالات بعنوان وحالة فراغ وترقيم | **widget** |

---

### مثال عملي كامل: إضافة قسم «آراء العملاء»

**الخطوة 1 — الكيان:**

```
entities/testimonial/
  model/types.ts          export type Testimonial = { id, author, role, text, rating }
  model/testimonials.ts   بيانات مؤقتة
  api/get-testimonials.ts getTestimonials() ← نقطة ربط الـ API لاحقاً
  ui/TestimonialCard.tsx  عرض رأي واحد
  index.ts                الواجهة العامة
```

**الخطوة 2 — الـ widget:**

```
widgets/testimonials/
  ui/Testimonials.tsx   العنوان + الشبكة + حالة الفراغ
  index.ts
```

```tsx
import { TestimonialCard } from "@/entities/testimonial";
import { Container, Section, SectionHeading, EmptyState } from "@/shared/ui";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) { ... }
```

**الخطوة 3 — الصفحة:**

```tsx
// views/home/ui/HomePage.tsx
const testimonials = await getTestimonials();
...
<Testimonials testimonials={testimonials} />
```

**الخطوة 4:** `npm run lint && npm run build`

---

### أخطاء شائعة يجب تجنّبها

| ❌ الخطأ | ✅ الصواب |
| --- | --- |
| وضع بيانات ثابتة داخل مكوّن في `ui/` | ضعها في `model/` |
| استيراد `@/widgets/hero/ui/Hero` | `@/widgets/hero` |
| كتابة رقم الهاتف في مكوّن | `siteConfig.phone` |
| بناء رابط `wa.me` يدوياً | `buildWhatsAppUrl()` |
| نسخ كلاسات القسم يدوياً | `<Section>` و `<Container>` |
| إضافة `eslint-disable` لتجاوز قاعدة FSD | انقل الكود لطبقة أدنى |
| تخزين أيقونة كـ JSX داخل بيانات | استخدم مفتاح نصّي + `iconRegistry` |

---

## 19. الأنماط والألوان

### مقياس الخطوط

`app/globals.css` يحتوي على بلوك `@theme` فيه **مقياس خطوط كامل**. استخدم هذه الكلاسات بدل الأحجام العشوائية:

| الكلاس | الحجم | الاستخدام |
| --- | --- | --- |
| `text-display` | 52px | عنوان الـ Hero — مرة واحدة في الموقع |
| `text-h1` | 36px | عنوان الصفحة |
| `text-h2` | 30px | عنوان القسم |
| `text-h3` | 22px | عنوان مجموعة بطاقات |
| `text-h4` | 18px | عنوان بطاقة صغيرة |
| `text-lead` | 19px | فقرة تمهيدية |
| `text-body` | 17px | نص عادي |
| `text-small` | 15px | تنقّل، أزرار، تسميات |
| `text-caption` | 13px | نص دقيق، رسائل الخطأ |

### الألوان

معرّفة في `:root` كمتغيّرات CSS: `--gold` و `--dark` و `--dark-section` و `--dark-card` و `--muted-foreground`.

### ⚠️ تسمية مقلوبة — انتبه لها جيداً

```css
.bg-dark-section   →  var(--dark)          /* الاسم يقول "section" لكنه اللون الأساسي */
.bg-dark-secondary →  var(--dark-section)  /* والعكس تماماً */
```

**الاسمان معكوسان فعلاً.** المشكلة **محجوبة الآن** خلف خاصية `tone` في `Section`، لذلك:

```tsx
<Section tone="dark">        {/* ✅ */}
<Section tone="secondary">   {/* ✅ */}

<section className="bg-dark-section">   {/* ❌ لا تستخدمها مباشرة */}
```

### ⚠️ ملاحظة على `.border-gold`

هذا الكلاس حالياً **اختصار كامل**: `border: 1px solid var(--gold)` — وليس لوناً فقط.

لو نقلته لاحقاً إلى `@theme`، سيولّد Tailwind `border-gold` كـ **لون فقط بلا عرض**، وسينكسر `widgets/about` الذي يعتمد على الاختصار. سيحتاج حينها إلى `border border-gold`.

---

## 20. أوامر التشغيل

```bash
npm install            # تثبيت الحزم
npm run dev            # خادم التطوير على http://localhost:3000
npm run build          # البناء — هذا هو الاختبار الحقيقي
npm run start          # تشغيل نسخة الإنتاج محلياً
npm run lint           # فحص القواعد بما فيها قواعد FSD
npx next typegen       # توليد أنواع المسارات
npx tsc --noEmit       # فحص الأنواع فقط
```

### قبل أن ترفع أي كود

```bash
npm run lint && npm run build
```

**الاثنان معاً.** الـ lint يمسك مخالفات المعمارية، والـ build يمسك أخطاء الأنواع والتصيير.

> **متى أشغّل `next typegen`؟** بعد إضافة أي مسار ديناميكي جديد مثل `[slug]`، وإلا لن يتعرّف TypeScript على نوع `PageProps` ولن يعمل الـ autocomplete.

---

## 21. أمور خاصة بـ Next.js 16

هذه الإصدارة فيها **تغييرات جذرية** عن السابقة. **لا تعتمد على معلوماتك القديمة أو على أمثلة من الإنترنت قد تكون لإصدار أقدم.**

| الموضوع | القاعدة في Next 16 |
| --- | --- |
| `params` | أصبح **Promise** — `const { slug } = await params` |
| `searchParams` | أصبح **Promise** أيضاً |
| `fetch` | **لم يعد مخزّناً افتراضياً** — التخزين اختياري لكل نداء |
| `error.tsx` | الخاصية أصبحت **`unstable_retry`** بدل `reset` |
| `middleware.ts` | أصبح اسمه **`proxy.ts`** |
| أنواع المسارات | تُولَّد عبر `next dev` أو `next build` أو `next typegen` |
| Turbopack | أصبح الافتراضي |
| `notFound()` مع streaming | لا يستطيع تغيير الـ status بعد إرسال الـ headers |

### مثال `error.tsx` الصحيح في 16

```tsx
"use client";   // حدود الخطأ يجب أن تكون client components

export default function ArticlesError({
  error,
  unstable_retry,          // ← وليس reset
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) { ... }
```

### 📚 المرجع الرسمي موجود محلياً

```
node_modules/next/dist/docs/
```

**ارجع إليه قبل الكتابة.** هذه تعليمات مثبّتة في ملف `AGENTS.md` في جذر المشروع:

> «هذه ليست Next.js التي تعرفها — هذه النسخة فيها تغييرات جذرية. اقرأ الدليل المناسب قبل كتابة أي كود.»

---

## 22. ما تبقى من عمل

| # | المهمة | الأولوية | التفاصيل |
| --- | --- | --- | --- |
| 1 | استخراج `ServiceCard` | متوسطة | بطاقة الخدمة **مكرّرة** بين `widgets/services-grid` و `views/services`، وبدأت تنحرف (`<h3>` في واحد و `<h2>` في الآخر). مكانها الصحيح `entities/service/ui/ServiceCard.tsx`. الـ lint لا يمسك التكرار لأنه ليس مخالفة استيراد. |
| 2 | نقل باقي كلاسات `globals.css` إلى `@theme` | منخفضة | سيولّد Tailwind الكلاسات تلقائياً مع كل الـ variants. انتبه لمسألة `.border-gold` أعلاه. |
| 3 | إصلاح التسمية المقلوبة | منخفضة | `.bg-dark-section` / `.bg-dark-secondary` معكوسان. محجوبان الآن خلف `Section`. |
| 4 | ربط الـ CMS فعلياً | حسب المشروع | ضع `API_BASE_URL` في `.env.local` |
| 5 | ربط استقبال النموذج | **عالية** | ضع `CONTACT_WEBHOOK_URL` — حالياً الطلبات تُسجَّل فقط ولا تصل لأحد |
| 6 | حسم مدير الحزم | **عالية** | يوجد `yarn.lock` و `package-lock.json` معاً. احذف أحدهما — قد ينتجان شجرة اعتماديات مختلفة وأخطاء يصعب تفسيرها. |
| 7 | صورتان غير مستخدمتين | منخفضة | في `public/` — تُركتا عمداً تحسّباً لاستخدامهما لاحقاً |
| 8 | تنظيف محتوى المقالات | حسب المشروع | المقالات الثلاث تجريبية |

### ⚠️ المهمة رقم 5 عاجلة

حالياً `app/api/contact/route.ts` **يسجّل الطلب في الـ console ويُرجع نجاحاً** لأن `CONTACT_WEBHOOK_URL` غير معرّف.

هذا يعني أن **طلبات العملاء عبر النموذج لا تصل إلى أحد**. زر الواتساب يعمل، لكن من يستخدم النموذج ستضيع رسالته. **يجب ضبط هذا قبل النشر.**

---

## 23. مراجع

| المرجع | المكان |
| --- | --- |
| ملخّص قواعد المعمارية (إنجليزي) | `ARCHITECTURE.md` |
| المتغيّرات البيئية المطلوبة | `.env.example` |
| تعليمات المشروع للمطوّرين | `AGENTS.md` |
| توثيق Next.js 16 الرسمي | `node_modules/next/dist/docs/` |
| توثيق Feature-Sliced Design | https://feature-sliced.design/ |
| النسخة الإنجليزية من هذا الدليل | `REFACTOR-GUIDE.md` |

---

## خلاصة في ثلاث نقاط

1. **البنية الآن طبقية ومفروضة آلياً.** لن تستطيع كسرها بالخطأ — الـ lint سيمنعك. لكنه **لن يشرح لك السبب**، ولهذا كُتب هذا المستند.

2. **المحتوى منفصل عن الواجهة.** كل بيانات الموقع في `model/` و `config/`، بشكل يطابق ما سيأتي من API. ربط الـ CMS تعديل في ملف واحد لكل كيان.

3. **الأخطاء الحقيقية أُصلحت واختُبرت.** المشروع لم يكن يُبنى أصلاً، ورابط الواتساب — أهم مسار تحويل — كان معطوباً تماماً.

---

**أي سؤال عن سبب وضع ملف في مكان معيّن — اسأل قبل أن تنقله.**
