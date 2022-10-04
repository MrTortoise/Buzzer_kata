
import { IApply } from "./IApply"
import { DomainEvent } from "./domainEvent"
import { Command } from "./command"
import { newUuid, UUID } from "./uuid"

export class TemperatureMeasured implements DomainEvent {
  readonly id = newUuid()
  readonly created = new Date()
  readonly temperature: number
  readonly eventType = this.constructor.name

  constructor(temp: number) {
    this.temperature = temp
  }
}

export class StartSensorCommand implements Command {
  readonly id: UUID = newUuid()
  readonly correlationId: UUID = newUuid()
  readonly systemToPushTemperatureTo: IApply<TemperatureMeasured>

  constructor(systemToPushTemperatureTo: IApply<TemperatureMeasured>) {
    this.systemToPushTemperatureTo = systemToPushTemperatureTo
  }
} 