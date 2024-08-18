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
import React, { useReducer, Dispatch } from 'react';
// import { usePersistedState } from '@app/utils';
import { python_api } from '@app/utils';
import SelectMenu from '@app/components/generic/SelectMenu';
import BurgerMenu from '@app/components/generic/BurgerMenu';

import Figure, { PlotParams } from 'react-plotly.js';

type IPlotParams = {
    figure: PlotParams;
    toolbar: {
        sourceFile?: string;
        columns?: Array<string>;
        [key: string]: unknown;
    };
};

// type IPlotParams = {
//     data: Array<{ [key: string]: unknown }>;
//     layout: { [key: string]: unknown };
//     state: {
//         sourceFile?: string;
//         [key: string]: unknown;
//     };
// };
type IAction = {
    type: 'load-file' | 'title-change' | 'xaxis-change';
    title?: string;
    columns?: Array<string>;
    sourceFile?: string;
};

type BasePlotProps = {
    loadFile: () => void;
    plotParams: IPlotParams;
    dispatch: Dispatch<IAction>;
    toolbarComponent: (props: ToolbarProps) => JSX.Element;
};
function BasePlot({
    loadFile,
    plotParams,
    dispatch,
    toolbarComponent,
}: BasePlotProps) {
    // const defaultLayout = {
    //     width: '100%',
    //     height: '100%',
    // };
    const { data, layout } = plotParams.figure;
    const state = plotParams.toolbar;
    return (
        <Stack spacing={2} direction={'column'}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static"></AppBar>
                <Toolbar>
                    <BurgerMenu>
                        <MenuItem onClick={loadFile}>
                            <ListItemIcon>
                                <FileOpen />
                            </ListItemIcon>
                            <ListItemText>Open File</ListItemText>
                        </MenuItem>
                    </BurgerMenu>
                    <IconButton>
                        {Boolean(state.sourceFile) && (
                            <Tooltip title={state.sourceFile}>
                                <FilePresent />
                            </Tooltip>
                        )}
                    </IconButton>
                    {React.createElement(toolbarComponent, {
                        dispatch: dispatch,
                        plotParams: plotParams,
                    })}
                </Toolbar>
            </Box>
            <Figure data={data} layout={layout} />
        </Stack>
    );
}

type ToolbarProps = {
    dispatch: Dispatch<IAction>;
    plotParams: IPlotParams;
};
function ScatterPlotToolBar({ dispatch, plotParams }: ToolbarProps) {
    const variant = 'standard' as TextFieldVariants;
    const sx = { mr: 1, ml: 1, pb: 2, minWidth: 120 };
    const defaultProps = { variant: variant, sx: sx };

    const { columns: axis, title } = plotParams.toolbar;
    return (
        <>
            {Boolean(axis) && (
                <>
                    <TextField
                        label="title"
                        value={title}
                        onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                        ) => {
                            dispatch({
                                type: 'title-change',
                                title: e.target.value,
                            });
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

function plotParamsReducer(
    plotParams: IPlotParams,
    action: IAction,
): IPlotParams {
    switch (action.type) {
        case 'load-file':
            return {
                figure: plotParams.figure,
                toolbar: {
                    columns: action.columns,
                    sourceFile: action.sourceFile,
                },
            };
        case 'title-change':
            return {
                figure: {
                    ...plotParams.figure,
                    layout: {
                        ...plotParams.figure.layout,
                        title: action.title,
                    },
                },
                toolbar: plotParams.toolbar,
            };
        default:
            return plotParams;
    }
}

export default function PlotSection() {
    const [plotParams, dispatch] = useReducer(plotParamsReducer, {
        figure: { data: [], layout: {} },
        toolbar: {},
    });

    const handleFileLoad = () => {
        python_api()
            ?.plot_api.load_file()
            .then((results) => {
                dispatch({
                    type: 'load-file',
                    columns: results.columns,
                    sourceFile: results.file_path,
                });
            });
    };

    return (
        <BasePlot
            loadFile={handleFileLoad}
            plotParams={plotParams}
            dispatch={dispatch}
            toolbarComponent={ScatterPlotToolBar}
        />
    );
}
