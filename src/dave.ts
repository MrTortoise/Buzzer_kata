import { IApply } from "./propietarySourceCode/IApply";
import { TemperatureMeasured } from "./propietarySourceCode/sensor";



/*
This is the aggregate of the system.
This system may only have one part so one may ask aggregate of what.
Dave had a job, now he does not.
Daves only job was to take temperatures and apply force to the appropiate button
*/
export class Dave implements IApply<TemperatureMeasured>{
  apply(event: TemperatureMeasured) {
    console.log(event.temperature)
  }

}