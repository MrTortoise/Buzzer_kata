import { App } from "./propietarySourceCode/app";
import { Dave } from "./dave";

const app = new App(new Dave());

(async () => {
  await app.start()
  console.log("started")
  await app.waitTillStopped()
  console.log("stopped")
})()

