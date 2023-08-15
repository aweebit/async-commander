export type Constructor<T> = (new(...args: any[]) => T);

export type ArgParserFn<T> = (value: string, previous: T) => T;

export class ArgParserTarget {
  argParser<T>(fn: ArgParserFn<T>): this;
}

export type RawOptionValueSource = 'cli' | 'env';
