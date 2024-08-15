import { render } from '@testing-library/react';
// import {render, waitFor, screen, fireEvent} from "@testing-library/react"
import PlotMenu from './PlotMenu';

// needed to suppress the unused react error during test
//@ts-ignore
import React from 'react';

describe('PlotMenu', () => {
    test('render PlotMenu', async () => {
        render(<PlotMenu />);
    });
});
