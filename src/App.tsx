import React, { useRef, useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Send, Target, Building2, ShoppingCart, Mic, Presentation, GraduationCap } from "lucide-react";

// ===== Анимации =====
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.15 },
};

// ===== Smooth anchor scroll (учёт фикс‑хедера) =====
const HEADER_H = 64;
const scrollToId = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_H - 12;
  window.scrollTo({ top: y, behavior: "smooth" });
};

// ===== TG =====
const TG_HANDLE = "@madwebstudio";
const TG_URL = `https://t.me/${TG_HANDLE.replace(/^@/, "")}`;

// ===== helpers =====
const formatPrice = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

// ===== Утилиты UI =====
const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.p {...fadeUp} className="tracking-[0.3em] uppercase text-[11px] text-zinc-500 font-[var(--font-display)]">
    {children}
  </motion.p>
);

const SectionTitle: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <div className="max-w-3xl">
    <motion.h2 {...fadeUp} className="text-3xl md:text-5xl font-extrabold leading-tight text-zinc-900 font-[var(--font-display)] tracking-[0.005em]">
      {title}
    </motion.h2>
    {sub && (
      <motion.p {...fadeUp} className="text-zinc-600 mt-3">
        {sub}
      </motion.p>
    )}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] ${className || ""}`}>{children}</div>
);

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <Card className="text-center">
    <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent font-[var(--font-display)]">{value}</div>
    <div className="text-zinc-600 text-sm mt-1">{label}</div>
  </Card>
);

const Plan: React.FC<{ name: string; oldPrice: number; discountPct: number; features: string[]; featured?: boolean }> = ({ name, oldPrice, discountPct, features, featured }) => {
  const newPrice = Math.round(oldPrice * (1 - discountPct / 100));
  return (
    <Card className={`relative ${featured ? "ring-1 ring-sky-400/30" : ""}`}>
      {featured && (
        <div className="absolute -top-3 right-4 text-xs font-bold bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-3 py-1 rounded-full shadow-sm">
          Хит
        </div>
      )}
      <h3 className="text-lg font-extrabold text-zinc-900 font-[var(--font-display)] tracking-[0.01ем]">{name}</h3>
      <p className="text-zinc-600 mt-1">Фиксированный объём работ</p>

      <div className="mt-3">
        <div className="text-sm text-zinc-500 line-through">{formatPrice(oldPrice)} </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-extrabold text-зинc-900 font-[var(--font-display)]">{formatPrice(newPrice)}</div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">- {discountPct}%</span>
        </div>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2"><span className="mt-1 inline-block size-2 rounded-sm bg-sky-600" />{f}</li>
        ))}
      </ul>
      <a href="#contact" onClick={scrollToId("contact")} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 transition">
        Выбрать <ArrowRight className="size-4" />
      </a>
    </Card>
  );
};

// ===== Карточка типа сайта БЕЗ картинок (иконка + много текста) =====
const TypeCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; bullets: string[] }>= ({ icon, title, desc, bullets }) => (
  <motion.div {...fadeUp} className="group rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition">
    <div className="p-5">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-xl border border-зинc-200 flex items-center justify-center bg-зинc-50 text-sky-700">{icon}</div>
        <h4 className="font-semibold font-[var(--font-display)] tracking-[0.005em] text-lg">{title}</h4>
      </div>
      <p className="text-sm text-zinc-700 mt-3 leading-relaxed">{desc}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-zinc-700">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2"><span className="text-sky-600">➤</span><span>{b}</span></li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default function MAD_Flagship_Light() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sentHint, setSentHint] = useState<string>("");

  // ===== Обработка редиректа после успешной отправки =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("sent") === "1") {
      setSentHint("Заявка отправлена. Мы свяжемся с вами по указанной почте.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* Шрифты: Oxanium (жирные заголовки) + Inter (текст) */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oxanium:wght@700;800&display=swap" rel="stylesheet" />
      <style>{`:root{--font-display:'Oxanium',system-ui,sans-serif;--font-text:Inter,system-ui,sans-serif} .font-[var(--font-display)]{font-family: var(--font-display)} body{font-family: var(--font-text)} .chip{border-radius:10px}`}</style>

      {/* Фоновые акценты */}
      <div className="pointer-events-none fixed inset-0 -z-10 [background-image:radial-gradient(60%_40%_at_85%_0%,rgba(56,189,248,.16),transparent),radial-gradient(60%_40%_at_10%_20%,rgba(99,102,241,.12),transparent)]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#top" onClick={scrollToId("top")} className="flex items_center">
            {/* ЛОГО: положи файл MAD.png рядом со сборкой */}
            <img src="MAD.png" alt="MAD logo" className="h-8 w-auto block" loading="eager" />
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <a href="#services" onClick={scrollToId("services")} className="hover:text-zinc-900">Услуги</a>
            <a href="#portfolio" onClick={scrollToId("portfolio")} className="hover:text-zinc-900">Портфолио</a>
            <a href="#process" onClick={scrollToId("process")} className="hover:text-зинc-900">Процесс</a>
            <a href="#pricing" onClick={scrollToId("pricing")} className="hover:text-зинc-900">Форматы</a>
            <a href="#contact" onClick={scrollToId("contact")} className="ml-2 inline-flex items-center gap-2 rounded-xl border border-зинc-200 px-3 py-1.5 bg-white hover:bg-зинc-50">Обсудить</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Kicker>разработка сайтов под ключ</Kicker>
            <motion.h1 {...fadeUp} className="text-4xl md:text-6xl font-extrabold leading-[1.05] mt-4 font-[var(--font-display)] tracking-[0.005em]">
              Мы разрабатываем сайты, которые повышают эффективность бизнеса.
            </motion.h1>
            <motion.p {...fadeUp} className="text-zinc-600 mt-5 max-w-xl">
              От идеи до запуска: делаем не просто сайт, а инструмент роста и продаж. Повышаем эффективность за счёт стратегии, UX, контента и технологий.
            </motion.p>
            <motion.div {...fadeUp} className="mt-7 flex флекс-wrap items-center gap-3">
              <a href="#portfolio" onClick={scrollToId("portfolio")} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 font-semibold shadow-sm hover:bg-zinc-50">
                Смотреть кейсы <ArrowRight className="size-4"/>
              </a>
              <a href="#contact" onClick={scrollToId("contact")} className="inline-flex items-center gap-2 rounded-xl border border-sky-400/50 px-5 py-3 font-semibold bg-sky-50">
                Получить смету за 24 часа
              </a>
            </motion.div>
          </div>
          <motion.div {...fadeUp} className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-sky-200/60 to-indigo-200/60 blur-2xl rounded-3xl"/>
            <Card>
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1400&auto=format&fit=crop" alt="Работа за ноутбуком — веб‑разработка" className="rounded-2xl border border-zinc-200"/>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-зинc-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionTitle title="Сайты, которые решают бизнес‑задачи" sub="Лендинги, корпоративные сайты, магазины. Пакеты или индивидуальная смета под задачу." />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <Card>
              <h3 className="font-semibold text-lg font-[var(--font-display)] tracking-[0.005em]">Лендинги и корпоративные сайты</h3>
              <p className="text-zinc-600 text-sm mt-2">Исследование ниши, прототип, UX/UI, адаптив, SEO‑основа, тексты. От идеи до релиза.</p>
            </Card>
            <Card>
              <h3 className="font-semibold text-lg font-[var(--font-display)] tracking-[0.005em]">Интернет‑магазины</h3>
              <p className="text-зинc-600 text_sm mt-2">Каталог, карточки, фильтры, корзина, оплата, CRM/склад, интеграции доставки. Фокус на конверсии.</p>
            </Card>
            <Card>
              <h3 className="font-semibold text-lg font-[var(--font-display)] tracking-[0.005ем]">Поддержка и рост</h3>
              <p className="text-зинc-600 text_sm mt-2">A/B‑тесты, развитие функционала, контент, скорость, безопасность, SEO‑рост.</p>
            </Card>
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            <Stat value="90+" label="PageSpeed"/>
            <Stat value="3–6 нед" label="Средний срок"/>
            <Stat value="24 ч" label="Смета проекта"/>
          </div>
        </div>
      </section>

      {/* Types */}
      <section id="portfolio" className="border-t border-zinc-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionTitle title="Типы сайтов, которые мы можем создать для вас" sub="Подберём подходящий формат под цели бизнеса." />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <TypeCard icon={<Target className="size-5"/>} title="Лендинг" desc="Одностраничный сайт..." bullets={["Герой‑экран...","Блок выгоды...","Короткая форма...","Подходит для промо..."]}/>
            <TypeCard icon={<Building2 className="size-5"/>} title="Корпоративный сайт" desc="Официальное лицо компании..." bullets={["Разделы...","Навигация...","Новости/блог...","Интеграция..."]}/>
            <TypeCard icon={<ShoppingCart className="size-5"/>} title="Интернет‑магазин" desc="Площадка для онлайн‑продаж..." bullets={["Каталог...","Корзина...","Личный кабинет...","Интеграции..."]}/>
            <TypeCard icon={<Mic className="size-5"/>} title="Медиа‑сайт" desc="Публикация контента..." bullets={["Рубрики...","Подписки...","Авторы...","Рекламные места..."]}/>
            <TypeCard icon={<Presentation className="size-5"/>} title="Портфолио / личный сайт" desc="Сайт‑визитка..." bullets={["Кейсы...","Об авторе...","Календарь...","Связка..."]}/>
            <TypeCard icon={<GraduationCap className="size-5"/>} title="Образовательная платформа" desc="Онлайн‑обучение..." bullets={["Лекции...","Прогресс...","Оплата...","Интеграции..."]}/>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-zinc-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionTitle title="Выберите пакет" sub="Сейчас скидка 15% на все пакеты" />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <Plan name="Старт" oldPrice={35000} discountPct={15} features={["Лендинг 1–3 секции","Адаптив + базовая SEO","Формы и мессенджеры"]}/>
            <Plan name="Рост" oldPrice={60000} discountPct={15} featured features={["5–7 секций + копирайтинг","UI‑дизайн, интеграции, аналитика","Скорость 90+ и SEO‑база"]}/>
            <Plan name="Флагман" oldPrice={110000} discountPct={15} features={["Дизайн‑система и кастомные блоки","Сложные интеграции + A/B‑тесты","Приоритетная SEO‑стратегия (цель — ТОП‑1 по ключевым)","1 мес. ведения после запуска"]}/>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-zinc-200 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <SectionTitle title="Готовы обсудить ваш проект?" sub="Свяжитесь удобным способом — вернёмся со сметой и таймлайном в течение 24 часов." />
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-sky-300 bg-sky-50 px-4 py-3 shadow-sm hover:bg-sky-100">
                <span className="flex items-center gap-2 text-zinc-800"><Send className="size-4 text-sky-600"/>TG {TG_HANDLE}</span>
              </a>
              <div className="group flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <span className="flex items-center gap-2 text-zinc-800"><Phone className="size-4 text-sky-600"/> +7 995 263‑14‑48</span>
              </div>
              <div className="group col-span-2 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                <span className="flex items-center gap-2 text-zinc-800"><Mail className="size-4 text-sky-600"/> madwebsitestudio@gmail.com</span>
              </div>
            </div>
          </div>

          <Card>
            <form ref={formRef} action="https://api.web3forms.com/submit" method="POST" className="grid gap-3">
              <input type="hidden" name="access_key" value="bb3edcbc-ed70-4eb4-986b-637eb896edac" />
              <input type="hidden" name="from_name" value="MAD Website" />
              <input type="hidden" name="subject" value="MAD — новая заявка с сайта" />
              <input type="hidden" name="redirect" value={typeof window!=='undefined' ? `${window.location.origin}${window.location.pathname}?sent=1` : ''} />
              <input name="name" className="rounded-xl border border-zinc-200 bg-white px-4 py-3" placeholder="Имя" required />
              <input name="email" className="rounded-xl border border-zinc-200 bg-white px-4 py-3" type="email" placeholder="E‑mail" required />
              <input name="company" className="rounded-xl border border-zinc-200 bg-white px-4 py-3" placeholder="Компания (необязательно)" />
              <textarea name="task" className="rounded-xl border border-zinc-200 bg-white px-4 py-3 min-h-36" placeholder="Опишите задачу и сроки" />
              <input type="checkbox" name="botcheck" className="hidden" style={{display:'none'}} tabIndex={-1} autoComplete="off" />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 font-semibold shadow-sm hover:bg-zinc-50">
                Отправить <ArrowRight className="size-4"/>
              </button>
              {sentHint && <p className="text-xs text-zinc-600">{sentHint}</p>}
              {!sentHint && <p className="text-xs text-zinc-500">Нажимая на кнопку, вы соглашаетесь с обработкой данных.</p>}
            </form>
          </Card>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between text-zinc-600 text-sm">
          <div>© {new Date().getFullYear()} MAD — Make A Difference</div>
          <div className="flex gap-4">
            <a href="mailto:madwebsitestudio@gmail.com" className="hover:underline">madwebsitestudio@gmail.com</a>
            <a href="tel:+79952631448" className="hover:underline">+7 995 263‑14‑48</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
