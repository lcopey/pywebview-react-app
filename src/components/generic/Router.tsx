import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';

export const ROUTE = {
    home: 'home',
    plot: 'plot',
};

type SetRouteContextT = Dispatch<SetStateAction<string>>;

const RouteContext = createContext<null | string>(null);
const SetRouteContext = createContext<null | SetRouteContextT>(null);

export function RouteProvider({ children }: { children: ReactNode }) {
    const [route, setRoute] = useState(ROUTE.home);
    return (
        <RouteContext.Provider value={route}>
            <SetRouteContext.Provider value={setRoute}>
                {children}
            </SetRouteContext.Provider>
        </RouteContext.Provider>
    );
}

export function useRoute() {
    return useContext(RouteContext) as string;
}

export function useSetRoute() {
    return useContext(SetRouteContext) as SetRouteContextT;
}
