import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

/**
 * Constantes représentant les différentes routes de l'application.
 */
export const ROUTE = {
    home: 'home',
    plot: 'plot',
};

type IRouteContext = {
    currentRoute: string;
    setRoute: Dispatch<SetStateAction<string>>;
};

/**
 * Contexte pour gérer la route actuelle dans l'application.
 * @type {React.Context<IRouteContext>}
 */
const RouteContext = createContext<IRouteContext>({
    currentRoute: ROUTE.home,
    setRoute: () => {},
});

/**
 * Fournit le contexte de la route à ses enfants.
 *
 * @param {{ children: ReactNode }} props - Les enfants du composant.
 * @returns {JSX.Element} Le composant enveloppant les enfants avec le contexte de la route.
 */
export function RouteProvider({ children }: { children: ReactNode }) {
    const [currentRoute, setRoute] = useState(ROUTE.home);
    return (
        <RouteContext.Provider value={{ currentRoute, setRoute }}>
            {children}
        </RouteContext.Provider>
    );
}

/**
 * Hook personnalisé pour accéder au contexte de la route.
 *
 * @returns {IRouteContext} La route actuelle et la fonction pour la changer.
 */
export function useRoute() {
    return useContext(RouteContext);
}
