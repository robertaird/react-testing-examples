import { rest } from 'msw';
import { users } from './users';
import type { postUser } from '../types/users';

// mocked api endpoints
export const handlers = [
  rest.get('/api', async (req, res, ctx) => {
    return res(ctx.json({ message: 'hi' }));
  }),
  rest.get('/api/users', async (req, res, ctx) => {
    return res(ctx.json(users));
  }),
  rest.post<postUser>('/api/users', async (req, res, ctx) => {
    const body = req.body;
    const newUser = { ...body, id: users.length };
    users.push(newUser);
    return res(ctx.json(newUser));
  }),
];
