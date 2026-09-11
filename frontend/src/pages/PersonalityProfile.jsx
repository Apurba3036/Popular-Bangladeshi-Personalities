import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ExternalLink, Play, ChevronLeft,
  BookOpen, Award, Link2, Image, Quote
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { apiUrl } from '../api'
import { useSeo } from '../seo'

const heritageImages = [
  '/images/heritage/ahsan-monjil.jpg',
  '/images/heritage/lalbagh-fort.jpg',
  '/images/heritage/sixty-dome-mosque.jpg',
  '/images/heritage/sonargaon.jpg',
  '/images/heritage/national-assembly.jpg',
  '/images/heritage/hill-tracts.jpg',
  '/images/heritage/landscape.jpg',
  '/images/heritage/caption.jpg',
  '/images/heritage/liberation-war.jpg',
]

export default function PersonalityProfile() {
  const { id } = useParams()
  const { language, t } = useLanguage()
  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bioLang, setBioLang] = useState(language)
  const [portraitError, setPortraitError] = useState(false)

  useEffect(() => {
    fetch(apiUrl(`/api/personalities/${id}`))
      .then(r => r.json())
      .then(data => {
        setPerson(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  useEffect(() => {
    setBioLang(language)
  }, [language])

  useSeo({
    title: person ? person.nameEnglish : 'Personality Profile',
    description: person ? `${person.nameEnglish} (${person.nameBangla}) — ${person.category}. ${person.shortBioEnglish || ''}` : 'Learn about renowned personalities of Bangladesh.',
    image: person?.portrait ? `https://popularbangladeshi.vercel.app${person.portrait}` : undefined,
    canonicalPath: `/personality/${id}`,
  })

  useEffect(() => {
    if (!person) return
    let script = document.getElementById('person-jsonld')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'person-jsonld'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: person.nameEnglish,
      alternateName: person.nameBangla,
      description: person.shortBioEnglish,
      url: `https://popularbangladeshi.vercel.app/personality/${id}`,
      image: person.portrait ? `https://popularbangladeshi.vercel.app${person.portrait}` : undefined,
      knowsAbout: person.category,
      birthDate: person.birthDate,
      deathDate: person.deathDate || undefined,
      birthPlace: person.birthplace,
      nationality: {
        '@type': 'Country',
        name: 'Bangladesh',
        sameAs: 'https://en.wikipedia.org/wiki/Bangladesh',
      },
      about: {
        '@type': 'Thing',
        name: 'Popular Personalities of Bangladesh',
        url: 'https://popularbangladeshi.vercel.app/',
      },
    })
  }, [person, id])

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-spinner" />
      </div>
    )
  }

  if (!person) {
    return (
      <div className="not-found">
        <h1>404</h1>
        <p>{language === 'bn' ? 'ব্যক্তি পাওয়া যায়নি' : 'Personality not found'}</p>
        <Link to="/">{language === 'bn' ? 'হোমে ফিরুন' : 'Back to Home'}</Link>
      </div>
    )
  }

  const initials = person.nameEnglish
    .split(' ')
    .filter(w => !['Dr.', 'The', 'Sir', 'Md.', 'Md', 'Acharya'].includes(w))
    .map(w => w[0])
    .join('')
    .slice(0, 2)

  const bio = bioLang === 'bn' ? person.biographyBangla : person.biographyEnglish

  const categoryBg = {
    science: '/images/heritage/national-assembly.jpg',
    literature: '/images/heritage/ahsan-monjil.jpg',
    arts: '/images/heritage/sonargaon.jpg',
    history: '/images/heritage/lalbagh-fort.jpg',
    medicine: '/images/heritage/sixty-dome-mosque.jpg',
    sports: '/images/heritage/landscape.jpg',
    education: '/images/heritage/hill-tracts.jpg',
  }

  return (
    <>
      {/* ===== PROFILE HERO ===== */}
      <section className="profile-hero" style={{ position: 'relative' }}>
        <img
          src={categoryBg[person.category] || '/images/heritage/liberation-war.jpg'}
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.1,
            filter: 'sepia(100%) hue-rotate(80deg) saturate(0.3)',
          }}
        />

        <div className="profile-hero-content">
          <motion.div
            className="profile-info"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="profile-category">
              {language === 'bn' ? person.category : person.category}
            </div>
            <h1 className="profile-name-en">{person.nameEnglish}</h1>
            <p className="profile-name-bn">{person.nameBangla}</p>
            <p className="profile-profession">
              {language === 'bn' ? person.professionBangla.join(' • ') : person.profession.join(' • ')}
            </p>
            <div className="profile-quote">
              "{language === 'bn' ? person.shortBioBangla : person.shortBioEnglish}"
            </div>
            <button
              type="button"
              className="profile-explore-btn"
              onClick={() => document.getElementById('biography')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {t('Explore Their Life', 'তাঁর জীবন অন্বেষণ')} <ArrowRight size={16} />
            </button>
          </motion.div>

          <motion.div
            className="profile-portrait-wrapper"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="profile-portrait" style={{ position: 'relative', overflow: 'hidden' }}>
              {!portraitError && (
                <img
                  src={person.portrait}
                  alt={person.nameEnglish}
                  loading="lazy"
                  decoding="async"
                  onError={() => setPortraitError(true)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.85,
                    filter: 'sepia(15%) saturate(0.85) brightness(0.85)',
                  }}
                />
              )}
              <img
                src={categoryBg[person.category] || '/images/heritage/caption.jpg'}
                alt=""
                loading="lazy"
                decoding="async"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: portraitError ? 0.2 : 0,
                  transition: 'opacity 0.5s',
                  filter: 'sepia(80%) hue-rotate(80deg) saturate(0.3)',
                }}
              />
              <div className="profile-portrait-initials" style={{ position: 'relative', zIndex: 1 }}>{initials}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BIOGRAPHY ===== */}
      <section className="bio-section" id="biography">
        <motion.div
          className="bio-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>{t('Biography', 'জীবনী')}</h2>
          <p className="subtitle-bn">{person.nameBangla}</p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setBioLang('en')}
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid var(--border-subtle)',
                background: bioLang === 'en' ? 'var(--gold)' : 'transparent',
                color: bioLang === 'en' ? 'var(--charcoal)' : 'var(--text-secondary)',
                letterSpacing: '0.05em',
              }}
            >
              English
            </button>
            <button
              onClick={() => setBioLang('bn')}
              style={{
                padding: '0.4rem 1rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid var(--border-subtle)',
                background: bioLang === 'bn' ? 'var(--gold)' : 'transparent',
                color: bioLang === 'bn' ? 'var(--charcoal)' : 'var(--text-secondary)',
                letterSpacing: '0.05em',
              }}
            >
              বাংলা
            </button>
          </div>

          {bio.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        <div className="bio-portrait" style={{ position: 'relative', overflow: 'hidden' }}>
          {!portraitError && (
            <img
              src={person.portrait}
              alt={person.nameEnglish}
              loading="lazy"
              decoding="async"
              onError={() => setPortraitError(true)}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.7,
                filter: 'sepia(15%) saturate(0.85) brightness(0.85)',
              }}
            />
          )}
          <img
            src={categoryBg[person.category] || '/images/heritage/caption.jpg'}
            alt=""
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: portraitError ? 0.15 : 0,
              transition: 'opacity 0.5s',
              filter: 'sepia(80%) hue-rotate(80deg) saturate(0.3)',
            }}
          />
          <div className="bio-portrait-initials" style={{ position: 'relative', zIndex: 1 }}>{initials}</div>
        </div>
      </section>

      {/* ===== QUOTES ===== */}
      {person.quotes && person.quotes.length > 0 && (
        <section className="quotes-section">
          <Quote size={32} style={{ color: 'var(--gold)', opacity: 0.3, margin: '0 auto 1rem' }} />
          <p className="quote-text">
            "{language === 'bn' ? person.quotes[0].textBangla : person.quotes[0].text}"
          </p>
        </section>
      )}

      {/* ===== TIMELINE ===== */}
      {person.timeline && person.timeline.length > 0 && (
        <section className="timeline-section">
          <div className="section" style={{ paddingBottom: '0' }}>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-gold-line" />
              <h2 className="section-title-en">A Life in Time</h2>
              <p className="section-title-bn">জীবনের কালপঞ্জি</p>
            </motion.div>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            {person.timeline.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <p className="timeline-event">
                    {language === 'bn' ? item.eventBangla : item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ===== CONTRIBUTIONS ===== */}
      {person.contributions && person.contributions.length > 0 && (
        <section className="section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-gold-line" />
            <h2 className="section-title-en">Works for the Nation</h2>
            <p className="section-title-bn">দেশের জন্য তাঁর অবদান</p>
          </motion.div>

          <div className="contributions-grid">
            {person.contributions.map((contrib, i) => (
              <motion.div
                key={i}
                className="contribution-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="contribution-icon">
                  <BookOpen size={22} />
                </div>
                <h3 className="contribution-title">
                  {language === 'bn' ? contrib.titleBangla : contrib.title}
                </h3>
                <p className="contribution-desc">
                  {language === 'bn' ? contrib.descriptionBangla : contrib.descriptionEnglish}
                </p>
                <div className="contribution-impact">
                  <strong>{language === 'bn' ? 'প্রভাব: ' : 'Impact: '}</strong>
                  {contrib.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ===== MAJOR WORKS ===== */}
      {person.majorWorks && person.majorWorks.length > 0 && (
        <section className="section-full" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-gold-line" />
              <h2 className="section-title-en">Major Works</h2>
              <p className="section-title-bn">প্রধান কর্ম ও সৃষ্টি</p>
            </motion.div>

            <div className="contributions-grid">
              {person.majorWorks.map((work, i) => (
                <motion.div
                  key={i}
                  className="contribution-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="contribution-icon">
                    <Award size={22} />
                  </div>
                  <h3 className="contribution-title">{work.title}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', marginBottom: '0.5rem' }}>
                    {work.year} • {work.category}
                  </p>
                  <p className="contribution-desc">
                    {language === 'bn' ? work.descriptionBangla : work.descriptionEnglish}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== AWARDS ===== */}
      {person.awards && person.awards.length > 0 && (
        <section className="section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-gold-line" />
            <h2 className="section-title-en">Honours & Recognition</h2>
            <p className="section-title-bn">পুরস্কার ও সম্মাননা</p>
          </motion.div>

          <div className="awards-list">
            {person.awards.map((award, i) => (
              <motion.div
                key={i}
                className="award-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="award-medal">
                  <Award size={20} />
                </div>
                <div className="award-info">
                  <h3>{award.name}</h3>
                  <p className="award-org">{award.organization}</p>
                  <p className="award-year">{award.year}</p>
                  <p className="award-reason">{award.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ===== USEFUL LINKS ===== */}
      {person.usefulLinks && person.usefulLinks.length > 0 && (
        <section className="section-full" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-gold-line" />
              <h2 className="section-title-en">Explore More</h2>
              <p className="section-title-bn">আরও জানুন</p>
            </motion.div>

            <div className="links-grid">
              {person.usefulLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-card"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <div className="link-icon"><Link2 size={18} /></div>
                  <div className="link-info">
                    <h4>{link.title}</h4>
                    <p>{link.description}</p>
                  </div>
                  <ExternalLink size={16} className="link-arrow" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== YOUTUBE VIDEOS ===== */}
      {person.youtubeVideos && person.youtubeVideos.length > 0 && (
        <section className="section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-gold-line" />
            <h2 className="section-title-en">Watch & Discover</h2>
            <p className="section-title-bn">ভিডিও ও তথ্যচিত্র</p>
          </motion.div>

          <div className="videos-grid">
            {person.youtubeVideos.map((video, i) => (
              <motion.a
                key={i}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="video-thumbnail" style={{ overflow: 'hidden' }}>
                  <img
                    src={heritageImages[i % heritageImages.length]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.3) sepia(40%)',
                    }}
                  />
                  <div className="video-play-icon" style={{ position: 'relative', zIndex: 1 }}><Play size={24} fill="white" /></div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-desc">{video.description}</p>
                  <p className="video-source">{video.source}</p>
                  <span className="video-watch-btn">
                    <Play size={14} /> Watch on YouTube
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      )}

      {/* ===== PHOTO GALLERY ===== */}
      {person.gallery && person.gallery.length > 0 && (
        <section className="section-full" style={{ background: 'var(--white)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="section">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-gold-line" />
              <h2 className="section-title-en">Moments & Memories</h2>
              <p className="section-title-bn">ছবি ও স্মৃতি</p>
            </motion.div>

            <div className="gallery-masonry">
              {person.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  className="gallery-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="gallery-image" style={{ overflow: 'hidden' }}>
                    <img
                      src={img.src || heritageImages[i % heritageImages.length]}
                      alt={img.caption}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'sepia(30%) saturate(0.7)',
                        transition: 'transform 0.5s',
                      }}
                      onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={e => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div className="gallery-caption">
                    <p>{img.caption}</p>
                    {img.captionBangla && <p className="caption-bn">{img.captionBangla}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== SOURCES ===== */}
      {person.sources && person.sources.length > 0 && (
        <section className="section">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-gold-line" />
            <h2 className="section-title-en">Sources & References</h2>
            <p className="section-title-bn">উৎস ও তথ্যসূত্র</p>
          </motion.div>

          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            {person.sources.map((source, i) => (
              <p key={i} style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                padding: '0.8rem 0',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                {source}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ===== BACK TO HOME ===== */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'var(--charcoal)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/images/heritage/victory-day.avif"
          alt=""
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.08,
            filter: 'sepia(60%) hue-rotate(80deg) saturate(0.3)',
          }}
        />
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: 'var(--gold)',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
        }}>
          <ChevronLeft size={18} />
          {t('Back to All Heroes', 'সকল গৌরবে ফিরুন')}
        </Link>
      </section>
    </>
  )
}
