import { render, screen } from '@testing-library/react';
import { DateComp } from '../DateComp';

test('Date renders', () => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date('08-23-1993'));
  render(<DateComp />);
  expect(screen.getByText(/8\/23\/1993/i)).toBeInTheDocument();
});

test('date renders in mm/dd/yyyy format (real timers example)', () => {
  jest.useRealTimers();
  render(<DateComp />);
  expect(screen.getByText(/\d{1,2}\/\d{1,2}\/\d{4}/)).toBeInTheDocument();
});
