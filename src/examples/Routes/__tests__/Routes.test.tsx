import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Routes, LocationDisplay } from '../Routes';

test('User page renders with number id', () => {
  const history = createMemoryHistory();
  const route = '/user/123';
  history.push(route);
  render(
    <Router history={history}>
      <Routes />
    </Router>,
  );
  expect(screen.getByText(/User page 123/i)).toBeInTheDocument();
});

test('User page does not render with string id', () => {
  const history = createMemoryHistory();
  const route = '/user/abc';
  history.push(route);
  render(
    <Router history={history}>
      <Routes />
    </Router>,
  );
  expect(screen.getByText(/no match/i)).toBeInTheDocument();
});

test('full app rendering/navigating', () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Routes />
    </Router>,
  );

  expect(screen.getByText(/you are home/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/about/i), { button: 0 });

  expect(history.location.pathname).toBe('/about');
  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});

test('landing on a bad page', () => {
  const history = createMemoryHistory();
  history.push('/some/bad/route');
  render(
    <Router history={history}>
      <Routes />
    </Router>,
  );

  expect(screen.getByText(/no match/i)).toBeInTheDocument();
});

test('rendering a component that uses useLocation', () => {
  const history = createMemoryHistory();
  const route = '/some-route';
  history.push(route);
  render(
    <Router history={history}>
      <LocationDisplay />
    </Router>,
  );

  expect(screen.getByTestId('location-display')).toHaveTextContent(route);
});
