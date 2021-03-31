const broneService = require('../services/brone.service');
exports.getAllBrones = async (req, res) => {
  try {
    let { page, limit } = req.query;
    let offset = 0;
    const {brones,pages} = await broneService.getAllBrones({page, limit, offset});
    return res.json({ status: 'ok', brones,pages })
  } catch (e) {
    console.log({ error: e })
    return res.json({ status: 'error', msg: 'Не удалось получить ни одной брони' })
  }
}
exports.createBrone = async (req, res) => {
  try {
    const { userId, roomId, from, to } = req.body;
    const newBrone = await broneService.createBrone({ userId, roomId, from, to });
    return res.json({ status: 'ok', msg: 'create brone', newBrone });
  } catch (e) {
    const msg = e.msg || 'Не удалось создать новую бронь'
    return res.json({ status: 'error', msg })
  }
}
exports.cancelBrone = async (req, res) => {
  try {
    const { id } = req.body;
    const canceledBrone = await broneService.cancelBrone({ id });
    return res.json({ status: 'ok', canceledBrone });
  } catch (e) {
    const msg = e.msg || 'Не удалось отменить бронь';
    return res.json({ status: 'error', msg })
  }
}
exports.dumpUsersAndRooms = async (req, res) => {
  try {
    const dumpData = await broneService.createDumpData();
    return res.json({ status: 'ok', dumpData })
  } catch (e) {
    return res.json({ status: 'error', msg: 'Не удалось создать тестовые данные' });
  }
}