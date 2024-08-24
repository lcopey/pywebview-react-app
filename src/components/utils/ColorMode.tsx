import { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

interface IColorModeContext {
    colorMode: 'light' | 'dark';
    toggleColorMode: () => void;
}

/**
 * Contexte pour gérer le mode de couleur dans l'application.
 * @type {React.Context<IColorModeContext>}
 */
const ColorModeContext: React.Context<IColorModeContext> =
    createContext<IColorModeContext>({
        colorMode: 'light',
        toggleColorMode: () => {},
    });

/**
 * Fournit le contexte du mode de couleur à ses enfants.
 *
 * @param {{ children: ReactNode }} props - Les enfants du composant.
 * @returns {JSX.Element} Le composant enveloppant les enfants avec le thème et le contexte du mode de couleur.
 */
export function ColorModeProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

    /**
     * Crée un thème Material-UI basé sur le mode de couleur actuel.
     * Utilise `useMemo` pour optimiser la performance en recalculant uniquement lorsque `colorMode` change.
     *
     * @type {import('@mui/material').Theme}
     */
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: colorMode,
                },
            }),
        [colorMode],
    );

    /**
     * Fonction pour basculer entre le mode clair et le mode sombre.
     * Utilise `useMemo` pour éviter de recréer la fonction à chaque rendu.
     *
     * @returns {() => void}
     */
    const handleColorMode = useMemo(() => {
        return () =>
            setColorMode((prevMode) =>
                prevMode === 'light' ? 'dark' : 'light',
            );
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <ColorModeContext.Provider
                value={{ colorMode, toggleColorMode: handleColorMode }}
            >
                {children}
            </ColorModeContext.Provider>
        </ThemeProvider>
    );
}

/**
 * Hook personnalisé pour accéder au contexte du mode de couleur.
 *
 * @returns {IColorModeContext} Le mode de couleur actuel et la fonction pour le basculer.
 */
export function useColorMode() {
    return useContext(ColorModeContext);
}
