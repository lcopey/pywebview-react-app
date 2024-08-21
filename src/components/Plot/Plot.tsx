import {
    Box,
    Toolbar,
    Tooltip,
    ListItemIcon,
    ListItemText,
    TextField,
    TextFieldVariants,
    List,
    ListItem,
    ListItemButton,
    Divider,
    useTheme,
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import FilePresent from '@mui/icons-material/FilePresent';
import FileOpen from '@mui/icons-material/FileOpen';
import { styled } from '@mui/material/styles';
import React, { useReducer, Dispatch } from 'react';
// import { usePersistedState } from '@app/utils';
import { python_api } from '@app/utils';
import SelectMenu from '@app/components/generic/SelectMenu';
import Figure, { PlotParams } from 'react-plotly.js';

type IPlotParams = {
    figure: PlotParams;
    toolbar: {
        sourceFile?: string;
        columns?: Array<string>;
        [key: string]: unknown;
    };
};

type ActionType = 'load-file' | 'title-change' | 'xaxis-change';
type IAction = {
    type: ActionType;
    title?: string;
    columns?: Array<string>;
    sourceFile?: string;
};

const drawerWidth = 250;
const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    flex: '0 0 auto',
    width: drawerWidth,
    whiteSpace: 'nowrap',
    [`& .MuiDrawer-paper`]: {
        boxSizing: 'border-box',
        width: drawerWidth,
        ...(open && {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
        ...(!open && {
            width: 0,
            // width: `calc(${theme.spacing(7)} + 1px)`,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        }),
    },
}));

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
    const { data, layout } = plotParams.figure;
    const state = plotParams.toolbar;
    const theme = useTheme();
    const open = true;

    const toolbar = (
        <>
            <List>
                <Divider />
                <ListItemButton onClick={loadFile}>
                    <ListItemIcon>
                        <FileOpen />
                    </ListItemIcon>
                    <ListItemText>Open File</ListItemText>
                </ListItemButton>
                {Boolean(state.sourceFile) && (
                    <Tooltip title={state.sourceFile}>
                        <ListItem>
                            <ListItemIcon>
                                <FilePresent />
                            </ListItemIcon>
                            <ListItemText>{state.sourceFile}</ListItemText>
                        </ListItem>
                    </Tooltip>
                )}
            </List>
            <List>
                {React.createElement(toolbarComponent, {
                    dispatch: dispatch,
                    plotParams: plotParams,
                })}
            </List>
        </>
    );
    return (
        <>
            <Drawer open={open} variant="permanent">
                <Toolbar />
                <Box>{toolbar}</Box>
            </Drawer>
            <Box
                sx={{
                    flexGrow: 1,
                    mt: `${theme.mixins.toolbar.minHeight}px`,
                    pt: 1,
                    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
                }}
                component="main"
            >
                <Figure
                    data={data}
                    layout={{ ...layout, autosize: true }}
                    useResizeHandler={true}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Box>
        </>
    );
}

type ToolbarProps = {
    dispatch: Dispatch<IAction>;
    plotParams: IPlotParams;
};
function ScatterPlotToolBar({ dispatch, plotParams }: ToolbarProps) {
    const variant = 'standard' as TextFieldVariants;
    const sx = { width: '100%' };
    const defaultProps = { variant: variant, sx: sx };

    const { columns: axis, title } = plotParams.toolbar;
    return (
        <>
            {Boolean(axis) && (
                <>
                    <Divider />
                    <ListItem>
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
                        />
                    </ListItem>
                    <ListItem>
                        <SelectMenu
                            label="x-axis"
                            id="xaxis"
                            values={axis}
                            {...defaultProps}
                        />
                    </ListItem>
                    <ListItem>
                        <SelectMenu
                            label="y-axis"
                            id="yaxis"
                            values={axis}
                            {...defaultProps}
                        />
                    </ListItem>
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
