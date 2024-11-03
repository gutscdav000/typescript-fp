//types 
export interface IMessage {
  value: string;
}

//generator
export function *messageGenerator(): Generator<string> {
  const messages = [
    "Hello TypeScript",
    "Hello Functional Programming",
    "Ahh, Error Panic!",
    "Ahh, Kernel Panic!",
  ];
  
  while (true) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    yield messages[randomIndex];
  }
}

// service
export class MessageServiceNaive {
  private generator: Generator<string>;
  constructor(messageGenerator: Generator<string>) {
    this.generator = messageGenerator;
  }
  
  getMessage(): IMessage {
    const value: string = this.generator.next().value
    const message = { value } as IMessage;
    return message;
  } 
}
