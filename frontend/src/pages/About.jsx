import { motion } from 'framer-motion'
import { Globe, BookOpen, Heart, Shield, Users, Award } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const values = [
    {
      icon: <Shield size={28} />,
      titleEn: 'Honesty',
      titleBn: 'সততা',
      descEn: 'We gather from public sources and never fabricate. We speak openly that some facts may carry the shadow of error.',
      descBn: 'আমরা প্রকাশ্য উৎস থেকে সংগ্রহ করি এবং কখনো উদ্ভাবন করি না। আমরা স্পষ্টভাবে বলি যে কোনো কোনো তথ্যে ত্রুটির ছায়া থাকতে পারে।',
    },
    {
      icon: <Heart size={28} />,
      titleEn: 'Respect',
      titleBn: 'সম্মান',
      descEn: 'This website honours the dignity and legacy of every person featured.',
      descBn: 'এই ওয়েবসাইট প্রতিটি ব্যক্তির মর্যাদা ও ঐতিহ্যকে সম্মান করে।',
    },
    {
      icon: <Globe size={28} />,
      titleEn: 'Bilingual',
      titleBn: 'দ্বিভাষিক',
      descEn: 'Content is available in both English and Bangla, written in proper Bengali.',
      descBn: 'বিষয়বস্তু ইংরেজি ও বাংলা — দুটি ভাষায় উপলব্ধ, সঠিক বাংলায় লেখা।',
    },
    {
      icon: <BookOpen size={28} />,
      titleEn: 'Education',
      titleBn: 'শিক্ষা',
      descEn: 'A digital national heritage project for learning and remembrance.',
      descBn: 'শেকড় ও স্মরণের জন্য একটি ডিজিটাল জাতীয় ঐতিহ্য প্রকল্প।',
    },
    {
      icon: <Users size={28} />,
      titleEn: 'Inclusivity',
      titleBn: 'সমাবেশিতা',
      descEn: 'Celebrating diverse voices — scientists, artists, athletes, freedom fighters, and more.',
      descBn: 'বৈচিত্র্যময় কণ্ঠস্বরকে উদ্‌যাপন — বিজ্ঞানী, শিল্পী, ক্রীড়াবিদ, মুক্তিযোদ্ধা এবং আরও অনেকে।',
    },
    {
      icon: <Award size={28} />,
      titleEn: 'Legacy',
      titleBn: 'ঐতিহ্য',
      descEn: 'Preserving the stories of the people who shaped a nation for future generations.',
      descBn: 'ভবিষ্যৎ প্রজন্মের জন্য যাঁরা একটি জাতি গড়েছেন তাঁদের গল্প সংরক্ষণ।',
    },
  ]

  return (
    <>
      <section className="about-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '700px' }}
        >
          <div className="section-gold-line" />
          <h1 className="section-title-en" style={{ color: 'var(--white)', fontSize: '2.5rem' }}>
            {t('About This Project', 'এই প্রকল্প সম্পর্কে')}
          </h1>
          <p className="section-title-bn" style={{ fontSize: '1.3rem' }}>
            {t('একটি ডিজিটাল জাতীয় ঐতিহ্য উদ্যোগ', 'A Digital National Heritage Initiative')}
          </p>
        </motion.div>
      </section>

      <section className="about-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('Our Mission', 'আমাদের মিশন')}</h2>
          <p>
            {t(
              'Popular Personalities of Bangladesh is a digital tribute to the scientists, innovators, writers, artists, freedom fighters, educators, athletes, cultural icons, and other influential people of Bangladesh. The website serves as a digital national heritage museum — a place to preserve, present, and celebrate the lives, achievements, and legacies of the people who shaped the soul, knowledge, culture, and identity of Bangladesh.',
              'বাংলাদেশ জাতীয় গৌরব হলো বাংলাদেশের বিজ্ঞানী, উদ্ভাবক, লেখক, শিল্পী, মুক্তিযোদ্ধা, শিক্ষাবিদ, ক্রীড়াবিদ, সাংস্কৃতিক আইকন এবং অন্যান্য জাতীয়ভাবে প্রভাবশালী ব্যক্তিদের প্রতি একটি ডিজিটাল শ্রদ্ধাঞ্জলি। এই ওয়েবসাইট একটি ডিজিটাল জাতীয় ঐতিহ্য জাদুঘর হিসেবে কাজ করে — যাঁরা বাংলাদেশের আত্মা, জ্ঞান, সংস্কৃতি ও পরিচয় গড়েছেন তাঁদের জীবন, অর্জন ও ঐতিহ্য সংরক্ষণ, উপস্থাপন ও উদ্‌যাপনের একটি স্থান।'
            )}
          </p>
          <p>
            {t(
              'We humbly gather our stories from the open sea of human knowledge — from Wikipedia, from search results, and from countless digital archives, books, and publications that kindly share their light with the world. We honour these sources and give them our deepest gratitude.',
              'মানবজ্ঞানের বিশাল সমুদ্র থেকে আমরা বিনীতভাবে আমাদের গল্প সংগ্রহ করি — উইকিপিডিয়া থেকে, অনুসন্ধান ফলাফল থেকে, এবং অসংখ্য ডিজিটাল আর্কাইভ, বই ও প্রকাশনা থেকে, যাঁরা সদয়ভাবে বিশ্বের সাথে তাদের আলো ভাগ করে নেন। আমাদের এই উৎসগুলোর প্রতি গভীর কৃতজ্ঞতা রয়েছে।'
            )}
          </p>
          <p>
            {t(
              'Yet we must speak with honesty: the tales written here are gathered from the internet, and the internet is a vast, imperfect river. Some dates, details, or achievements may carry the quiet shadow of error. We do not claim that every word is flawless — only that it was gathered with love. Should you find a mistake, we earnestly ask your forgiveness, and we welcome you to share the correct truth with us so that we may mend it.',
              'তবুও আমাদের সৎভাবে বলতে হবে: এখানে লেখা গল্পগুলো ইন্টারনেট থেকে সংগ্রহ করা, আর ইন্টারনেট একটি বিশাল, অপূর্ণ নদী। কোনো কোনো তারিখ, বিবরণ বা অর্জনে ত্রুটির নীরব ছায়া থাকতে পারে। আমরা দাবি করি না যে প্রতিটি শব্দ নির্ভুল — কেবলমাত্র এটি ভালোবাসা দিয়ে সংগ্রহ করা হয়েছিল। কোনো ভুল পেলে আমরা আপনার কাছে নম্রভাবে ক্ষমা চাই, এবং সঠিক তথ্য আমাদের জানালে আমরা তা সংশোধন করতে প্রস্তুত।'
            )}
          </p>
        </motion.div>

        <motion.div
          className="about-values"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {values.map((val, i) => (
            <motion.div
              key={i}
              className="about-value-card"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div style={{ color: 'var(--gold)', marginBottom: '1rem' }}>{val.icon}</div>
              <h3>{t(val.titleEn, val.titleBn)}</h3>
              <p>{t(val.descEn, val.descBn)}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== CREDITS & DISCLAIMER ===== */}
      <section className="section" style={{ background: 'var(--charcoal)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
        >
          <div className="section-gold-line" />
          <h2 className="section-title-en" style={{ color: 'var(--white)' }}>
            {t('A Note of Gratitude', 'কৃতজ্ঞতার নোট')}
          </h2>
          <p className="section-title-bn" style={{ marginBottom: '1.5rem' }}>
            {t('যাঁদের আলো থেকে আমরা শিখেছি', 'From Whose Light We Have Learned')}
          </p>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
            {t(
              'Every story in this archive was gathered with gratitude from the generous knowledge of the internet. We bow to the tireless contributors of Wikipedia for the shared fabric of human history, to Google and its vast river of search results, and to the many encyclopaedias, libraries, journals, and websites whose quiet work lights every page you read here.',
              'এই আর্কাইভের প্রতিটি গল্প ইন্টারনেটের উদার জ্ঞানের কাছে কৃতজ্ঞতার সাথে সংগৃহীত। মানব ইতিহাসের ভাগ করা বুনটের জন্য উইকিপিডিয়ার অক্লান্ত অবদানকারীদের, অনুসন্ধানের বিশাল নদী গুগলকে এবং সেই অসংখ্য বিশ্বকোষ, গ্রন্থাগার, সাময়িকী ও ওয়েবসাইটগুলোকেও আমরা শ্রদ্ধার সাথে স্মরণ করি, যাদের নীরব পরিশ্রম এই পৃষ্ঠাগুলোকে আলোকিত করে।'
            )}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}>
            {[
              { name: 'Wikipedia', href: 'https://en.wikipedia.org' },
              { name: 'Google Search', href: 'https://www.google.com' },
              { name: 'Banglapedia', href: 'http://banglapedia.org' },
              { name: 'Britannica', href: 'https://www.britannica.com' },
              { name: 'UNESCO', href: 'https://www.unesco.org' },
            ].map(src => (
              <a
                key={src.name}
                href={src.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--gold-shimmer)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  border: '1px solid var(--border-subtle)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '30px',
                  transition: 'var(--transition-smooth)',
                  background: 'rgba(197,165,90,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold-shimmer)'
                  e.currentTarget.style.background = 'rgba(197,165,90,0.18)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)'
                  e.currentTarget.style.background = 'rgba(197,165,90,0.06)'
                }}
              >
                {src.name}
              </a>
            ))}
          </div>
          <p className="section-subtitle" style={{ marginTop: '2.5rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8 }}>
            {t(
              'The internet is a garden where many hands have planted. If a flower here grows slightly awry, we ask your gentle forgiveness — and invite you to tell us the true story so it may bloom perfectly.',
              'ইন্টারনেট একটি বাগান যেখানে অনেক হাত গাছ রোপণ করেছে। এখানে কোনো ফুল যদি কিছু বাঁকা হয়ে বেড়ে ওঠে, আমরা আপনার সদয় ক্ষমা প্রার্থনা করি — এবং আপনাকে আমন্ত্রণ জানাই সত্য গল্পটি আমাদের বলার জন্য, যাতে এটি নিখুঁতভাবে ফুটে উঠতে পারে।'
            )}
          </p>
        </motion.div>
      </section>

      {/* ===== DATA ARCHITECTURE NOTE ===== */}
      <section className="section" style={{ background: 'var(--ivory-warm)', borderTop: '1px solid var(--border-subtle)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}
        >
          <div className="section-gold-line" />
          <h2 className="section-title-en">{t('Open Heritage', 'মুক্ত ঐতিহ্য')}</h2>
          <p className="section-subtitle" style={{ marginTop: '1.5rem' }}>
            {t(
              'This website is built with a reusable data architecture. New personalities can be easily added to expand this living digital archive. Each personality profile is generated from a structured data model, ensuring consistency and completeness across all entries.',
              'এই ওয়েবসাইট একটি পুনঃব্যবহারযোগ্য ডেটা স্থাপত্য দিয়ে তৈরি। এই বেঁচে থাকা ডিজিটাল সংগ্রহকে সমৃদ্ধ করতে নতুন জাতীয় গৌরব সহজেই যোগ করা যায়।'
            )}
          </p>
        </motion.div>
      </section>
    </>
  )
}
