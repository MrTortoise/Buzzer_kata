
import { IApply } from "./IApply"
import { DomainEvent } from "./domainEvent"
import { Command } from "./command"
import { newUuid, UUID } from "./uuid"
import { IHandle } from "./IHandle"
import { Bus } from "./bus"

export class TemperatureMeasured implements DomainEvent {
  readonly id = newUuid()
  readonly created = new Date()
  readonly temperature: number
  readonly eventType = this.constructor.name

  constructor(temp: number) {
    this.temperature = temp
  }
}

export class SensorStopped implements DomainEvent {
  id = newUuid()
  created = new Date()
  eventType = this.constructor.name
}

export class StartSensorCommand implements Command {
  readonly id: UUID = newUuid()
  readonly correlationId: UUID = newUuid()
  readonly systemToPushTemperatureTo: IApply<TemperatureMeasured>

  constructor(systemToPushTemperatureTo: IApply<TemperatureMeasured>) {
    this.systemToPushTemperatureTo = systemToPushTemperatureTo
  }
}

export class Sensor implements IHandle<StartSensorCommand>{
  interval: NodeJS.Timer
  down = false
  bus: Bus

  stop() {
    clearInterval(this.interval)
    this.bus.apply(new SensorStopped())
  }

  registerBus(bus: Bus) {
    this.bus = bus
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(_command: StartSensorCommand): Promise<void> {
    let temp = 0
    this.interval = setInterval(function (sensor) {
      sensor.bus.apply(new TemperatureMeasured(temp))
      if (temp == 100) {
        sensor.down = true
      }
      if (sensor.down) {
        temp = temp - 1
      } else {
        temp = temp + 1
      }

      if (temp <= 0) sensor.stop()
    }, 1, this)
  }
}