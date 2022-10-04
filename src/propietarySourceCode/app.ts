import { Dave } from "../dave";
import { Bus } from "./bus";
import { DomainEvent } from "./domainEvent";
import { IApply } from "./IApply";
import { setTimeout } from "timers/promises"
import { Sensor, SensorStopped, StartSensorCommand } from "./sensor";



/*
You do not own this code, you *cannot* change it.
Really you should not even be able to see it.
If you change this you will get sued and you will 
lose everything to megacorp before you get to court - because of all the paperwork.
*/
export class App implements IApply<SensorStopped> {
  readonly bus: Bus = new Bus()
  readonly dave: Dave;
  running = false;

  constructor(dave: Dave) {
    this.dave = dave
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  apply(_event: SensorStopped): void {
    this.running = false
  }

  async start(): Promise<void> {
    this.running = true;

    this.bus.subscribe("TemperatureMeasured", this.dave)
    this.bus.subscribe("SensorStopped", this)

    const command: StartSensorCommand = new StartSensorCommand(this.bus)

    const sensor = new Sensor()
    sensor.registerBus(this.bus)
    await sensor.handle(command)
  }

  async waitTillStopped(): Promise<void> {
    while (this.running) {
      await setTimeout(100);
    }
  }
}

