import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Plot from './Plot';

// jest.mock('../../utils', () => ({
//     python_api: () => ({
//         plot_api: {
//             load_file: jest.fn().mockResolvedValue({
//                 file_path: 'test/file/path.csv',
//                 columns: ['Column1', 'Column2', 'Column3'],
//             }),
//         },
//     }),
// }));

describe('PlotMenu', () => {
    it('should render', async () => {
        const container = render(<Plot />);
        fireEvent.click(container.getByRole('button', { name: 'menu' }));

        await act(async () => {
            fireEvent.click(
                screen.getByRole('menuitem', { name: 'Open File' }),
            );
        });
    });
});
