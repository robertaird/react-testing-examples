import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { UsersProvider, UsersContext } from '../UserContext';

import { server } from '../mocks/server';

// this can also go in setupTests.ts
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UsersProvider', () => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <UsersProvider>{children}</UsersProvider>
  );
  it('fetches a list of users', async () => {
    render(
      <Wrapper>
        <UsersContext.Consumer>
          {(value) =>
            value?.map(({ id, name }) => <span key={id}>{name}</span>)
          }
        </UsersContext.Consumer>
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Steve/)).toBeInstanceOf(Element);
    });
  });
});
