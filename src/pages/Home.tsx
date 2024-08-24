import { Toolbar, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    return (
        <Box sx={{ pl: 2, pr: 2, pt: 1 }}>
            <Toolbar />
            <h1>{t('whatsNew')}</h1>
            Blablabla
            <h1>Tutorial</h1>
        </Box>
    );
}
