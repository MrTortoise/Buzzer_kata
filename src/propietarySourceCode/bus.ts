

import { DomainEvent } from "./domainEvent";
import { IApply } from "./IApply";

type Subscriptions = { [key: string]: IApply<DomainEvent>[] }

export class Bus implements IApply<DomainEvent>{
  readonly subscriptions: Subscriptions = {}

  unsubscribe(eventType: string, instance: IApply<DomainEvent>): void {
    const subscribers = this.subscriptions[eventType]
    if (subscribers != undefined) {
      const index = subscribers.indexOf(instance)
      if (index > -1) {
        const newSubs = subscribers.splice(index + 1, 1)
        this.subscriptions[eventType] = newSubs
      }
    }
  }

  apply(event: DomainEvent) {
    const values = this.subscriptions[event.eventType]
    if (values != undefined) {
      values.forEach(s => s.apply(event))
    }
  }

  subscribe(eventType: string, instance: IApply<DomainEvent>) {
    if (this.subscriptions[eventType] == undefined) {
      this.subscriptions[eventType] = []
    }

    if (!this.subscriptions[eventType].includes(instance)) {
      this.subscriptions[eventType].push(instance)
    }
  }
}