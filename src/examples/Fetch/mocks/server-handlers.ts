import { rest } from 'msw';
import { users } from './users';
import type { postUser } from '../types/users';

const basePath = '/api';
export const usersApi = `${basePath}/users`;
// mocked api endpoints
export const handlers = [
  rest.get(basePath, async (req, res, ctx) => {
    return res(ctx.json({ message: 'hi' }));
  }),
  rest.get(usersApi, async (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.post<postUser>(usersApi, async (req, res, ctx) => {
    const body = req.body;
    const newUser = { ...body, id: users.length };
    users.push(newUser);
    return res(ctx.json(newUser));
  }),
];
