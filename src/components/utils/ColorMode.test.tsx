import { render, screen, fireEvent } from '@testing-library/react';
import { ColorModeProvider, useColorMode } from './ColorMode';
import '@testing-library/jest-dom';
import { Typography } from '@mui/material';

// Composant de test simple pour utiliser le contexte
function TestComponent() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <div>
            <Typography data-testid="color-mode">{colorMode}</Typography>
            <button onClick={toggleColorMode}>Toggle Mode</button>
        </div>
    );
}

describe('ColorModeContext', () => {
    it('should provide the default color mode as light', () => {
        render(
            <ColorModeProvider>
                <TestComponent />
            </ColorModeProvider>,
        );

        const colorModeText = screen.getByTestId('color-mode');
        expect(colorModeText).toHaveTextContent('light');
    });

    it('should toggle the color mode from light to dark', () => {
        render(
            <ColorModeProvider>
                <TestComponent />
            </ColorModeProvider>,
        );

        const colorModeText = screen.getByTestId('color-mode');
        const toggleButton = screen.getByText('Toggle Mode');

        // Initial state should be light
        expect(colorModeText).toHaveTextContent('light');

        // Toggle to dark
        fireEvent.click(toggleButton);
        expect(colorModeText).toHaveTextContent('dark');
    });

    it('should toggle the color mode from dark to light', () => {
        render(
            <ColorModeProvider>
                <TestComponent />
            </ColorModeProvider>,
        );

        const colorModeText = screen.getByTestId('color-mode');
        const toggleButton = screen.getByText('Toggle Mode');

        // Toggle to dark first
        fireEvent.click(toggleButton);
        expect(colorModeText).toHaveTextContent('dark');

        // Toggle back to light
        fireEvent.click(toggleButton);
        expect(colorModeText).toHaveTextContent('light');
    });
});
