import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Scatter from '@mui/icons-material/ScatterPlot';
import Home from '@app/pages/Home';
import Plot from '@app/pages/Plot';
import {
    RouteProvider,
    useRoute,
    ROUTE,
    useSetRoute,
} from '@app/components/generic/Router';

type NavButtonProps = { route: string; icon: JSX.Element };
function NavButton({ route, icon }: NavButtonProps) {
    const setRoute = useSetRoute();
    const currentRoute = useRoute();
    return (
        <IconButton
            onClick={() => setRoute(route)}
            color={route === currentRoute ? 'primary' : 'default'}
        >
            {icon}
        </IconButton>
    );
}

function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" elevation={1}>
                <Toolbar>
                    <NavButton route={ROUTE.home} icon={<HomeIcon />} />
                    <NavButton route={ROUTE.plot} icon={<Scatter />} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function AppContent() {
    const route = useRoute();

    let inner: null | JSX.Element = null;
    switch (route) {
        case ROUTE.plot:
            inner = <Plot />;
            break;
        case ROUTE.home:
            inner = <Home />;
            break;
        default:
            inner = <Home />;
    }
    return (
        <>
            <NavBar />
            {inner}
        </>
    );
}

function App() {
    return (
        <RouteProvider>
            <AppContent />
        </RouteProvider>
    );
}

export default App;
