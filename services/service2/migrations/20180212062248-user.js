/* TODO :
 - If your service does not need database
 -  Delete this file
 - Else
 - Replace this file with one of your actual models
 - And handle migrations
 */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, { charset: 'utf8', collate: 'utf8_general_ci' }),
  down: queryInterface => queryInterface.dropTable('Users')
}
