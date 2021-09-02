import { setupServer } from 'msw/node';
import { handlers } from './server-handlers';

export { rest } from 'msw';
export { usersApi } from './server-handlers';

export const server = setupServer(...handlers);
