import {
  IMessage,
  MessageServiceNaive,
  MessageServiceTyped,
  MessageTyped,
  MessageEnum,
  Messages,
} from "../src/message";
import { HelloNaive, HelloTyped, IResponse } from "../src/hello";

describe("Hello", () => {
  let index = 0;
  const naiveResponses = [
    {
      status: 200,
      body: { value: "Hello TypeScript" } as IMessage,
    } as IResponse<IMessage>,
    {
      status: 200,
      body: { value: "Hello Functional Programming" } as IMessage,
    } as IResponse<IMessage>,
    {
      status: 400,
      body: { value: "Ahh, Error Panic!" } as IMessage,
    } as IResponse<IMessage>,
    {
      status: 500,
      body: { value: "Ahh, Kernel Panic!" } as IMessage,
    } as IResponse<IMessage>,
    //NOTE: uncomment to break
    //{status: 400, body: { value: "help"} as IMessage} as IResponse<IMessage>,
  ];

  function* messageGenerator(): Generator<string> {
    while (true) {
      yield naiveResponses[index].body.value;
    }
  }

  it("Hello Implementation without types", async () => {
    const messageNaive: MessageServiceNaive = new MessageServiceNaive(
      messageGenerator(),
    );
    const naiveService: HelloNaive = new HelloNaive(messageNaive);
    naiveResponses.forEach(async (expected, i) => {
      index = i;
      const actual = await naiveService.getMessageResponse();
      expect(actual).toEqual(expected);
    });
  });

  index = 0;
  const typedResponses = [
    {
      status: 200,
      body: Messages.typescriptMessage,
    } as IResponse<MessageTyped>,
    {
      status: 200,
      body: Messages.functionalMessage,
    } as IResponse<MessageTyped>,
    {
      status: 400,
      body: Messages.errorPanicMessage,
    } as IResponse<MessageTyped>,
    {
      status: 500,
      body: Messages.kernelPanicMessage,
    } as IResponse<MessageTyped>,
    //NOTE: uncomment to break
    // {
    //   status: 400,
    //   body: Messages.brokenMessage,
    // } as IResponse<MessageTyped>,
  ];

  function* messageGeneratorTyped(): Generator<MessageTyped> {
    while (true) {
      yield typedResponses[index].body;
    }
  }
  it("Hello Implementation with types", async () => {
    const messageTyped: MessageServiceTyped = new MessageServiceTyped(
      messageGeneratorTyped(),
    );
    const helloTyped: HelloTyped = new HelloTyped(messageTyped);
    typedResponses.forEach(async (expected, i) => {
      index = i;
      const actual = await helloTyped.getMessageResponse();
      expect(actual).toEqual(expected);
    });
  });
});
