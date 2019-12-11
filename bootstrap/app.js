'use strict'

module.exports = {
  /** Export Classes */
  Bot: require('../app/Bot'),
  Citation: require('../app/models/Citation'),
  Offender: require('../app/models/Offender'),
  Command: require('../app/Command'),
  Help: require('../app/Help'),
  Roe: require('../app/Roe'),
  Discord: require('discord.js'),
  Database: require('../app/Database'),

  /** Export Methods */
  /**
   * Retrieves an instance of the class from the container.
   * @param instance
   */
  resolve: function (instance) {
    try {
      return new this[instance]()
    } catch (error) {
      console.error(`Error accessing ${instance} from container.`)
    }
  },

  /**
   * Checks if an object exists in the container.
   * @param instance
   * @returns {boolean}
   */
  exists: function (instance) {
    return typeof this[instance] !== 'undefined'
  },

  /**
   * Capitalizes first character of string
   * @param string
   * @returns {string}
   */
  capitalize: function (string) {
    if (typeof string !== 'string') {
      return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
  },

  /**
   * Calls the classes run function to retrieve the formatted message for the user.
   * @param command
   * @return {string|void}
   */
  dispatch: function (command) {
    if (this.exists(this.capitalize(command.name))) {
      const resolved = this.resolve(
        this.capitalize(command.name)
      )

      return resolved.run(
        command
      )
    }
  }
}
