import { Dispatch, createContext, useEffect, useReducer } from 'react';
import produce from 'immer';
import { SET_USERS, ADD_USER, UPDATE_USER, usersApi } from './constants';
import type { usersState, actions } from './types';

type UsersProviderProps = {
  children: import('react').ReactNode;
};

export const UsersContext = createContext<usersState>(null);
export const UsersDispatchContext = createContext<Dispatch<actions>>(null!);

const usersReducer = produce((draft: usersState, action: actions) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    case ADD_USER: {
      draft?.push(action.payload);
      break;
    }
    case UPDATE_USER: {
      if (!draft) return;
      const { tempId, user } = action.payload;
      const updateIndex = draft.findIndex(
        (user) => 'tempId' in user && user.tempId === tempId,
      );
      draft[updateIndex] = user;
      break;
    }
  }
});

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, dispatch] = useReducer(usersReducer, null);

  // on init, fetch users
  useEffect(() => {
    let isCancelled = false;
    const fetchUsers = async () => {
      const res = await fetch(usersApi);
      if (res.ok) {
        const payload = await res.json();
        if (!isCancelled) dispatch({ type: SET_USERS, payload });
      }
    };
    fetchUsers();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
};
