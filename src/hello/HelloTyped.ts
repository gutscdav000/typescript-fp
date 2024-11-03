import {
  IMessage,
  MessageServiceNaive,
  MessageServiceTyped,
  MessageTyped,
  MessageEnum,
} from "../message";
import {P, match } from "ts-pattern";
import { IResponse } from "./";

export class HelloTyped {
    private messageService: MessageServiceTyped;

  constructor(messageService: MessageServiceTyped) {
    this.messageService = messageService;
  }

  getMessageResponse(): Promise<IResponse<MessageTyped>> {
    const msg = this.messageService.getMessage();
    return Promise.resolve(this.handleResponse(msg));
  }

  private handleResponse(msg: MessageTyped): IResponse<MessageTyped> {
    return match(msg).with(
      { type: MessageEnum.Typescript},
      (m: MessageTyped) => ({ status: 200, body: m } as IResponse<MessageTyped>)
    ).with(
      {type: MessageEnum.Functional},
      (m: MessageTyped) => ({ status: 200, body: m } as IResponse<MessageTyped>)
    ).with(
      {type: MessageEnum.Error},
      (m: MessageTyped) => ({ status: 400, body: m } as IResponse<MessageTyped>)
    ).with(
      {type: MessageEnum.Kernel},
      (m: MessageTyped) => ({ status: 500, body: m } as IResponse<MessageTyped>)
    )
    .exhaustive();
  }

};
