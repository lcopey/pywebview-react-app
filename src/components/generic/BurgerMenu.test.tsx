import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BurgerMenu from './BurgerMenu';
import { MenuItem } from '@mui/material';

describe('BurgerMenu', () => {
    const child = 'child';
    let ui: null | JSX.Element = null;
    beforeEach(() => {
        ui = (
            <BurgerMenu>
                <MenuItem>{child}</MenuItem>
            </BurgerMenu>
        );
    });

    it('should render', () => {
        render(ui);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
    it('should open and close on click on one child', () => {
        render(ui);
        const button = screen.getByRole('button');
        expect(screen.getByText(child)).not.toBeVisible();

        fireEvent.click(button);
        expect(screen.getByText(child)).toBeVisible();

        const childItem = screen.getByText(child);
        fireEvent.click(childItem);
        expect(screen.getByText(child)).not.toBeVisible();
    });
});
