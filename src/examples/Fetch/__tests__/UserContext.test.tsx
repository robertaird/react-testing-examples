import { render, screen } from '@testing-library/react';
import React from 'react';
import { UsersProvider, UsersContext } from '../UserContext';
import { server, rest, usersApi } from '../mocks/server';

// this can also go in setupTests.ts
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UsersProvider', () => {
  const Wrapper = ({ children }: { children?: React.ReactNode }) => (
    <UsersProvider>{children}</UsersProvider>
  );
  const Component = () => (
    <Wrapper>
      <UsersContext.Consumer>
        {(value) => value?.map(({ id, name }) => <span key={id}>{name}</span>)}
      </UsersContext.Consumer>
    </Wrapper>
  );
  it('fetches a list of users', async () => {
    render(<Component />);

    expect(await screen.findByText(/Steve/)).toBeInstanceOf(Element);
  });

  it('handles errors', async () => {
    // override the usersApi get one time
    server.use(
      rest.get(usersApi, (req, res, ctx) => {
        return res.once(
          ctx.status(500),
          ctx.json({ message: 'Internal server error' }),
        );
      }),
    );

    render(<Component />);

    expect(await screen.findByText(/borked status 500/)).toBeInstanceOf(
      Element,
    );
  });
});
