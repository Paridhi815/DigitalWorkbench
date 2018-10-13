/* TODO :
 - If your service does not need database
 -  Delete this file
 - Else
 - Replace this file with one of your actual models
 - And handle migrations
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate () { // assocaite function accepts func param models
        // associations can be defined here
      }
    }
  })
  return User
}
