import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search as SearchIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import PersonCard from '../components/PersonCard'
import { apiUrl } from '../api'

const categoryNames = {
  en: { science: 'Science & Technology', literature: 'Literature & Poetry', arts: 'Arts & Culture', history: 'National History', medicine: 'Medicine & Health', sports: 'Sports & Athletics', education: 'Education & Social Reform' },
  bn: { science: 'বিজ্ঞান ও প্রযুক্তি', literature: 'সাহিত্য ও কবিতা', arts: 'শিল্প ও সংস্কৃতি', history: 'জাতীয় ইতিহাস', medicine: 'চিকিৎসা ও স্বাস্থ্য', sports: 'খেলাধুলা ও ক্রীড়া', education: 'শিক্ষা ও সমাজ সংস্কার' },
}

export default function Search() {
  const { language, t } = useLanguage()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    const timer = setTimeout(() => {
      setLoading(true)
      fetch(apiUrl(`/api/personalities?search=${encodeURIComponent(query)}`))
        .then(r => r.json())
        .then(data => {
          setResults(data.personalities || [])
          setSearched(true)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="search-page">
      <div className="search-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-gold-line" />
          <h2 className="section-title-en">{t('Search Popular Personalities', 'জনপ্রিয় ব্যক্তিত্ব খুঁজুন')}</h2>
          <p className="section-title-bn">জনপ্রিয় ব্যক্তিত্ব খুঁজুন</p>
        </motion.div>

        <motion.div
          className="search-input-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SearchIcon size={20} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t('Search a popular personality...', 'জনপ্রিয় ব্যক্তিত্ব খুঁজুন...')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </motion.div>

        <p className="search-bangla-placeholder">
          {t(
            'Search by name, profession, field, or category',
            'নাম, পেশা, ক্ষেত্র বা বিভাগ অনুযায়ী অনুসন্ধান করুন'
          )}
        </p>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="loading-spinner" style={{ margin: '0 auto' }} />
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}
          >
            {t(
              'No personalities found matching your search.',
              'আপনার অনুসন্ধানের সাথে কোনো ব্যক্তিত্ব পাওয়া যায়নি।'
            )}
          </motion.p>
        )}

        {results.length > 0 && (
          <div className="personality-grid" style={{ marginTop: '2rem' }}>
            {results.map(person => (
              <PersonCard
                key={person.id}
                person={person}
                categoryName={categoryNames[language]?.[person.category] || person.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
