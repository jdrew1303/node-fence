'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const instance = Symbol('Instance')
const instanceEnforcer = Symbol('InstanceEnforcer')

/**
 * Internal Storage used to store gates & rules.
 *
 * @class Storage
 */
class Storage {
  /**
   * Constructor.
   *
   * @constructor
   * @param  {Symbol} enforcer
   * @return {void}
   */
  constructor (enforcer) {
    if (enforcer !== instanceEnforcer) {
      throw Error('Cannot Construct Singleton')
    }

    this.$reset()
  }

  /**
   * Get the current instance.
   *
   * @method instance
   * @return {this}
   */
  static get instance () {
    if (!this[instance]) {
      this[instance] = new Storage(instanceEnforcer)
    }

    return this[instance]
  }

  /**
   * Stores a given gate.
   *
   * @method storeGate
   * @param  {string} name
   * @param  {function} callback
   * @return {void}
   */
  storeGate (name, callback) {
    this.$gates[name] = callback
  }

  /**
   * Stores a given policy.
   *
   * @method storePolicy
   * @param  {string} resource
   * @param  {object} policy
   */
  storePolicy (resource, policy) {
    this.$policies[resource] = policy
  }

  /**
   * Store the default user.
   *
   * @method storeUser
   * @param  {object} user
   * @return {void}
   */
  storeUser (user) {
    this.$defaultUser = user
  }

  /**
   * Retrieves a gate.
   *
   * @method retrieveGate
   * @param  {string} name
   * @return {function}
   */
  retrieveGate (name) {
    return this.$gates[name]
  }

  /**
   * Retrieves a policy.
   *
   * @method retrievePolicy
   * @param  {string} resource
   * @return {object}
   */
  retrievePolicy (resource) {
    return this.$policies[resource]
  }

  /**
   * Retrieves the default user.
   *
   * @method retrieveUser
   * @return {object}
   */
  retrieveUser () {
    return this.$defaultUser
  }

  /**
   * Reset the storage.
   *
   * @protected
   * @method reset
   * @return {void}
   */
  $reset () {
    this.$gates = {}
    this.$policies = {}
    this.$defaultUser = null
  }
}

module.exports = Storage
