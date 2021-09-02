import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { UsersProvider } from '../UserContext';
import { useUsers, useUsersDispatch, useAddUser } from '../hooks';
import { users } from '../types';

import { server } from '../mocks/server';

// this can also go in setupTests.ts
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UsersProvider>{children}</UsersProvider>
);

describe('UsersContext provider hooks', () => {
  it('useUsers provides users after fetch', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useUsers(), {
      wrapper,
    });
    expect(result.current).toBe(null);
    await waitForNextUpdate();

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Tony',
        }),
      ]),
    );
  });

  it('useUsersDispatch provides dispatch function', async () => {
    const { result } = renderHook(() => useUsersDispatch(), {
      wrapper,
    });
    expect(result.current).toEqual(expect.any(Function));
  });
});

describe('useAddUser', () => {
  it('provides callback to add user', async () => {
    const { result } = renderHook(() => useAddUser(), {
      wrapper,
    });
    expect(result.current).toEqual(expect.any(Function));
  });

  it('adds temp id to new user while awaiting actual id', async () => {
    const useHooks = () => {
      const addUser = useAddUser();
      const users = useUsers();
      return { addUser, users } as { addUser: typeof addUser; users: users };
    };
    const { result, waitForNextUpdate, waitForValueToChange } = renderHook(
      () => useHooks(),
      {
        wrapper,
      },
    );
    await waitForNextUpdate();

    const { addUser } = result.current;

    act(() => {
      addUser({ name: 'Franklin' });
    });

    expect(result.current.users).toEqual(
      expect.arrayContaining([
        { name: 'Franklin', tempId: expect.any(Number) },
      ]),
    );

    await waitForValueToChange(() => {
      return result.current.users[result.current.users.length - 1];
    });

    const newUser = result.current.users?.find(
      ({ name }) => name === 'Franklin',
    );
    expect(newUser).not.toHaveProperty('tempId');
    expect(newUser).toHaveProperty('id');
  });
});
