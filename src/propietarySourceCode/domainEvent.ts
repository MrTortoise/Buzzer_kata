import { UUID } from "./uuid"

export type DomainEvent = {
  id: UUID
  created: Date
  eventType: string
}