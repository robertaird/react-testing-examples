import { user, postUser } from './users';

import * as constants from '../constants';

export type tempUser = postUser & { tempId?: number };
export type users = (tempUser | user)[];
export type usersState = null | users;

export type actions =
  | { type: typeof constants.SET_USERS; payload: users }
  | { type: typeof constants.ADD_USER; payload: tempUser }
  | {
      type: typeof constants.UPDATE_USER;
      payload: { tempId: number; user: user };
    };
