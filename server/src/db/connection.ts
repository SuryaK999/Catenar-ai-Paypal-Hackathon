import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as dotenv from 'dotenv';
import * as schema from './schema.js';

dotenv.config();
dotenv.config({ path: '../.env' });

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://catenar_owner:placeholder@ep-placeholder.us-east-2.aws.neon.tech/catenar?sslmode=require';

export const sql = neon(connectionString);
export const db = drizzle(sql, { schema });
