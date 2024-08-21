import { Box, Toolbar, IconButton, CssBaseline, AppBar } from '@mui/material';
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
            sx={{
                color:
                    route === currentRoute ? 'primary.light' : 'default.light',
            }}
        >
            {icon}
        </IconButton>
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
        <Box sx={{ display: 'flex' }}>
            <AppBar
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                position="fixed"
                // color="transparent"
                elevation={2}
            >
                <CssBaseline />
                <Toolbar>
                    <NavButton route={ROUTE.home} icon={<HomeIcon />} />
                    <NavButton route={ROUTE.plot} icon={<Scatter />} />
                </Toolbar>
            </AppBar>
            {inner}
        </Box>
    );
}

// const theme = createTheme({
//     palette: { active: { main: '#FFFFFF', light: '#FFFFFF', dark: '#000000' } },
// });

export default function App() {
    return (
        <RouteProvider>
            <AppContent />
        </RouteProvider>
    );
}
