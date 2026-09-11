import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, Sparkles, BookOpen, Users, Globe, Award,
  GraduationCap, Heart, Star
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const categoryIcons = {
  science: <Sparkles size={28} />,
  literature: <BookOpen size={28} />,
  arts: <Star size={28} />,
  history: <Users size={28} />,
  medicine: <Heart size={28} />,
  sports: <Award size={28} />,
  education: <GraduationCap size={28} />,
}

export default function Categories() {
  const { language, t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState([])
  const [personalities, setPersonalities] = useState([])
  const [loading, setLoading] = useState(true)
  const activeCategory = searchParams.get('cat') || 'all'

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        setCategories(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const url = activeCategory === 'all'
      ? '/api/personalities'
      : `/api/personalities?category=${activeCategory}`
    fetch(url)
      .then(r => r.json())
      .then(data => setPersonalities(data.personalities || []))
      .catch(() => setPersonalities([]))
  }, [activeCategory])

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-gold-line" />
          <h2 className="section-title-en">{t('National Icons', 'জাতীয় গৌরব')}</h2>
          <p className="section-title-bn">জাতীয় গৌরব</p>
          <p className="section-subtitle">
            {t(
              'Explore the lives and legacies of the people who shaped Bangladesh.',
              'বাংলাদেশকে গড়ে তোলা মানুষদের জীবন ও ঐতিহ্য অন্বেষণ করুন।'
            )}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => setSearchParams({})}
            style={{
              padding: '0.6rem 1.5rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              border: '1px solid',
              borderColor: activeCategory === 'all' ? 'var(--gold)' : 'var(--border-subtle)',
              background: activeCategory === 'all' ? 'var(--gold)' : 'var(--white)',
              color: activeCategory === 'all' ? 'var(--charcoal)' : 'var(--text-secondary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {t('All', 'সকল')}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ cat: cat.id })}
              style={{
                padding: '0.6rem 1.5rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: activeCategory === cat.id ? 'var(--gold)' : 'var(--border-subtle)',
                background: activeCategory === cat.id ? 'var(--gold)' : 'var(--white)',
                color: activeCategory === cat.id ? 'var(--charcoal)' : 'var(--text-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {language === 'bn' ? cat.nameBangla : cat.nameEnglish}
              <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>{cat.count}</span>
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="loading-spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : (
          <div className="personality-grid">
            {personalities.map((person, i) => {
              const years = person.deathDate
                ? `${new Date(person.birthDate).getFullYear()} – ${new Date(person.deathDate).getFullYear()}`
                : `b. ${new Date(person.birthDate).getFullYear()}`

              const initials = person.nameEnglish
                .split(' ')
                .filter(w => !['Dr.', 'The', 'Sir', 'Md.'].includes(w))
                .map(w => w[0])
                .join('')
                .slice(0, 2)

              return (
                <PersonCard key={person.id} person={person} initials={initials} years={years} language={language} categories={categories} />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
