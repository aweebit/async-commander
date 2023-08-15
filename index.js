// @ts-check

const Commander = require('commander');

const { Command } = require('./lib/command.js');
const { Option } = require('./lib/option.js');
const { Argument } = require('./lib/argument.js');

exports = module.exports = new Command();
exports.program = exports;

exports.Command = Command;
exports.Argument = Argument;
exports.Option = Option;

exports.Help = Commander.Help;
exports.CommanderError = Commander.CommanderError;
exports.InvalidArgumentError = Commander.InvalidArgumentError;
exports.InvalidOptionArgumentError = Commander.InvalidArgumentError; // Deprecated
