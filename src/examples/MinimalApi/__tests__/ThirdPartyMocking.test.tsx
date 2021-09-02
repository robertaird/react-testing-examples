import { SomeComp } from '../SomeComp';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const MockSvg = jest.fn();
jest.mock('../thirdPartyDependency', () => {
  return {
    MinimalApiComp: ({ onClick, color }: any) => (
      <button onClick={onClick}>
        <MockSvg color={color} className="svg-class" someProp />
      </button>
    ),
  };
});

describe('Third Party mocking', () => {
  beforeEach(() => {
    MockSvg.mockImplementation(({ color }) => <svg fill={color} />);
  });

  test('renders color prop', () => {
    render(<SomeComp />);

    expect(MockSvg).toBeCalledWith(
      expect.objectContaining({ color: 'blue' }),
      expect.anything(),
    );
  });

  test('switches from blue to green', () => {
    render(<SomeComp />);
    const button = screen.getByRole('button');
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(button);

    expect(MockSvg).toBeCalledWith(
      expect.objectContaining({ color: 'green' }),
      expect.anything(),
    );
  });
});
