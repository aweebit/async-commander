import * as Commander from 'commander';

declare module 'commander' {
  interface Command {
    readonly _args: readonly Commander.Argument[];
  }

  interface Option {
    readonly envVar: string | undefined;
  }
};

export * from 'commander';
