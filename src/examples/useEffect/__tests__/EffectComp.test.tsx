import { render, screen } from '@testing-library/react';
import { EffectComp } from '../EffectComp';

// For the sake of these tests, we'll pretend it's not using setTimeout.
// Otherwise, we could use jest.useFakeTimers to advance timers ahead

test('renders 0 on initial render', () => {
  render(<EffectComp />);
  expect(screen.getByText(/Current number is 0/i)).toBeInTheDocument();
});

test('renders 1 after initial useEffect', async () => {
  render(<EffectComp />);

  expect(await screen.findByText(/Current number is 1/i)).toBeInTheDocument();
});

test('renders 2 shortly after count is set to 1', async () => {
  render(<EffectComp />);

  expect(await screen.findByText(/Current number is 2/i)).toBeInTheDocument();
});
