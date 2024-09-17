import { render, screen, fireEvent } from '@testing-library/react';
// import { useTranslation } from 'react-i18next';
import { LocaleProvider, useLocale } from './Locale';
import '@testing-library/jest-dom';
import '@app/i18n';
import { useTranslation } from 'react-i18next';

// Composant de test simple pour utiliser le contexte
function TestComponent() {
    const { locale, setLocale } = useLocale();
    const { t } = useTranslation();

    return (
        <div>
            <p data-testid="locale">{locale}</p>
            <button onClick={() => setLocale('fr')}>
                Set Locale to French
            </button>
            <p data-testid="text">{t('whatsNew')}</p>
        </div>
    );
}

describe('LocaleContext', () => {
    it('should provide the default locale as en', () => {
        render(
            <LocaleProvider>
                <TestComponent />
            </LocaleProvider>,
        );

        const localeText = screen.getByTestId('locale');
        expect(localeText).toHaveTextContent('en');
    });

    it('should change the locale to fr when setLocale is called', () => {
        render(
            <LocaleProvider>
                <TestComponent />
            </LocaleProvider>,
        );

        const localeText = screen.getByTestId('locale');
        const button = screen.getByText('Set Locale to French');

        // Initial state should be 'en'
        expect(localeText).toHaveTextContent('en');

        // Click button to change locale to 'fr'
        fireEvent.click(button);
        expect(localeText).toHaveTextContent('fr');
    });

    it('should call i18n.changeLanguage when locale is changed', () => {
        render(
            <LocaleProvider>
                <TestComponent />
            </LocaleProvider>,
        );

        expect(screen.getByTestId('text')).toHaveTextContent("What's new");

        // Click button to change locale to 'fr'
        fireEvent.click(screen.getByText('Set Locale to French'));

        // Check if i18n.changeLanguage was called with 'fr'
        expect(screen.getByTestId('text')).toHaveTextContent('Quoi de neuf');
    });
});
