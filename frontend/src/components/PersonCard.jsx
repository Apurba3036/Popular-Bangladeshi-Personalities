import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const TITLE_WORDS = ['Dr.', 'Prof.', 'Sir', 'The', 'Md.', 'M.', 'Begum', 'S.']

function getYears(person) {
  return person.deathDate
    ? `${new Date(person.birthDate).getFullYear()} – ${new Date(person.deathDate).getFullYear()}`
    : `b. ${new Date(person.birthDate).getFullYear()}`
}

function getInitials(nameEnglish) {
  return nameEnglish
    .split(' ')
    .filter(w => !TITLE_WORDS.includes(w) && /[A-Za-z]/.test(w))
    .map(w => w[0])
    .join('')
    .slice(0, 2)
}

export default function PersonCard({ person, categoryName }) {
  const { language } = useLanguage()
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const hasPortrait = person.portrait && !imgError
  const initials = getInitials(person.nameEnglish)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/personality/${person.id}`} className="personality-card">
        <div className="card-image-wrapper">
          {hasPortrait ? (
            <img
              src={person.portrait}
              alt={person.nameEnglish}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              onLoad={() => setLoaded(true)}
              className={`lazy-img ${loaded ? 'loaded' : ''}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.45) sepia(20%)',
              }}
            />
          ) : (
            <div className="card-image-placeholder">{initials}</div>
          )}
          <span className="card-category-badge">
            {categoryName || person.categoryName || person.category}
          </span>
        </div>
        <div className="card-body">
          <h3 className="card-name-en">{person.nameEnglish}</h3>
          <p className="card-name-bn">{person.nameBangla}</p>
          <p className="card-profession">
            {(language === 'bn' ? person.professionBangla : person.profession).join(' • ')}
          </p>
          <p className="card-years">{getYears(person)}</p>
          <p className="card-short-bio">
            {language === 'bn' ? person.shortBioBangla : person.shortBioEnglish}
          </p>
          <span className="card-explore-btn">
            {language === 'bn' ? 'আরও জানুন' : 'Explore Legacy'} <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}