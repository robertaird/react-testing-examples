import { useCallback, useContext } from 'react';
import { UsersContext, UsersDispatchContext } from './UserContext';
import { usersApi, ADD_USER, UPDATE_USER } from './constants';
import type { tempUser } from './types';

export const useUsers = () => useContext(UsersContext);
export const useUsersDispatch = () => useContext(UsersDispatchContext);
export const useAddUser = () => {
  const dispatch = useUsersDispatch();

  return useCallback(
    async (payload: tempUser) => {
      let isCancelled = false;
      const tempId = Date.now();
      dispatch({ type: ADD_USER, payload: { ...payload, tempId } });
      const res = await fetch(usersApi, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const user = await res.json();
        if (!isCancelled)
          dispatch({ type: UPDATE_USER, payload: { tempId, user } });
      }
      return () => {
        isCancelled = true;
      };
    },
    [dispatch],
  );
};
