import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelectMenu from './SelectMenu';

describe('SelectMenu', () => {
    const test = (values: null | Array<string>) => {
        render(<SelectMenu label="label" id="id" values={values} />);

        const length = values ? values.length + 1 : 1;
        fireEvent.mouseDown(screen.getByRole('combobox'));
        expect(screen.getAllByRole('option').length).toBe(length);
        expect(screen.getByText(/none/i)).toBeVisible();
    };
    it('should render', () => {
        render(
            <SelectMenu
                label="label"
                id="id"
                values={['val1', 'val2', 'val3']}
            />,
        );
        render(<SelectMenu label="label" id="id" values={null} />);
    });
    it('should contains None', () => test(null));
    it('should contains items', async () => test(['val1', 'val2', 'val3']));
});
