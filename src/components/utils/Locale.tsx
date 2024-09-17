import { useTranslation } from 'react-i18next';
import { useContext, createContext, ReactNode, useState, useMemo } from 'react';

type ILocaleContext = {
    locale: string;
    setLocale: (locale: string) => void;
};
/**
 * Contexte pour gérer la locale dans l'application.
 * @type {React.Context<ILocaleContext>}
 */
const localeContext = createContext<ILocaleContext>({
    locale: 'en',
    setLocale: () => {},
});

/**
 * Fournit le contexte de la locale à ses enfants.
 *
 * @param {{ children: ReactNode }} props - Les enfants du composant.
 * @returns {JSX.Element} Le composant enveloppant les enfants avec le contexte de la locale.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState('en');
    const { i18n } = useTranslation();

    /**
     * Fonction pour changer la locale.
     * Modifie l'état local et met à jour la langue dans i18n.
     *
     * @param {string} locale - La nouvelle locale à définir.
     */
    const handleLocaleChange = useMemo(() => {
        return (locale: string) => {
            setLocale(locale);
            i18n.changeLanguage(locale);
        };
    }, []);

    return (
        <localeContext.Provider
            value={{ locale: locale, setLocale: handleLocaleChange }}
        >
            {children}
        </localeContext.Provider>
    );
}

/**
 * Hook personnalisé pour accéder au contexte de la locale.
 *
 * @returns {ILocaleContext} La locale actuelle et la fonction pour la changer.
 */
export function useLocale() {
    return useContext(localeContext);
}
