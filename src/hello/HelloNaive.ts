import {
  IMessage,
  MessageServiceNaive,
  MessageServiceTyped,
  MessageTyped,
  MessageEnum,
} from "../message";
import { P, match } from "ts-pattern";

export interface IResponse<T> {
  status: number;
  body: T;
}

export class HelloNaive {
  private messageService: MessageServiceNaive;

  constructor(messageService: MessageServiceNaive) {
    this.messageService = messageService;
  }

  getMessageResponse(): Promise<IResponse<IMessage>> {
    const msg = this.messageService.getMessage();
    return Promise.resolve(this.handleResponseV1(msg));
  }

  private handleResponseV1(msg: IMessage): IResponse<IMessage> {
    const message = msg.value.toLowerCase();

    if (message.includes("functional programming"))
      return { status: 200, body: msg } as IResponse<IMessage>;
    else if (message.includes("typescript"))
      return { status: 200, body: msg } as IResponse<IMessage>;
    else if (message.includes("error"))
      return { status: 400, body: msg } as IResponse<IMessage>;
    else return { status: 500, body: msg } as IResponse<IMessage>;
  }

  private handleResponseV2(msg: IMessage): IResponse<IMessage> {
    const message = msg.value.toLowerCase();
    return match(message)
      .with(
        P.when((s) => s.includes("functional programming")),
        (s) => ({ status: 200, body: msg }) as IResponse<IMessage>,
      )
      .with(
        P.when((s) => s.includes("typescript")),
        (s) => ({ status: 200, body: msg }) as IResponse<IMessage>,
      )
      .with(
        P.when((s) => s.includes("error")),
        (s) => ({ status: 400, body: msg }) as IResponse<IMessage>,
      )
      .otherwise(() => ({ status: 500, body: msg }) as IResponse<IMessage>);
  }
}
