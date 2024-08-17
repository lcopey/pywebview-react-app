import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    MenuItem,
    Tooltip,
    ListItemIcon,
    ListItemText,
    TextField,
    TextFieldVariants,
    Stack,
} from '@mui/material';
import FilePresent from '@mui/icons-material/FilePresent';
import FileOpen from '@mui/icons-material/FileOpen';
// import { useState } from 'react';
import { usePersistedState } from '@app/utils';
import { python_api } from '@app/utils';
import SelectMenu from '@app/components/generic/SelectMenu';
import BurgerMenu from '@app/components/generic/BurgerMenu';

import Figure from 'react-plotly.js';

type ScatterPlotToolBarT = {
    sourceFile: null | string;
    axis: null | Array<string>;
    title: string;
    onTitleChange: (title: string) => void;
};
function ScatterPlotToolBar({
    sourceFile,
    axis,
    onTitleChange,
    title = '',
}: ScatterPlotToolBarT) {
    const variant = 'standard' as TextFieldVariants;
    const sx = { mr: 1, ml: 1, pb: 2, minWidth: 120 };
    const defaultProps = { variant: variant, sx: sx };
    return (
        <>
            <IconButton>
                {Boolean(sourceFile) && (
                    <Tooltip title={sourceFile}>
                        <FilePresent />
                    </Tooltip>
                )}
            </IconButton>
            {Boolean(axis) && (
                <>
                    <TextField
                        label="title"
                        value={title}
                        onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                            onTitleChange(e.target.value);
                        }}
                        {...defaultProps}
                    ></TextField>
                    <SelectMenu
                        label="x-axis"
                        id="xaxis"
                        values={axis}
                        {...defaultProps}
                    />
                    <SelectMenu
                        label="y-axis"
                        id="yaxis"
                        values={axis}
                        {...defaultProps}
                    />
                </>
            )}
        </>
    );
}

export default function Plot() {
    const [sourceFile, setSourceFile] = usePersistedState<null | string>(
        null,
        'sourceFile',
        'session',
    );
    const [columns, setColums] = usePersistedState<null | Array<string>>(
        null,
        'columns',
        'session',
    );
    const [title, setTitle] = usePersistedState<string>(
        '',
        'title',
        'session'
    );

    const onLoadFileClick = () => {
        python_api()
            ?.plot_api.load_file()
            .then(({ file_path, columns }) => {
                setSourceFile(file_path);
                setColums(columns);
            });
    };

    return (
        <Stack spacing={2} direction={'column'}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"></AppBar>
                <Toolbar>
                    <BurgerMenu>
                        <MenuItem onClick={onLoadFileClick}>
                            <ListItemIcon>
                                <FileOpen />
                            </ListItemIcon>
                            <ListItemText>Open File</ListItemText>
                        </MenuItem>
                    </BurgerMenu>
                    <ScatterPlotToolBar
                        sourceFile={sourceFile}
                        axis={columns}
                        title={title}
                        onTitleChange={setTitle}
                    />
                </Toolbar>
            </Box>
            <Figure data={[]} layout={{ title: title }} />
        </Stack>
    );
}
