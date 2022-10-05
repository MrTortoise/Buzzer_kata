import { Bus } from "./bus"
import { IApply } from "./IApply"
import { TemperatureMeasured } from "./sensor"

class MockEventApplicator implements IApply<TemperatureMeasured>{
  lastEvent: TemperatureMeasured

  async apply(event: TemperatureMeasured): Promise<void> {
    this.lastEvent = event
  }
}
describe('bus will register and deregister subscriptions', () => {
  it('will send events to subscribers', () => {
    const mock = new MockEventApplicator()
    const sut = new Bus()
    const event = new TemperatureMeasured(2)
    sut.subscribe(event.eventType, mock)
    sut.apply(event)

    expect(mock.lastEvent?.temperature).toEqual(2)

    sut.unsubscribe(event.eventType, mock)

    const newEvent = new TemperatureMeasured(4)
    sut.apply(newEvent)
    expect(mock.lastEvent.id).toEqual(event.id)
  })
})