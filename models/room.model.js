module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define('rooms', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    roomNumber: {
      type: Sequelize.INTEGER,
    },
  });

  return Room;
}