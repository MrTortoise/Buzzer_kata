import { Command } from "./command";

export interface IHandle<TCommand extends Command>{
  handle(command: TCommand) : Promise<void>
}