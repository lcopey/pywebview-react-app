import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    Tooltip,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilePresent from '@mui/icons-material/FilePresent';
import React, { ReactNode, useState } from 'react';
import { python_api } from '../../utils';

type SelectMenuProps = {
    label: string;
    id: string;
    values: null | Array<string>;
};

function SelectMenu({ label, id, values }: SelectMenuProps) {
    const labelId = `${id}-select-label`;
    let items =
        values?.map((value) => <MenuItem value={value}>{value}</MenuItem>) ||
        [];
    items = [
        <MenuItem>
            <em>None</em>
        </MenuItem>,
        ...items,
    ];
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select label={label} labelId={labelId}>
                {items}
            </Select>
        </FormControl>
    );
}
type MainDropDownMenuProps = {
    children: ReactNode;
    onClose?: () => void;
};

function MainDropDownMenu({ children, onClose }: MainDropDownMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
        if (onClose) {
            onClose();
        }
    };

    return (
        <>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={openMenu}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
                {React.Children.map(children, (child) =>
                    React.cloneElement(child as React.ReactElement, {
                        onClick: () => {
                            const parentOnClick = (child as React.ReactElement)
                                .props.onClick;
                            if (parentOnClick) {
                                parentOnClick();
                            }
                            closeMenu();
                        },
                    }),
                )}
            </Menu>
        </>
    );
}

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
                <MainDropDownMenu>
                    <MenuItem onClick={onLoadFileClick}>Load File</MenuItem>
                </MainDropDownMenu>
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
