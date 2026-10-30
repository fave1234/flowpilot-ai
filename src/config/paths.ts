/** Route table. Import from here instead of hard-coding strings. */
export const paths = {
  home: '/',
  features: '/features',
  pricing: '/pricing',
  about: '/about',
  contact: '/contact',
  designSystem: '/design-system',
} as const;

export type Path = (typeof paths)[keyof typeof paths];
