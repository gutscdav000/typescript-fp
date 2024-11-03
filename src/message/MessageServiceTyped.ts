//types
export enum MessageEnum {
  Typescript = "Typescript",
  Functional = "Functional",
  Error = "Error",
  Kernel = "Kernel",
  Broken = "Broken",
}

export type MessageTyped =
  | { type: MessageEnum.Typescript; message: string }
  | { type: MessageEnum.Functional; message: string }
  | { type: MessageEnum.Error; message: string }
  | { type: MessageEnum.Kernel; message: string }
//  | { type: MessageEnum.Broken; message: string };

export namespace Messages {
  export const typescriptMessage: MessageTyped = {
    type: MessageEnum.Typescript,
    message: "Hello TypeScript",
  };
  export const functionalMessage: MessageTyped = {
    type: MessageEnum.Functional,
    message: "Hello Functional Programming",
  };
  export const errorPanicMessage: MessageTyped = {
    type: MessageEnum.Error,
    message: "Ahh, Error Panic!",
  };
  export const kernelPanicMessage: MessageTyped = {
    type: MessageEnum.Kernel,
    message: "Ahh, Kernel Panic!",
  };

  // export const brokenMessage: MessageTyped = {
  //   type: MessageEnum.Broken,
  //   message: "Broken",
  // };
}

// generator
export function* messageTypedGenerator(): Generator<MessageTyped> {
  const messages = [
    Messages.typescriptMessage ,
    Messages.functionalMessage,
    Messages.errorPanicMessage,
    Messages.kernelPanicMessage,
  ];

  while (true) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    yield messages[randomIndex];
  }
}

// service
export class MessageServiceTyped {
  private generator: Generator<MessageTyped>;
  constructor(messageGenerator: Generator<MessageTyped>) {
    this.generator = messageGenerator;
  }

  getMessage(): MessageTyped {
    const message: MessageTyped = this.generator.next().value;
    return message;
  }
}
