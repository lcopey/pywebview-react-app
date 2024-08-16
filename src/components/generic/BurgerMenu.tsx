import React, { ReactNode, useState } from 'react';
import { IconButton, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

type BurgerMenuProps = {
    children: ReactNode;
    onClose?: () => void;
};

export default function BurgerMenu({ children, onClose }: BurgerMenuProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const closeMenu = () => {
        setAnchorEl(null);
        if (onClose) {
            onClose();
        }
    };
    const handleMenuClick = (event: React.MouseEvent) => {
        if (anchorEl) {
            closeMenu();
            event.stopPropagation();
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
                onClick={handleIconClick}
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
                onClick={handleMenuClick}
            >
                {children}
            </Menu>
        </>
    );
}
