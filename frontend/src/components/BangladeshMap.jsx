import { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLanguage } from '../context/LanguageContext'
import { DISTRICTS } from '../assets/districts'

const LOCATIONS = [
  { id: 'sheikh-mujibur-rahman', nameEn: 'Sheikh Mujibur Rahman', nameBn: 'বঙ্গবন্ধু শেখ মুজিবুর রহমান', role: 'Father of the Nation', lat: 23.253, lng: 89.944 },
  { id: 'sheikh-hasina', nameEn: 'Sheikh Hasina', nameBn: 'শেখ হাসিনা', role: 'Longest-serving PM', lat: 23.269, lng: 89.958 },
  { id: 'kazi-nazrul-islam', nameEn: 'Kazi Nazrul Islam', nameBn: 'কাজী নজরুল ইসলাম', role: 'National Poet', lat: 23.636, lng: 87.221 },
  { id: 'jagadish-chandra-bose', nameEn: 'Jagadish Chandra Bose', nameBn: 'আচার্য জগদীশ চন্দ্র বসু', role: 'Scientist', lat: 24.754, lng: 90.407 },
  { id: 'muhammad-yunus', nameEn: 'Muhammad Yunus', nameBn: 'ড. মুহাম্মদ ইউনূস', role: 'Nobel Laureate', lat: 22.357, lng: 91.783 },
  { id: 'begum-rokeya', nameEn: 'Begum Rokeya', nameBn: 'বেগম রোকেয়া', role: 'Social Reformer', lat: 25.747, lng: 89.251 },
  { id: 'mashrafe-mortaza', nameEn: 'Mashrafe Mortaza', nameBn: 'মাশরাফি মর্তুজা', role: 'Cricket Legend', lat: 23.163, lng: 89.496 },
  { id: 'sm-sultan', nameEn: 'S. M. Sultan', nameBn: 'এস. এম. সুলতান', role: 'Painter', lat: 23.152, lng: 89.488 },
  { id: 'fazle-hasan-abed', nameEn: 'Fazle Hasan Abed', nameBn: 'ফজলে হাসান আবেদ', role: 'Founder of BRAC', lat: 24.89, lng: 91.161 },
  { id: 'muhammed-zafar-iqbal', nameEn: 'Zafar Iqbal', nameBn: 'ড. মুহম্মদ জাফর ইকবাল', role: 'Scientist & Writer', lat: 24.899, lng: 91.872 },
  { id: 'zainul-abedin', nameEn: 'Zainul Abedin', nameBn: 'জয়নুল আবেদিন', role: 'Father of Modern Art', lat: 24.439, lng: 90.786 },
  { id: 'ziaur-rahman', nameEn: 'Ziaur Rahman', nameBn: 'জিয়াউর রহমান', role: 'President', lat: 24.847, lng: 89.373 },
  { id: 'khaleda-zia', nameEn: 'Begum Khaleda Zia', nameBn: 'বেগম খালেদা জিয়া', role: "Bangladesh's First Woman PM", lat: 25.622, lng: 88.635 },
  { id: 'fazlur-rahman-khan', nameEn: 'Fazlur Rahman Khan', nameBn: 'ড. ফজলুর রহমান খান', role: 'Structural Engineer', lat: 23.81, lng: 90.413 },
  { id: 'kazi-salahuddin', nameEn: 'Kazi Salahuddin', nameBn: 'কাজী সালাউদ্দিন', role: 'Football Legend', lat: 23.744, lng: 90.374 },
  { id: 'jamal-nazrul-islam', nameEn: 'Jamal Nazrul Islam', nameBn: 'প্রফেসর জামাল নজরুল ইসলাম', role: 'Cosmologist', lat: 23.545, lng: 89.174 },
  { id: 'shakib-al-hasan', nameEn: 'Shakib Al Hasan', nameBn: 'সাকিব আল হাসান', role: 'Cricket All-rounder', lat: 23.488, lng: 89.424 },
]

const countryStyle = {
  color: '#c5a55a',
  weight: 2,
  opacity: 1,
  fillColor: '#c5a55a',
  fillOpacity: 0.12,
}

const goldMarkerIcon = L.divIcon({
  className: '',
  iconSize: [28, 36],
  iconAnchor: [14, 34],
  popupAnchor: [0, -38],
  html: '<div class="gold-marker"><span class="gold-marker-dot"></span></div>',
})

function districtIcon() {
  return L.divIcon({
    className: '',
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    html: '<div class="district-dot"></div>',
  })
}

function FitBounds({ data }) {
  const map = useMap()
  useEffect(() => {
    if (data && data.features && data.features.length) {
      const bounds = L.geoJSON(data).getBounds()
      bounds.extend([20.5, 86.5])
      bounds.extend([27.5, 93.2])
      map.fitBounds(bounds, { padding: [32, 32] })
    }
  }, [map, data])
  return null
}

export default function BangladeshMap() {
  const { language } = useLanguage()
  const [mapData, setMapData] = useState(null)

  useEffect(() => {
    fetch('/api/map')
      .then(r => r.json())
      .then(data => setMapData(data))
      .catch(() => setMapData(null))
  }, [])

  const markers = useMemo(() => DISTRICTS.map(d => ({ ...d, icon: districtIcon() })), [])

  return (
    <div className="map-frame">
      <MapContainer
        center={[23.7, 90.2]}
        zoom={6}
        minZoom={3}
        maxZoom={18}
        worldCopyJump
        scrollWheelZoom
        zoomControl
        attributionControl
        className="bd-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds data={mapData} />
        {mapData && <GeoJSON data={mapData} style={countryStyle} />}
        {markers.map(d => (
          <Marker key={d.id} position={[d.lat, d.lng]} icon={d.icon}>
            <Popup>
              <div className="map-popup">
                <p className="map-popup-role">{language === 'bn' ? 'জেলা' : 'District'}</p>
                <h4 className="map-popup-name">{language === 'bn' ? d.nameBn : d.nameEn}</h4>
                <p className="map-popup-role-tag">{d.division}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {LOCATIONS.map(loc => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={goldMarkerIcon}>
            <Popup>
              <div className="map-popup">
                <p className="map-popup-role">{language === 'bn' ? 'জন্মস্থান' : 'Birthplace'}</p>
                <h4 className="map-popup-name">{loc.nameEn}</h4>
                <p className="map-popup-name-bn">{loc.nameBn}</p>
                <p className="map-popup-role-tag">{loc.role}</p>
                <Link to={`/personality/${loc.id}`} className="map-popup-link">
                  {language === 'bn' ? 'গৌরব অন্বেষণ' : 'Explore'} →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}