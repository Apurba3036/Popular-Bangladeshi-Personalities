import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer-watermark" />
      <div className="footer-main">
        <div className="footer-brand">
          <h3>Popular Personalities of Bangladesh</h3>
          <p className="brand-bn">বাংলাদেশের জনপ্রিয় ব্যক্তিত্ব</p>
          <p>
            {t(
              'Preserving the stories of the people who shaped Bangladesh.',
              'যাঁদের জীবন ও কর্ম বাংলাদেশকে সমৃদ্ধ করেছে, তাঁদের গল্প সংরক্ষণের একটি ডিজিটাল উদ্যোগ।'
            )}
          </p>
          <p className="desc-bn">
            {t('', 'যাঁদের জীবন ও কর্ম বাংলাদেশকে সমৃদ্ধ করেছে, তাঁদের গল্প সংরক্ষণের একটি ডিজিটাল উদ্যোগ।')}
          </p>
        </div>

        <div className="footer-col">
          <h4>{t('Explore', 'অন্বেষণ')}</h4>
          <Link to="/">{t('Home', 'হোম')}</Link>
          <Link to="/categories">{t('All Heroes', 'সকল গৌরব')}</Link>
          <Link to="/search">{t('Search', 'অনুসন্ধান')}</Link>
          <Link to="/about">{t('About', 'পরিচিতি')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('Categories', 'বিভাগ')}</h4>
          <Link to="/categories">{t('Science & Technology', 'বিজ্ঞান ও প্রযুক্তি')}</Link>
          <Link to="/categories">{t('Literature & Poetry', 'সাহিত্য ও কবিতা')}</Link>
          <Link to="/categories">{t('Arts & Culture', 'শিল্প ও সংস্কৃতি')}</Link>
          <Link to="/categories">{t('National History', 'জাতীয় ইতিহাস')}</Link>
          <Link to="/categories">{t('Sports', 'খেলাধুলা')}</Link>
        </div>

        <div className="footer-col">
          <h4>{t('Sources', 'উৎস')}</h4>
          <a href="http://banglapedia.org" target="_blank" rel="noopener noreferrer">Banglapedia</a>
          <a href="https://en.wikipedia.org/wiki/Bangladesh" target="_blank" rel="noopener noreferrer">Wikipedia</a>
          <a href="https://www.unesco.org" target="_blank" rel="noopener noreferrer">UNESCO</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          {t('© 2026 Popular Personalities of Bangladesh. ', '© ২০২৬ বাংলাদেশের জনপ্রিয় ব্যক্তিত্ব। ')}
          <span className="gold">{t('A Digital National Heritage Project.', 'একটি ডিজিটাল জাতীয় ঐতিহ্য প্রকল্প।')}</span>
        </p>
      </div>
    </footer>
  )
}
