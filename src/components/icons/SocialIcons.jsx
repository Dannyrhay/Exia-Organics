const base = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

export const TikTokIcon = (props) => (
    <svg {...base} {...props}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

export const WhatsAppIcon = (props) => (
    <svg {...base} {...props}><circle cx="12" cy="12" r="10" /><path d="M16.95 14.45c.5.5.75 1.15.55 1.85-.25.9-1.5 1.55-2.6 1.4-3.55-.5-5.95-3.3-6.1-3.6-.15-.3-1-1.75-.4-2.85.35-.65 1.05-.9 1.55-.9.4 0 .7.2.85.45.2.4.6 1.5.7 1.7.1.25.05.5-.05.7-.1.25-.25.35-.5.55-.2.2-.45.3-.2.7.25.5 1.1 1.95 2.4 3.05.55.5 1.05.75 1.45.85.25.05.55-.05.7-.25.25-.3.65-.9.85-1.2" /></svg>
);

export const SnapchatIcon = (props) => (
    <svg {...base} {...props}><path d="M4.5 9c0 0 3-4 7.5-4s7.5 4 7.5 4v5c0 0-1.5 1-2.5 1s-4.5-2.5-5-2.5-4 2.5-5 2.5-2.5-1-2.5-1z" /><circle cx="8" cy="12" r="1" /><circle cx="16" cy="12" r="1" /></svg>
);

export const FacebookIcon = (props) => (
    <svg {...base} {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const byName = { facebook: FacebookIcon, tiktok: TikTokIcon, snapchat: SnapchatIcon, whatsapp: WhatsAppIcon };

/** Renders the icon for a SITE.socials `key`, e.g. <SocialIcon name="tiktok" />. */
export const SocialIcon = ({ name, ...props }) => {
    const Icon = byName[name];
    return Icon ? <Icon {...props} /> : null;
};
