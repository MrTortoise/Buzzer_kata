import { UUID } from "./uuid";

export type Command = {
  id: UUID,
  correlationId: UUID
}