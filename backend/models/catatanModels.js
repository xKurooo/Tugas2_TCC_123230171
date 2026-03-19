const Catatan = require("../schema/Catatan");

const findAll = async () => {
  return await Catatan.findAll({
    order: [["tanggal_dibuat", "DESC"]],
  });
};

const create = async (catatanData) => {
  return await Catatan.create(catatanData);
};

const findById = async (id) => {
  return await Catatan.findByPk(id);
};

const updateById = async (id, catatanData) => {
  return await Catatan.update(catatanData, {
    where: { id: id },
  });
};

const deleteById = async (id) => {
  return await Catatan.destroy({
    where: { id: id },
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};
