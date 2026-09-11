import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const navLinks = [
    { to: '/', label: t('Home', 'হোম') },
    { to: '/categories', label: t('Heroes', 'গৌরব') },
    { to: '/about', label: t('About', 'পরিচিতি') },
  ]

  return (
    <>
      <nav className={`navbar ${(scrolled || !isHome) ? 'scrolled' : ''}`}>
        <Link to="/" className="navbar-logo">
          <div className="navbar-emblem">
            <img src="/images/symbols/flag-badge.png" alt="Bangladesh Flag" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
          </div>
          <div className="navbar-title">
            <span className="navbar-title-full">
              <span className="gold">Popular Personalities</span> of Bangladesh
            </span>
            <span className="navbar-title-short">
              <span className="gold">The</span> Heroes of Bangladesh
            </span>
          </div>
        </Link>

        <div className="navbar-links">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{ color: location.pathname === link.to ? '#C5A55A' : undefined }}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/search" className="navbar-search-btn">
            <Search size={18} />
          </Link>

          <div className="lang-switch">
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => language !== 'en' && toggleLanguage()}
            >
              EN
            </button>
            <button
              className={language === 'bn' ? 'active' : ''}
              onClick={() => language !== 'bn' && toggleLanguage()}
            >
              বাংলা
            </button>
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X size={28} />
        </button>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to}>{link.label}</Link>
        ))}
        <div className="lang-switch" style={{ marginTop: '1rem' }}>
          <button
            className={language === 'en' ? 'active' : ''}
            onClick={() => language !== 'en' && toggleLanguage()}
          >
            EN
          </button>
          <button
            className={language === 'bn' ? 'active' : ''}
            onClick={() => language !== 'bn' && toggleLanguage()}
          >
            বাংলা
          </button>
        </div>
      </div>
    </>
  )
}
