import {
  messageGenerator,
  MessageServiceNaive,
  MessageServiceTyped,
  messageTypedGenerator,
} from "./message";
import { HelloNaive, HelloTyped } from "./hello";

const main = async () => {
  console.log("Hello, Welcome to my ted talk!");

  const messageNaive: MessageServiceNaive = new MessageServiceNaive(messageGenerator());
  const naiveService: HelloNaive = new HelloNaive(messageNaive);
  const response = await naiveService.getMessageResponse();
  console.log(response);

  const messageTyped: MessageServiceTyped = new MessageServiceTyped(messageTypedGenerator());
  const helloTyped: HelloTyped = new HelloTyped(messageTyped);
  const responseTyped = await helloTyped.getMessageResponse();
  console.log(responseTyped);
  
};

main();
