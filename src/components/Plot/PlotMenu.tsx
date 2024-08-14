import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Menu,
    MenuItem,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilePresent from "@mui/icons-material/FilePresent";
import React, { useState } from "react";
import { python_api, useWVGlobalState } from "../../utils";

export default function PlotMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const closeMenu = () => setAnchorEl(null);
    const onLoadFileClick = () => {
        python_api()?.load_file();
        closeMenu();
    };
    const [fileSource] = useWVGlobalState(null, "setFileSource");

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"></AppBar>
            <Toolbar>
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
                <IconButton>
                    {Boolean(fileSource) && (
                        <Tooltip title={fileSource}>
                            <FilePresent />
                        </Tooltip>
                    )}
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    <MenuItem onClick={onLoadFileClick}>Load File</MenuItem>
                </Menu>
            </Toolbar>
        </Box>
    );
}
