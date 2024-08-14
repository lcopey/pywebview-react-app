// import { useWVGlobalState, python_api } from "../../utils.tsx";
import Stack from '@mui/material/Stack';
import Figure from './Figure.jsx';
import PlotMenu from './PlotMenu.tsx';

export default function Plot() {
    // const [fileSource] = useWVGlobalState("", "setFileSource");
    // const loadFile = () => python_api()?.load_file();

    return (
        <Stack spacing={2} direction={'column'}>
            <PlotMenu></PlotMenu>
            <Figure />
        </Stack>
    );
}
