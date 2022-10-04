import { setTimeout } from "timers/promises"
import { Sensor } from "./app"
import { IApply } from "./IApply"
import { StartSensorCommand, TemperatureMeasured } from "./sensor"


class MockEventHandler implements IApply<TemperatureMeasured>{
  temps: number[] = []
  apply(event: TemperatureMeasured): void {
    this.temps.push(event.temperature)
  }

}
describe("the sensor", () => {
  it('will count up and then down', async () => {
    const sut = new Sensor()
    const mock = new MockEventHandler()
    await sut.handle(new StartSensorCommand(mock))

    const check = async () => {
      let stopped = sut.isStopped
      while (!stopped) {
        await setTimeout(10);
        stopped = sut.isStopped
      }
    }

    await check()
    expect(mock.temps.length).toEqual(200)
  })
})