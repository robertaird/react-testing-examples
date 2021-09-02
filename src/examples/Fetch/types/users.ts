export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type user = {
  id: number;
  name: string;
};

export type postUser = Optional<user, 'id'>;

export type users = user[];
