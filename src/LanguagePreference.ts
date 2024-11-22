import { IResponse } from "./hello";
import { match } from "ts-pattern";
import { Either, Maybe } from "monet";

export enum ErrorEnum {
  NotFoundError = "NotFoundError",
  UnexpectedError = "UnexpectedError",
}
export type LanguageError =
  | { type: ErrorEnum.NotFoundError; message: string }
  | { type: ErrorEnum.UnexpectedError; message: string };

export class LanguagePreference {
  constructor() {}

  private getValue(key: string): string {
    const myMap = new Map<string, string>([
      ["typescript", "welcome to typescript!"],
      ["javascript", "welcome to javascript!"],
    ]);

    const value = myMap.get(key);

    if (value === undefined)
      this.throwError({
        type: ErrorEnum.NotFoundError,
        message: `Key '${key}' not found in map.`,
      });

    return value;
  }

  throwError(error: LanguageError): never {
    const err = new Error(error.message);
    Object.assign(err, error);
    throw err;
  }

  getNaive(language: string): Promise<string> {
    try {
      return Promise.resolve(this.getValue(language));
    } catch (error) {
      //NOTE: stupid overcomplication when I thought about going another direction with this talk
      if (error && typeof error === "object" && "type" in error) {
        if (error.type === "NotFoundError")
          return Promise.resolve(`language not found: ${language}`);
        else if (error.type === "UnexpectedError")
          return Promise.resolve("an unexpected error occurred");
        else return Promise.reject(error);
      } else return Promise.reject(error);
    }
  }

  private getValueMonadic(key: string): Maybe<string> {
    // Time bomb: throws 1/5 times
    // if (Math.random() > 0.8) this.throwError({ type: ErrorEnum.UnexpectedError, message: ""})

    const myMap = new Map<string, string>([
      ["typescript", "welcome to typescript!"],
      ["javascript", "welcome to javascript!"],
    ]);

    const value = myMap.get(key);
    return Maybe.fromEmpty(value);
  }

  getMonadic(language: string): Promise<Either<LanguageError, string>> {
    return Promise.resolve(
      this.getValueMonadic(language).toEither<LanguageError>({
        type: ErrorEnum.NotFoundError,
        message: `Key '${language}' not found in map.`,
      }),
    );
  }

  getResponse(language: string): Promise<IResponse<string>> {
    return this.getMonadic(language).then((either) =>
      either
        .leftMap((error: LanguageError) =>
          match(error)
            .with(
              { type: ErrorEnum.NotFoundError },
              () =>
                ({
                  status: 500,
                  body: `language not found: ${language}`,
                }) as IResponse<string>,
            )
            .with(
              { type: ErrorEnum.UnexpectedError },
              () =>
                ({
                  status: 500,
                  body: "an unexpected error occurred",
                }) as IResponse<string>,
            )
            .exhaustive(),
        )
        .map((str) => ({ status: 200, body: str }) as IResponse<string>)
        .fold(
          (iresp) => iresp,
          (iresp) => iresp,
        ),
    );
  }
}
