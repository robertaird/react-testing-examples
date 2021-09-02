import { render, screen } from '@testing-library/react';

import { EffectComp } from '../EffectComp';

test('renders 0 on initial render', () => {
  render(<EffectComp />);
  expect(screen.getByText(/Current number is 0/i)).toBeInTheDocument();
});

test('renders 1 after initial useEffect', async () => {
  render(<EffectComp />);

  expect(await screen.findByText(/Current number is 1/i)).toBeInTheDocument();
});

test('renders 2 after initial useEffect', async () => {
  render(<EffectComp />);

  expect(await screen.findByText(/Current number is 2/i)).toBeInTheDocument();
});
