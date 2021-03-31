module.exports = (sequelize, Sequelize) => {
  const Brone = sequelize.define('brones', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    roomId: {
      type: Sequelize.INTEGER,
    },
    from: {
      type: Sequelize.INTEGER
    },
    to: {
      type: Sequelize.INTEGER
    }
  });
  return Brone;
}