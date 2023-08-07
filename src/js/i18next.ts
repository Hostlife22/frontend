import i18n from 'i18next';
import locizeBackend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';
// @ts-ignore
import { locizePlugin as inContextEditorPlugin } from 'locize';

import { da, de, en, fi, fr, it, no, sv } from './locales';

enum LanguageCode {
  Da = 'da',
  De = 'de',
  En = 'en',
  Fi = 'fi',
  Fr = 'fr',
  It = 'it',
  No = 'no',
  Sv = 'sv',
}

const supportedLanguageCodes: Array<LanguageCode> = [
  LanguageCode.Da,
  LanguageCode.De,
  LanguageCode.En,
  LanguageCode.Fi,
  LanguageCode.Fr,
  LanguageCode.It,
  LanguageCode.No,
  LanguageCode.Sv,
];

export const resources = {
  da,
  de,
  en,
  fi,
  fr,
  it,
  no,
  sv,
};

i18n
  /**
   * @see {@link https://github.com/locize/i18next-locize-backend}
   */
  .use(locizeBackend)
  /**
   * @see {@link https://github.com/locize/locize}
   * @see {@link https://docs.locize.com/more/incontext-editor/migrating-from-the-old-incontext-editor}
   */
  .use(inContextEditorPlugin)
  /**
   * @see {@link https://react.i18next.com}
   */
  .use(initReactI18next)
  /**
   * @see {@link https://www.i18next.com/overview/configuration-options}
   */
  .init({
    backend: {
      loadPath: `/src/{{lng}}/{{ns}}.json?${new Date().getTime()}`,
      projectId: '8e456486-4642-407a-94bd-cf341d210e55',
      referenceLng: 'en',
      version: 'latest',
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    preload: false,
    react: {
      transKeepBasicHtmlNodesFor: ['b', 'strong'],
      useSuspense: false,
    },
    resources,
    supportedLngs: supportedLanguageCodes.map(code => code.toLowerCase()),
  });

export { i18n, supportedLanguageCodes };
