import {
  messageGenerator,
  MessageServiceNaive,
  MessageServiceTyped,
  messageTypedGenerator,
} from "./message";
import { HelloNaive, HelloTyped } from "./hello";
import { LanguagePreference } from "./LanguagePreference";
const main = async () => {
  console.log("Hello, Welcome to my ted talk!");

  const messageNaive: MessageServiceNaive = new MessageServiceNaive(
    messageGenerator(),
  );
  const naiveService: HelloNaive = new HelloNaive(messageNaive);
  const response = await naiveService.getMessageResponse();
  console.log(response);

  const messageTyped: MessageServiceTyped = new MessageServiceTyped(
    messageTypedGenerator(),
  );
  const helloTyped: HelloTyped = new HelloTyped(messageTyped);
  const responseTyped = await helloTyped.getMessageResponse();
  console.log(responseTyped);

  const languagePreference = new LanguagePreference();
  const ts = await languagePreference.getNaive("typescript");
  console.log(ts);
  const js = await languagePreference.getNaive("javascript");
  console.log(js);
  const rust = await languagePreference.getNaive("rust");
  console.log(rust);
};

main();
