import { BRAND } from '@/constants'
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND,
    short_name: BRAND,
    description: BRAND + ' es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    lang: 'es-AR',
    dir: 'ltr',
    categories: ['social', 'events', 'community', 'networking', 'lifestyle'],
    orientation: 'any',
    scope: '/',
    prefer_related_applications: false,
    related_applications: [],
    shortcuts: [
      {
        name: 'Ver Eventos',
        short_name: 'Eventos',
        description: 'Ver los próximos eventos de ' + BRAND,
        url: '/events',
        icons: [{ src: '/icon.png', sizes: '192x192' }]
      },
      {
        name: 'Mi Perfil',
        short_name: 'Perfil',
        description: 'Ver y editar tu perfil',
        url: '/profile',
        icons: [{ src: '/icon.png', sizes: '192x192' }]
      }
    ],
    screenshots: [
      {
        src: '/screenshot1.png',
        sizes: '1280x720',
        type: 'image/png'
      },
      {
        src: '/screenshot2.png',
        sizes: '1280x720',
        type: 'image/png'
      }
    ]
  }
}