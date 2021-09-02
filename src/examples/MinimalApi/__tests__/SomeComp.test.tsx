import { SomeComp } from '../SomeComp';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Svg } from '../thirdPartyDependency/Svg';

// mocking the Svg dependency directly
jest.mock('../thirdPartyDependency/Svg');

const MockSvg = Svg as jest.MockedFunction<typeof Svg>;

describe('SomeComp', () => {
  beforeEach(() => {
    MockSvg.mockImplementation(() => <div />);
  });

  test('renders color prop', () => {
    render(<SomeComp />);
    expect(Svg).toBeCalledWith(
      expect.objectContaining({ color: 'blue' }),
      expect.anything(),
    );
  });

  test('switches from blue to green', () => {
    render(<SomeComp />);
    const button = screen.getByRole('button');
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(button);

    expect(Svg).toBeCalledWith(
      expect.objectContaining({ color: 'green' }),
      expect.anything(),
    );
  });
});
