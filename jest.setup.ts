import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util';

jest.mock('next-intl/server', () => ({
    getTranslations: jest.fn(async () => (key: string) => key),
}));

if (!global.TextEncoder) {
    // @ts-expect-error config for jest 
    global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
    // @ts-expect-error config for jest
    global.TextDecoder = TextDecoder;
}