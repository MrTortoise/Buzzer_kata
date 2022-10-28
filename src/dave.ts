import { IApply } from "./propietarySourceCode/IApply";
import { TemperatureMeasured } from "./propietarySourceCode/sensor";
import { buzzerCli } from "./propietarySourceCode/magicalConsoleOfPower";



/*
This is the aggregate of the system.
What is an aggreagte?
A system has many objects usually - the aggregate is the one that people interact with.
It might be a search system, it might be their shopping basket.
Both these things have very different owners and functions.

This system may only have one part so one may ask aggregate of what.
Dave had a job, now he does not.
Daves only job was to take temperatures and apply force to the appropiate button
*/
export class Dave implements IApply<TemperatureMeasured>{
  async apply(event: TemperatureMeasured): Promise<void> {
    const buzzer = new BorkedBuzzer()
    if (event.temperature >= 80) {
      buzzer.start()
    }
  }
}


export class BorkedBuzzer {
  state = 4
  start(): void {
    if (this.state % 3 === 0) throw new Error('Fault')
    this.state = this.state + 1
    buzzerCli("Start Buzzer")
  }
}