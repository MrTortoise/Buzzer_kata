import { App } from "./propietarySourceCode/app";
import { Dave } from "./dave";

let app = new App(new Dave());

(async () => {
  await app.start()
  console.log("started")
  await app.waitTillStopped()
  app = null
  console.log("stopped")
})()

