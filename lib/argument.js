// @ts-check

const { Argument: ArgumentBase } = require('commander');
const ParseArgMixin = require('./ParseArgMixin');

/**
 * @typedef {import('./command.js').Command} Command
 */

/**
 * @this {InstanceType<ReturnType<typeof ParseArgMixin<ArgumentBase>>>}
 * @param {any} err
 */
function handleRejection(err) {
  if (err?.code === 'commander.invalidArgument') {
    const command = /** @type {Command} */ (this.__asyncCommander_command);
    const index = command.processedArgs.length;
    const value = command.args[index];
    const message = `error: command-argument value '${value}' is invalid for argument '${this.name()}'. ${err.message ?? err}`;
    command.error(message, { exitCode: err.exitCode, code: err.code });
  }
  throw err;
}

const ArgumentWithParseArgMixin = ParseArgMixin(ArgumentBase, handleRejection);
class Argument extends ArgumentWithParseArgMixin {}

exports.Argument = Argument;
