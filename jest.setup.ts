import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

if (!global.TextEncoder) {
    // @ts-expect-error Node util TextEncoder differs from DOM global type
    global.TextEncoder = TextEncoder;
}

if (!global.TextDecoder) {
    // @ts-expect-error Node util TextDecoder differs from DOM global type
    global.TextDecoder = TextDecoder;
}