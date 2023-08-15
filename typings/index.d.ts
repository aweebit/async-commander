import * as Commander from 'commander';

declare module 'commander' {
  interface Option {
    /**
     * When set to `true` (the default), next call to the function provided via `.argParser()` will be chained to its return value if it is thenable.
     *
     * Do not turn this off if the option is non-variadic and not expected to be repeated.
     * Otherwise, there is a risk of unhandled promise rejections
     * because the user can still unknowingly repeat the option,
     * in which case the old value is simply overwritten,
     * and so if it was a promise, it will remain unhandled.
     *
     * @param {boolean} [chained=true]
     * @returns {this}
     */
    chainArgParserCalls(chained?: boolean): this;
  }

  interface Argument {
    /**
     * When set to `true` (the default), next call to the function provided via `.argParser()` will be chained to its return value if it is thenable.
     */
    chainArgParserCalls(chained?: boolean): this;
  }
};

export * from 'commander';
