/**
 * Model defining a user trying to register/login to the system
 *
 * @class User
 */
 class User {
  constructor(obj) {
    this.email = obj.email;
    this.password = obj.password;
  }
}

module.exports = User;
