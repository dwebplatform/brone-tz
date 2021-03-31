const db = require('../models');
const { Op } = require('sequelize');
const { brones: Brone } = db;
module.exports = {
  getAllBrones,
  createBrone,
  cancelBrone,
  intersectedBrones,
  createDumpData
}
async function createDumpData() {
  const rooms = [{ roomNumber: 134 }, { roomNumber: 123 }, { roomNumber: 117 }];
  const users = [{ name: 'Семен', email: 'test@mail.ru' }, { name: 'Петр', email: 'test2@mail.ru' }, { name: 'Павел', email: 'test3@mail.ru' }];
  const roomsInstances = await Promise.all(rooms.map(async (r) => {
    return await db.rooms.create({
      roomNumber: r.roomNumber
    });
  }));
  const userInstances = await Promise.all(users.map(async (u) => {
    return await db.users.create({
      email: u.email,
      name: u.name
    });
  }));
  return { userInstances, roomsInstances }
}
async function cancelBrone({ id }) {
  let canceledBrone = await Brone.findOne({ where: { id } });
  if (!canceledBrone) {
    throw { msg: 'Такой брони нет' };
  }
  canceledBrone = await canceledBrone.destroy();
  return canceledBrone;
}
async function intersectedBrones({ from, to }) {
  const intersectFilter = {
    where: {
      from: { [Op.lte]: to },
      to: {
        [Op.gte]: from
      }
    }
  };
  return await Brone.findAll(intersectFilter);
}
async function userExist(userId) {
  const user = await db.users.findOne({ where: { id: userId } });
  if (!user) {
    throw { msg: 'Не удалось найти пользователя с таким id' }
  }
}
async function roomExist(roomId) {
  const room = await db.rooms.findOne({ where: { id: roomId } });
  if (!room) {
    throw { msg: 'Комнаты с таким id не существует' }
  }
}
async function createBrone({ userId, roomId, from, to }) {
  const intersectedBroneInstances = await intersectedBrones({ from, to });
  await userExist(userId);
  await roomExist(roomId);
  if (intersectedBroneInstances.length) {
    throw { msg: 'Выберите другие даты' }
  }
  // const userId, roomId
  const newBrone = await Brone.create({ userId, roomId, from, to });
  return newBrone;
}

async function getAllBrones({ page, limit, offset }) {
  const {count} = await Brone.findAndCountAll();
  if(!limit){
    limit = 3;
  } else {
    limit =+limit;
  }
  if(!offset){
    offset = 0;
  }
  if(!page){
    page =1 ;
  }
  let pages = Math.ceil(count / limit);
  offset = limit * (page - 1);
  const brones = await Brone.findAll({offset, limit});
  if (!brones.length) {
    throw { msg: 'Не удалось получить ни одной брони' }
  }
  return {brones,pages};
}