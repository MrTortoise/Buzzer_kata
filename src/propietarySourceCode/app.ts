import { Dave } from "../dave";
import { Bus } from "./bus";
import { IApply } from "./IApply";
import { IHandle } from "./IHandle";
import { StartSensorCommand, TemperatureMeasured } from "./sensor";
import { newUuid, UUID } from "./uuid";

/*
You do not own this code, you *cannot* change it.
Really you should not even be able to see it.
If you change this you will get sued and you will 
lose everything to megacorp before you get to court - because of all the paperwork.
*/
class Application {
  readonly bus: Bus = new Bus()
  readonly dave: Dave;
  constructor(dave: Dave) {
    this.dave = dave
  }

  async start(): Promise<void> {
    this.bus.subscribe("TemperatureMeasured", this.dave)
    const command: StartSensorCommand = new StartSensorCommand(this.bus)

    const sensor = new Sensor()
    await sensor.handle(command)
  }
}

export class Sensor implements IHandle<StartSensorCommand>{
  interval: NodeJS.Timer
  isStopped = false
  down = false

  stop() {
    if (this.interval != undefined) {
      clearInterval(this.interval)
      this.isStopped = true;
    }
  }
  async handle(command: StartSensorCommand): Promise<void> {
    let temp = 0
    this.interval = setInterval(function (sensor) {
      command.systemToPushTemperatureTo.apply(new TemperatureMeasured(temp))
      if (temp == 100) {
        this.down = true
      }
      if (this.down) {
        temp = temp - 1
      } else {
        temp = temp + 1
      }

      if (temp <= 0) sensor.stop()
    }, 1, this)


  }
}