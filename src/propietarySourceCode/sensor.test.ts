import { setTimeout } from "timers/promises"
import { Bus } from "./bus"

import { IApply } from "./IApply"
import { Sensor, SensorStopped, StartSensorCommand, TemperatureMeasured } from "./sensor"

class StoppedEventHandler implements IApply<SensorStopped>{
  stopped = false
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async apply(_event: SensorStopped): Promise<void> {
    this.stopped = true
  }

}
class MockEventHandler implements IApply<TemperatureMeasured>{
  temps: number[] = []
  async apply(event: TemperatureMeasured): Promise<void> {
    this.temps.push(event.temperature)
  }

}
describe("the sensor", () => {
  it('will count up and then down', async () => {
    const bus = new Bus()
    const sut = new Sensor()
    sut.registerBus(bus)
    const mock = new MockEventHandler()
    const stoppedMock = new StoppedEventHandler()
    bus.subscribe("SensorStopped", stoppedMock)
    bus.subscribe("TemperatureMeasured", mock)

    const check = async () => {
      while (!stoppedMock.stopped) {
        await setTimeout(50);
      }
    }
    await sut.handle(new StartSensorCommand(mock))
    await check()
    expect(mock.temps.length).toEqual(200)
  })
})