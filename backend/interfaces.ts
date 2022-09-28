import { SQLQuery } from '@databases/sqlite';
import { Request } from 'express';

type QueryParamsValidator = {
  [key in keyof iParsedQuery]: {
    validator(value: number | string): { value?: number; error?: string };
    defaultValue: number;
  };
};

type UserFieldsValidator = {
  [key in keyof iUser]: {
    required?: boolean;
    transform?(value: number | string): string | number | null;
    validator?(value: number | string): string | number | null;
  };
};

interface iParsedQuery {
  limit: number;
  offset: number;
  [key: string]: string | number;
}

interface iExtendedRequest extends Request {
  parsedQuery: iParsedQuery;
}

interface iUser {
  id: number | string;
  name: string;
  email: string;
  phone?: string | null;
}

interface DatabaseAccess {
  runQuery(query: SQLQuery): Promise<any>;
}

export { QueryParamsValidator, iExtendedRequest, iParsedQuery, iUser, DatabaseAccess, UserFieldsValidator };
