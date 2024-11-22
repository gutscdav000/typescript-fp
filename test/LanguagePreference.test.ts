import {
  LanguagePreference,
  ErrorEnum,
  LanguageError,
} from "../src/LanguagePreference";
import { IResponse } from "../src/hello";

describe("LanguagePreference", () => {
  const languagePreference = new LanguagePreference();

  // Naive
  it("Happy Path Naive", async () => {
    const ts = await languagePreference.getNaive("typescript");
    expect(ts).toEqual("welcome to typescript!");

    const js = await languagePreference.getNaive("javascript");
    expect(js).toEqual("welcome to javascript!");
  });

  it("Error Path Naive", async () => {
    const rust = await languagePreference.getNaive("rust");
    expect(rust).toEqual("language not found: rust");

    const haskell = await languagePreference.getNaive("haskell");
    expect(haskell).toEqual("language not found: haskell");
  });

  // Monadic
  it("Happy Path Monadic", async () => {
    const ts = await languagePreference.getMonadic("typescript");
    expect(ts.right()).toEqual("welcome to typescript!");
  });

  it("Error Path Monadic", async () => {
    const er = await languagePreference.getMonadic("rust");
    expect(er.left()).toEqual({
      type: ErrorEnum.NotFoundError,
      message: `Key 'rust' not found in map.`,
    } as LanguageError);
  });

  it.skip("Time Bomb", async () => {
    while (true) {
      const ts = await languagePreference.getMonadic("typescript");
      expect(ts.right()).toEqual("welcome to typescript!");
    }
  });

  // response
  it("Happy Path getResponse", async () => {
    const ts = await languagePreference.getResponse("typescript");
    expect(ts).toEqual({
      status: 200,
      body: "welcome to typescript!",
    } as IResponse<string>);
  });
});
