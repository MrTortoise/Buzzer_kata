import { TemperatureMeasured } from "./sensor"

describe('the event should have the right properties set', () => {
  const temp = 10
  const sut = new TemperatureMeasured(temp)
  it('will have the right name', () => {
    expect(sut.eventType).toEqual("TemperatureMeasured")
  })

  it('will have right number', () => {
    expect(sut.temperature).toBe(temp)
  })
})