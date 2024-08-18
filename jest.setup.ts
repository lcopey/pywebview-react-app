import '@testing-library/jest-dom';
// To test with plotly
// https://github.com/plotly/react-plotly.js/issues/115
import 'jest-canvas-mock';
global.URL.createObjectURL = jest.fn();
