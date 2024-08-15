import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    MenuItem,
    Tooltip,
} from '@mui/material';
import FilePresent from '@mui/icons-material/FilePresent';
import { useState } from 'react';
import { python_api } from '../../utils';
import SelectMenu from '../generic/SelectMenu';
import BurgerMenu from '../generic/BurgerMenu';

export default function PlotMenu() {
    const [sourceFile, setSourceFile] = useState<null | string>(null);
    const [columns, setColums] = useState<null | Array<string>>(null);

    const onLoadFileClick = () => {
        python_api()
            ?.plot_api.load_file()
            .then(({ file_path, columns }) => {
                setSourceFile(file_path);
                setColums(columns);
            });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"></AppBar>
            <Toolbar>
                <BurgerMenu>
                    <MenuItem onClick={onLoadFileClick}>Load File</MenuItem>
                </BurgerMenu>
                <IconButton>
                    {Boolean(sourceFile) && (
                        <Tooltip title={sourceFile}>
                            <FilePresent />
                        </Tooltip>
                    )}
                </IconButton>
                {Boolean(columns) && (
                    <SelectMenu label="x-axis" id="xaxis" values={columns} />
                )}
                {Boolean(columns) && (
                    <SelectMenu label="y-axis" id="yaxis" values={columns} />
                )}
            </Toolbar>
        </Box>
    );
}
