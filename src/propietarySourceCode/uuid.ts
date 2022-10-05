import { v4 as uuidv4 } from 'uuid';

export type UUID = string

export function newUuid(): UUID {
  return uuidv4()
}