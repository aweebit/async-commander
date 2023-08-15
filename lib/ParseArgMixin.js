// @ts-check

const { pass, isThenable, callOrChain } = require('./utils.js');

/**
 * @template T
 * @typedef {import('../typings/utils').Constructor<T>} Constructor
 */
/**
 * @template T
 * @typedef {import('../typings/utils').ArgParserFn<T>} ArgParserFn
 */
/**
 * @typedef {import('../typings/utils').ArgParserTarget} ArgParserTarget
 * @typedef {import('./command.js').Command} Command
 */

/**
 * @template {ArgParserTarget} OptionOrArgument
 * @param {Constructor<OptionOrArgument>} Base
 * @param {(...args: any[]) => void} handleRejection
 * @private
 */
function ParseArgMixin(Base, handleRejection) {
  const WithParseArgMixin = class extends Base {
    /**
     * @type {boolean}
     */
    #chained = true;
    /**
     * @type {ArgParserFn<unknown> | undefined}
     */
    #argParser = undefined;
    /**
     * @type {Command | undefined}
     * @package
     */
    __asyncCommander_command = undefined;
    #handleRejection = handleRejection.bind(this);

    /**
     * When set to `true` (the default), next call to the function provided via `.argParser()` will be chained to its return value if it is thenable.
     *
     * @param {boolean} [chained=true]
     * @returns {this}
     */
    chainArgParserCalls(chained = true) {
      this.#chained = !!chained;
      return this;
    }

    /**
     * @type {ArgParserFn<unknown>}
     */
    #parseArgSubroutine(value, previous) {
      const command = /** @type {Command} */ (this.__asyncCommander_command);
      let result = /** @type {ArgParserFn<unknown>} */ (this.#argParser)(value, previous);
      if (command.__asyncCommander_asyncParsing) {
        let handledResult = result;
        if (isThenable(result)) {
          handledResult = result.then(pass, this.#handleRejection);
          if (this.#chained) {
            result = handledResult;
          } // otherwise pass original thenable to next parser call
        }
      }
      return result;
    }

    /**
     * @type {ArgParserFn<unknown>}
     */
    #parseArg = (value, previous) => {
      if (this.#chained) {
        /**
         * @param {unknown} resolvedPrevious
         */
        const callback = resolvedPrevious => (
          this.#parseArgSubroutine(value, resolvedPrevious)
        );
        return callOrChain(previous, callback);
      }
      return this.#parseArgSubroutine(value, previous);
    };

    #overwriteParseArg() {
      this.#argParser = this.parseArg;
      this.parseArg = this.#parseArg;
    }

    /**
     * @override
     * @template T
     * @param {ArgParserFn<T>} fn
     * @returns {this}
     */
    // @ts-ignore: see https://github.com/microsoft/TypeScript/issues/52971
    argParser(fn) {
      super.argParser(fn);
      this.#overwriteParseArg();
      return this;
    }
  };

  return WithParseArgMixin;
}

module.exports = ParseArgMixin;
