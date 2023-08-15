// @ts-check

const { Option: OptionBase } = require('commander');
const ParseArgMixin = require('./ParseArgMixin');

/**
 * @typedef {import('./command.js').Command} Command
 */

/**
 * @this {InstanceType<ReturnType<typeof ParseArgMixin<OptionBase>>>}
 * @param {any} err
 */
function handleRejection(err) {
  if (err?.code === 'commander.invalidArgument') {
    const command = /** @type {Command} */ (this.__asyncCommander_command);
    const name = this.attributeName();
    const value = command.__asyncCommander_rawOptionValues[name];
    const source = command.__asyncCommander_rawOptionValueSources[name];
    const fromEnv = source === 'env';
    const invalidValueMessage = `error: option '${this.flags}' ${fromEnv ? 'value' : 'argument'} '${value}'${fromEnv ? ` from env '${this.envVar}'` : ''} is invalid.`;
    const message = `${invalidValueMessage} ${err.message ?? err}`;
    command.error(message, { exitCode: err.exitCode, code: err.code });
  }
  throw err;
}

const OptionWithParseArgMixin = ParseArgMixin(OptionBase, handleRejection);
class Option extends OptionWithParseArgMixin {
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
  chainArgParserCalls(chained = true) {
    return super.chainArgParserCalls(chained);
  }
}

exports.Option = Option;
