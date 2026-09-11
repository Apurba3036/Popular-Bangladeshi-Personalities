import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{t('Page not found', 'পৃষ্ঠা পাওয়া যায়নি')}</p>
      <Link to="/">{t('Back to Home', 'হোমে ফিরুন')}</Link>
    </div>
  )
}
