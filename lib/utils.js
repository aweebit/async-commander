// @ts-check

/**
 * @param {unknown} value
 */
function pass(value) {
  return value;
}

/**
 * @template T
 * @param {any} value
 * @returns {value is PromiseLike<T>}
 */

function isThenable(value) {
  return typeof value?.then === 'function';
}

/**
 * Call `callback` immediately and return whatever it returns if `chain` is not thenable.
 * Chain a `callback` call to `chain` and return the new chain otherwise.
 *
 * The parameter value passed to `callback` is
 * - `chain` in the first case,
 * - the value `chain` resolves to in the second one.
 *
 * @param {any} chain
 * @param {(...args: any[]) => void} callback
 * @return {any}
 */

function callOrChain(chain, callback) {
  if (isThenable(chain)) {
    // already have a thenable, chain callback
    return chain.then(callback);
  }
  // callback might return a thenable
  return callback(chain);
}

exports.pass = pass;
exports.isThenable = isThenable;
exports.callOrChain = callOrChain;
