import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

jest.mock("next-intl/server", () => ({
  getTranslations: jest.fn(async () => (key: string) => key),
  setRequestLocale: jest.fn(),
}));

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
  // @ts-expect-error Node util TextDecoder differs from DOM global type
  global.TextDecoder = TextDecoder;
}
