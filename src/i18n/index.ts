import { uk } from './uk';
import { assetPath } from '../lib/paths';

export type Locale = 'en' | 'uk';
export const getLocale = (locale: string | undefined): Locale => (locale === 'uk' ? 'uk' : 'en');
export const languagePath = (locale: Locale) => assetPath(locale === 'uk' ? 'uk/' : '');

/** English is the source copy. Missing Ukrainian translations fail the build. */
export function translator(locale: string | undefined) {
  return (message: string): string => {
    if (getLocale(locale) === 'en') return message;
    if (!(message in uk)) throw new Error(`Missing Ukrainian translation: ${message}`);
    return uk[message as keyof typeof uk];
  };
}
