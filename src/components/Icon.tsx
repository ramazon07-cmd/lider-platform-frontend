import type { SVGProps } from 'react';

type IconName =
  | 'home' | 'briefcase' | 'file' | 'trophy' | 'gift' | 'crown' | 'bell' | 'user'
  | 'settings' | 'logout' | 'menu' | 'search' | 'filter' | 'map' | 'calendar'
  | 'users' | 'clock' | 'arrow-right' | 'check' | 'chevron-right' | 'chevron-down'
  | 'eye' | 'eye-off' | 'phone' | 'lock' | 'mail' | 'building' | 'globe'
  | 'star' | 'sparkles' | 'plus' | 'close' | 'upload' | 'download' | 'chart'
  | 'shield' | 'book' | 'headphones' | 'battery' | 'shirt' | 'info' | 'warning'
  | 'edit' | 'trash' | 'external' | 'heart' | 'compass';

export function Icon({ name, size = 20, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  };
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.8V21h13V9.8"/><path d="M9 21v-7h6v7"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6M9 9h2"/></>,
    trophy: <><path d="M8 3h8v5a4 4 0 0 1-8 0zM12 12v5M8 21h8M9 17h6"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4"/></>,
    gift: <><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8H8.5a2.5 2.5 0 1 1 2.4-3.2L12 8Zm0 0h3.5a2.5 2.5 0 1 0-2.4-3.2L12 8Z"/></>,
    crown: <><path d="m3 7 4 4 5-7 5 7 4-4-2 11H5z"/><path d="M5 21h14"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.55V20.3h-3v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7.1 15a1.7 1.7 0 0 0-1.55-1H5.5v-3h.05a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1-1.55V4.7h3v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.55 1H21v3h-.05a1.7 1.7 0 0 0-1.55 1Z"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h7v18h-7"/></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    filter: <><path d="M4 5h16l-6 7v5l-4 2v-7z"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    'arrow-right': <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    'chevron-right': <path d="m9 18 6-6-6-6"/>,
    'chevron-down': <path d="m6 9 6 6 6-6"/>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    'eye-off': <><path d="m3 3 18 18"/><path d="M10.6 6.2A10.4 10.4 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-2.1 2.8M6.2 6.2C3.6 8 2 12 2 12s3.5 6 10 6a10 10 0 0 0 4.3-.9M9.9 9.9a3 3 0 0 0 4.2 4.2"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    building: <><path d="M4 21V5l8-3v19M20 21V9l-8-3M2 21h20M8 7h.01M8 11h.01M8 15h.01M16 11h.01M16 15h.01"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    star: <path d="m12 2.5 3 6.1 6.7 1-4.8 4.7 1.1 6.6-6-3.2-6 3.2 1.1-6.6-4.8-4.7 6.7-1z"/>,
    sparkles: <><path d="m12 3-1.2 3.2L8 7.4l2.8 1.2L12 12l1.2-3.4L16 7.4l-2.8-1.2zM5 14l-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8zM19 12l-.8 2.2L16 15l2.2.8L19 18l.8-2.2L22 15l-2.2-.8z"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
    upload: <><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 14v6h14v-6"/></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 20h14"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    shield: <><path d="M12 2 4 5v6c0 5 3.4 9.2 8 11 4.6-1.8 8-6 8-11V5z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
    book: <><path d="M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 3z"/><path d="M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3z"/></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H4zM17 14h3v6h-3z"/></>,
    battery: <><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4M6 10v4M10 10v4M14 10v4"/></>,
    shirt: <><path d="m8 4-5 3 3 5 2-1v10h8V11l2 1 3-5-5-3a4 4 0 0 1-8 0Z"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
    warning: <><path d="M12 3 2.5 20h19z"/><path d="M12 9v4M12 17h.01"/></>,
    edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z"/></>,
    trash: <><path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/></>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v7H3V3h7"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5z"/></>
  };
  return <svg {...common} {...props}>{paths[name]}</svg>;
}
