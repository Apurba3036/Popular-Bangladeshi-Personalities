import { useState, useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, BookOpen, Users, Globe, Award, GraduationCap, Heart, Star, MapPin, Landmark, PenTool, Microscope } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../seo'
import PersonCard from '../components/PersonCard'
import LazyImage from '../components/LazyImage'
import { apiUrl } from '../api'

const BangladeshMap = lazy(() => import('../components/BangladeshMap'))

const categoryIcons = {
  science: <Sparkles size={28} />,
  literature: <BookOpen size={28} />,
  arts: <Star size={28} />,
  history: <Users size={28} />,
  medicine: <Heart size={28} />,
  sports: <Award size={28} />,
  education: <GraduationCap size={28} />,
}

const categoryImages = {
  science: '/images/heritage/national-assembly.jpg',
  literature: '/images/heritage/ahsan-monjil.jpg',
  arts: '/images/heritage/sonargaon.jpg',
  history: '/images/heritage/lalbagh-fort.jpg',
  medicine: '/images/heritage/sixty-dome-mosque.jpg',
  sports: '/images/heritage/landscape.jpg',
  education: '/images/heritage/hill-tracts.jpg',
}

const categoryNames = {
  en: { science: 'Science & Technology', literature: 'Literature & Poetry', arts: 'Arts & Culture', history: 'National History', medicine: 'Medicine & Health', sports: 'Sports & Athletics', education: 'Education & Social Reform' },
  bn: { science: 'বিজ্ঞান ও প্রযুক্তি', literature: 'সাহিত্য ও কবিতা', arts: 'শিল্প ও সংস্কৃতি', history: 'জাতীয় ইতিহাস', medicine: 'চিকিৎসা ও স্বাস্থ্য', sports: 'খেলাধুলা ও ক্রীড়া', education: 'শিক্ষা ও সমাজ সংস্কার' },
}

const heroBackgrounds = [
  '/images/backgrounds/Sundarban_Tiger.jpg',
  '/images/heritage/national-assembly.jpg',
  '/images/heritage/lalbagh-fort.jpg',
  '/images/heritage/sixty-dome-mosque.jpg',
  '/images/heritage/monument.jpg',
]

const galleryStrip = [
  '/images/heritage/ahsan-monjil.jpg',
  '/images/heritage/lalbagh-fort.jpg',
  '/images/heritage/sixty-dome-mosque.jpg',
  '/images/heritage/sonargaon.jpg',
  '/images/heritage/national-assembly.jpg',
  '/images/heritage/hill-tracts.jpg',
  '/images/heritage/landscape.jpg',
  '/images/heritage/caption.jpg',
  '/images/heritage/ahsan-monjil.jpg',
  '/images/heritage/lalbagh-fort.jpg',
]

function Particles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    size: 2 + Math.random() * 3,
  }))

  return (
    <div className="hero-particles">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const { language, t } = useLanguage()
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [heroBg, setHeroBg] = useState(0)

  useSeo({
    title: 'Heroes of the Nation',
    description: 'Discover the most popular and influential personalities of Bangladesh — scientists, poets, artists, freedom fighters, athletes, and leaders who shaped the nation.',
    canonicalPath: '/',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroBg(prev => (prev + 1) % heroBackgrounds.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    Promise.all([
      fetch(apiUrl('/api/personalities?featured=true')).then(r => r.json()),
      fetch(apiUrl('/api/categories')).then(r => r.json()),
    ]).then(([persons, cats]) => {
      setFeatured(persons.personalities || [])
      setCategories(cats || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {heroBackgrounds.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: i === heroBg ? 0.55 : 0,
                transition: 'opacity 2.2s ease, transform 14s ease-out',
                transform: i === heroBg ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6,66,45,0.55) 0%, rgba(6,66,45,0.35) 50%, rgba(15,15,15,0.75) 100%)',
          }} />
        </div>

        <div className="hero-bg-symbols">
          <div className="hero-silhouette memorial" />
        </div>
        <Particles />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="hero-subtitle-top" style={{
            fontSize: '1.1rem',
            letterSpacing: '0.4em',
            textShadow: '0 0 20px rgba(197,165,90,0.5)',
          }}>
            {t('A Digital National Heritage Project', 'একটি ডিজিটাল জাতীয় ঐতিহ্য প্রকল্প')}
          </p>
          <h1 className="hero-title-en">The Heroes of The Nation</h1>
          <h2 className="hero-title-bn">বাংলাদেশের জনপ্রিয় ব্যক্তিত্ব</h2>
          <p className="hero-description" style={{
            fontSize: '1.2rem',
            fontWeight: '500',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}>
            {t(
              'Honouring the Minds, Hearts & Heroes Who Shaped a Nation',
              'যাঁদের মেধা, কর্ম ও আত্মত্যাগে গড়ে উঠেছে বাংলাদেশ'
            )}
          </p>
          <p className="hero-description-bn" style={{
            fontSize: '1.1rem',
            fontWeight: '500',
            color: 'var(--gold-shimmer)',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}>
            {t(
              'Remembering the People Who Built the Nation',
              'যাঁদের কর্ম, মেধা ও আত্মত্যাগে সমৃদ্ধ হয়েছে আমাদের বাংলাদেশ'
            )}
          </p>
          <Link to="/categories" className="hero-cta">
            {t('Explore Heroes', 'গৌরব অন্বেষণ করুন')} <ArrowRight size={16} />
          </Link>
        </motion.div>


        <div className="hero-scroll-indicator">
          <span>{t('SCROLL', 'স্ক্রল')}</span>
          <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* ===== FEATURED ICONS ===== */}
      <section className="section" style={{ position: 'relative' }}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-gold-line" />
          <h2 className="section-title-en">Featured Heroes</h2>
          <p className="section-title-bn">বিশিষ্ট ব্যক্তিত্ব</p>
          <p className="section-subtitle">
            {t(
              'The individuals whose lives and achievements illuminate the story of Bangladesh.',
              'যাঁদের জীবন ও অর্জন বাংলাদেশের গল্পকে আলোকিত করেছে।'
            )}
          </p>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="loading-spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : (
          <>
            <div className="personality-grid">
              {featured.slice(0, 6).map(person => (
                <PersonCard
                  key={person.id}
                  person={person}
                  categoryName={categoryNames[language]?.[person.category] || person.category}
                />
              ))}
            </div>
            <div className="featured-more">
              <Link to="/categories" className="hero-cta">
                {t('Explore More Heroes', 'আরও গৌরব অন্বেষণ করুন')} <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ===== HERITAGE SECTION ===== */}
      <section className="heritage-section" style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          <LazyImage
            src="/images/heritage/ahsan-monjil.jpg"
            alt=""
            style={{
              position: 'absolute',
              left: '-5%',
              top: '10%',
              width: '40%',
              height: '80%',
              objectFit: 'cover',
              opacity: 0.08,
              filter: 'sepia(100%) hue-rotate(80deg) saturate(0.3)',
              borderRadius: '4px',
            }}
          />
          <LazyImage
            src="/images/heritage/lalbagh-fort.jpg"
            alt=""
            style={{
              position: 'absolute',
              right: '-5%',
              top: '5%',
              width: '40%',
              height: '90%',
              objectFit: 'cover',
              opacity: 0.06,
              filter: 'sepia(100%) hue-rotate(80deg) saturate(0.3)',
              borderRadius: '4px',
            }}
          />
          <LazyImage
            src="/images/heritage/sixty-dome-mosque.jpg"
            alt=""
            style={{
              position: 'absolute',
              left: '30%',
              bottom: '-10%',
              width: '40%',
              height: '60%',
              objectFit: 'cover',
              opacity: 0.04,
              filter: 'sepia(100%) hue-rotate(80deg) saturate(0.3)',
              borderRadius: '4px',
            }}
          />
        </div>

        <motion.div
          className="heritage-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="heritage-title-bn">বাংলাদেশ</p>
          <h2 className="heritage-title-en">The Spirit of Bangladesh</h2>
          <div className="section-gold-line" style={{ margin: '1.5rem auto' }} />
          <p className="heritage-text-en">
            {t(
              'A nation remembered through the lives of its people.',
              'একটি জাতিকে স্মরণ করা যায় তার মানুষের জীবন ও কর্মের মধ্য দিয়ে।'
            )}
          </p>
          <p className="heritage-text-bn">
            {t(
              'From the banks of the Padma to the hills of the Chittagong — a land shaped by visionaries, poets, scientists, and soldiers.',
              'পদ্মার তীর থেকে পার্বত্য চট্টগ্রাম পর্যন্ত — একটি ভূমি যা দৃষ্টিভঙ্গি, কবি, বিজ্ঞানী ও সৈনিকদের দ্বারা গড়ে উঠেছে।'
            )}
          </p>
        </motion.div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="map-section">
        <div className="map-wrap">
          <motion.div
            className="map-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-gold-line" />
            <h2 className="map-text-title">
              The Land of <span className="gold">Rivers</span>
            </h2>
            <p className="map-text-sub">নদীমাতৃক এই ভূখণ্ডে জন্ম নিয়েছেন অগণিত গৌরব</p>
            <p className="map-text-para">
              {t(
                'Rivers flow through the veins of this land, and from its fertile banks have risen poets, scientists, artists, leaders and heroes whose names echo across the world. This map traces the birthplaces of Bangladesh\'s popular personalities — spot a marker, and step into a story.',
                'নদীমাতৃক এই ভূমির মাটিতে লালিত হয়েছে কবি, বিজ্ঞানী, শিল্পী, নেতা ও বীরদের জীবন — যাঁদের নাম আজ বিশ্বজুড়ে। এই মানচিত্রটি ঘুরে দেখুন এবং প্রতিটি চিহ্নে ক্লিক করে জানুন এক একটি জীবনের গল্প।'
              )}
            </p>
            <ul className="map-facts">
              <li>
                <span className="map-fact-icon"><Landmark size={16} /></span>
                {t('Over 1000 rivers weave through the delta', 'বাংলাদেশে এক হাজারেরও বেশি নদী')}
              </li>
              <li>
                <span className="map-fact-icon"><PenTool size={16} /></span>
                {t('Two Nobel laureates and a poet of the people call this land home', 'দুই নোবেল বিজয়ী ও জাতীয় কবির জন্মভূমি')}
              </li>
              <li>
                <span className="map-fact-icon"><Microscope size={16} /></span>
                {t('Scientists who shaped modern physics, medicine and skyscrapers', 'আধুনিক বিজ্ঞান ও স্থাপত্যকে গড়া বিজ্ঞানীরা')}
              </li>
              <li>
                <span className="map-fact-icon"><MapPin size={16} /></span>
                {t('From Rangpur to Chittagong shores — greatness everywhere', 'পাহাড় থেকে সমুদ্রতীর পর্যন্ত — গৌরব সর্বত্র')}
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <Suspense fallback={
              <div className="map-frame" style={{ height: '540px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="loading-spinner" />
              </div>
            }>
              <BangladeshMap />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* ===== GALLERY STRIP ===== */}
      <section style={{
        padding: '3rem 0',
        background: 'var(--charcoal)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          animation: 'scroll-gallery 30s linear infinite',
          width: 'fit-content',
        }}>
          {galleryStrip.map((src, i) => (
            <div key={i} style={{
              width: '280px',
              height: '180px',
              flexShrink: 0,
              overflow: 'hidden',
              border: '1px solid rgba(197,165,90,0.15)',
            }}>
              <LazyImage
                src={src}
                alt="Bangladesh heritage"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.5,
                  filter: 'sepia(40%) saturate(0.6)',
                }}
                onMouseOver={e => e.target.style.opacity = '0.8'}
                onMouseOut={e => e.target.style.opacity = '0.5'}
              />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll-gallery {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section-full" style={{ background: 'var(--white)' }}>
        <div className="section" style={{ padding: '5rem 2rem' }}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-gold-line" />
            <h2 className="section-title-en">Browse by Category</h2>
            <p className="section-title-bn">বিভাগ অনুযায়ী অন্বেষণ</p>
          </motion.div>

          <div className="categories-grid">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link to={`/categories?cat=${cat.id}`} className="category-card" style={{ position: 'relative', overflow: 'hidden' }}>
                  <LazyImage
                    src={categoryImages[cat.id]}
                    alt=""
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.06,
                      filter: 'sepia(100%) hue-rotate(80deg) saturate(0.2)',
                    }}
                  />
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="category-icon">
                      {categoryIcons[cat.id] || <Globe size={28} />}
                    </div>
                    <h3 className="category-name-en">
                      {language === 'bn' ? cat.nameBangla : cat.nameEnglish}
                    </h3>
                    <p className="category-name-bn">{cat.nameBangla}</p>
                    <p className="category-count">
                      {cat.count} {language === 'bn' ? 'জন' : 'Icon(s)'}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VICTORY DAY STRIP ===== */}
      <section style={{
        position: 'relative',
        padding: '5rem 2rem',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--charcoal) 0%, #0d1a12 50%, var(--charcoal) 100%)',
      }}>
        <LazyImage
          src="/images/heritage/victory-day.avif"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.12,
            filter: 'sepia(60%) hue-rotate(80deg) saturate(0.4)',
          }}
        />
        <motion.div
          style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-gold-line" />
          <h2 className="section-title-en" style={{ color: 'var(--white)' }}>
            {t('A Living Archive', 'একটি বেঁচে থাকা সংগ্রহ')}
          </h2>
          <p className="section-title-bn">
            {t('একটি বেঁচে থাকা সংগ্রহ', 'This website grows as we add more heroes and personalities.')}
          </p>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '1rem',
            lineHeight: 1.8,
          }}>
            {t(
              'Every life documented here is a thread in the tapestry of Bangladesh. Every achievement preserved is a light for future generations.',
              'এখানে নথিভুক্ত প্রতিটি জীবন বাংলাদেশের বস্ত্রের একটি সুতো। সংরক্ষিত প্রতিটি অর্জন ভবিষ্যৎ প্রজন্মের জন্য একটি আলো।'
            )}
          </p>
        </motion.div>
      </section>
    </>
  )
}