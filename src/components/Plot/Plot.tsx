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
import React, { useReducer, Dispatch, useState } from 'react';
// import { usePersistedState } from '@app/utils';
import { python_api } from '@app/utils';
import SelectMenu from '@app/components/generic/SelectMenu';
import Figure, { PlotParams as FigureParams } from 'react-plotly.js';
import { Template } from 'plotly.js';
import { useColorMode } from '@app/components/utils/ColorMode';
import { plotlyWhite, plotlyDark } from './PlotlyTemplate.json';

// enum ActionTypeEnum  {
//     loadFile = 'load-file',
//     titleChange = 'title-change',
//     xaxisChange = 'xaxis-change',
//     plotTypeCange = 'plot-type-change',
//     plotChange = 'plot-change'
// }
type ActionTypeEnum =
    | 'load-file'
    | 'title-change'
    | 'xaxis-change'
    | 'plot-type-change'
    | 'plot-change';

type PlotTypeEnum = 'scatter' | 'histogram';
// enum PlotTypeEnum {
//     scatter = 'scatter',
//     histogram = 'histogram',
// }
type IParams = {
    figure: FigureParams;
    toolbar: {
        plotType: PlotTypeEnum;
        sourceFile?: string;
        columns?: Array<string>;
        [key: string]: unknown;
    };
};

type IAction = {
    type: ActionTypeEnum;
    title?: string;
    columns?: Array<string>;
    sourceFile?: string;
    plotType?: PlotTypeEnum;
    figure?: FigureParams;
};

const plotTypeMapping: {
    [x in PlotTypeEnum]: {
        label: string;
        component: (props: ToolbarProps) => JSX.Element;
    };
} = {
    scatter: {
        label: 'Scatter',
        component: ScatterToolBar,
    },
    histogram: {
        label: 'Histogram',
        component: HistogramToolBar,
    },
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

export default function PlotSection() {
    const [params, dispatch] = useReducer(paramsDispatcher, {
        figure: { data: [], layout: {} },
        toolbar: { plotType: 'histogram' },
    });

    const { data, layout } = params.figure;
    const { sourceFile, plotType } = params.toolbar;
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const open = true;

    const template = colorMode == 'light' ? plotlyWhite : plotlyDark;

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

    const toolbarComponent = plotTypeMapping[plotType].component;

    const toolbar = (
        <>
            <List>
                <Divider />
                <ListItemButton onClick={handleFileLoad}>
                    <ListItemIcon>
                        <FileOpen />
                    </ListItemIcon>
                    <ListItemText>Open File</ListItemText>
                </ListItemButton>
                {Boolean(sourceFile) && (
                    <>
                        <Tooltip title={sourceFile}>
                            <ListItem>
                                <ListItemIcon>
                                    <FilePresent />
                                </ListItemIcon>
                                <ListItemText>{sourceFile}</ListItemText>
                            </ListItem>
                        </Tooltip>
                        <ListItem>
                            <SelectMenu
                                label="Plot type"
                                id="plot-type"
                                values={['scatter', 'histogram']}
                                value={plotType}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'plot-type-change',
                                        plotType: e.target
                                            .value as PlotTypeEnum,
                                    })
                                }
                                includeNull={false}
                                sx={{ width: '100%' }}
                            />
                        </ListItem>
                    </>
                )}
            </List>
            <List>
                {React.createElement(toolbarComponent, {
                    dispatch: dispatch,
                    params: params,
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
                    layout={{
                        ...layout,
                        autosize: true,
                        template: template as unknown as Template,
                    }}
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
    params: IParams;
};
function ScatterToolBar({ dispatch, params }: ToolbarProps): JSX.Element {
    const variant = 'standard' as TextFieldVariants;
    const sx = { width: '100%' };
    const defaultProps = { variant: variant, sx: sx };

    const { columns: axes, title } = params.toolbar;
    return (
        <>
            {Boolean(axes) && (
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
                            values={axes}
                            {...defaultProps}
                        />
                    </ListItem>
                    <ListItem>
                        <SelectMenu
                            label="y-axis"
                            id="yaxis"
                            values={axes}
                            {...defaultProps}
                        />
                    </ListItem>
                </>
            )}
        </>
    );
}

function HistogramToolBar({ dispatch, params }: ToolbarProps): JSX.Element {
    const variant = 'standard' as TextFieldVariants;
    const sx = { width: '100%' };
    const defaultProps = { variant: variant, sx: sx };
    const [xaxis, setXaxis] = useState<null | string>(null);

    const { columns: axes, title } = params.toolbar;

    const handleXAxisChange = (axis: string) => {
        setXaxis(axis);
        python_api()
            ?.plot_api.plot_histogram(axis)
            .then((figure) => {
                dispatch({
                    type: 'plot-change',
                    figure: JSON.parse(figure),
                });
            });
    };
    return (
        <>
            {Boolean(axes) && (
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
                            values={axes}
                            value={xaxis}
                            onChange={(e) =>
                                handleXAxisChange(e.target.value as string)
                            }
                            {...defaultProps}
                        />
                    </ListItem>
                </>
            )}
        </>
    );
}

function paramsDispatcher(params: IParams, action: IAction): IParams {
    switch (action.type) {
        case 'load-file':
            return {
                ...params,
                toolbar: {
                    ...params.toolbar,
                    columns: action.columns,
                    sourceFile: action.sourceFile,
                },
            };
        case 'title-change':
            return {
                ...params,
                figure: {
                    ...params.figure,
                    layout: {
                        ...params.figure.layout,
                        title: action.title,
                    },
                },
            };
        case 'plot-type-change':
            return {
                ...params,
                toolbar: {
                    ...params.toolbar,
                    plotType: action.plotType as PlotTypeEnum,
                },
            };
        case 'plot-change':
            return {
                ...params,
                figure: action.figure as FigureParams,
            };
        default:
            return params;
    }
}
