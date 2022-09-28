import { SQLQuery } from '@databases/sqlite';
import { Request } from 'express';

interface iQueryParams {
  [key: string]: {
    validator(value: string | number): { value?: number; error?: string };
    defaultValue: number;
  };
}

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

export { iQueryParams, iExtendedRequest, iParsedQuery, iUser, DatabaseAccess };
