import {
    Box,
    Toolbar,
    IconButton,
    CssBaseline,
    AppBar,
    Typography,
    useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Scatter from '@mui/icons-material/ScatterPlot';
import Home from '@app/pages/Home';
import Plot from '@app/pages/Plot';
import { RouteProvider, useRoute, ROUTE } from '@app/components/utils/Router';
import SelectMenu from './components/generic/SelectMenu';
import { LocaleProvider, useLocale } from '@app/components/utils/Locale';
import { useColorMode, ColorModeProvider } from './components/utils/ColorMode';

type NavButtonProps = { route: string; icon: JSX.Element };
function NavButton({ route, icon }: NavButtonProps) {
    const { setRoute, currentRoute } = useRoute();

    return (
        <>
            <IconButton
                onClick={() => setRoute(route)}
                sx={{
                    color:
                        route === currentRoute
                            ? 'primary.light'
                            : 'default.light',
                }}
            >
                {icon}
            </IconButton>
        </>
    );
}

function AppContent() {
    const { currentRoute: route } = useRoute();
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();
    const { locale, setLocale } = useLocale();

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
                    <Typography flexGrow={1} />
                    <SelectMenu
                        label="lng"
                        id="lng"
                        value={locale}
                        values={['en', 'fr']}
                        includeNull={false}
                        onChange={(e) => {
                            setLocale(e.target.value as string);
                        }}
                    />
                    <IconButton
                        sx={{ ml: 1 }}
                        onClick={toggleColorMode}
                        color="inherit"
                    >
                        {theme.palette.mode === 'dark' ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
            {inner}
        </Box>
    );
}

export default function App() {
    return (
        <LocaleProvider>
            <ColorModeProvider>
                <RouteProvider>
                    <AppContent />
                </RouteProvider>
            </ColorModeProvider>
        </LocaleProvider>
    );
}
