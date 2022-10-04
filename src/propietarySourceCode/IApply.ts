import { DomainEvent } from "./domainEvent";

export interface IApply<TEvent extends DomainEvent> {
  apply(event: TEvent): void
}
