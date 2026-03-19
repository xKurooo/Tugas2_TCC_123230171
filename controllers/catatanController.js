const catatanModel = require("../models/catatanModels");

const getAllCatatan = async (req, res) => {
  try {
    const allCatatan = await catatanModel.findAll();
    res.status(200).json({
      success: true,
      data: allCatatan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data catatan",
      error: error.message,
    });
  }
};

const createCatatan = async (req, res) => {
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({
      success: false,
      message: "Judul dan isi catatan wajib diisi",
    });
  }

  try {
    const newCatatan = await catatanModel.create({ judul, isi });
    res.status(201).json({
      success: true,
      message: "Catatan berhasil ditambahkan",
      data: newCatatan,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Gagal menambah catatan",
      error: error.message,
    });
  }
};

const getCatatanById = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({
        success: false,
        message: "Catatan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: catatan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data catatan",
      error: error.message,
    });
  }
};

const updateCatatan = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  if (!judul || !isi) {
    return res.status(400).json({
      success: false,
      message: "Judul dan isi catatan wajib diisi",
    });
  }

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({
        success: false,
        message: "Catatan tidak ditemukan",
      });
    }

    await catatanModel.updateById(id, { judul, isi });

    const updatedCatatan = await catatanModel.findById(id);
    res.status(200).json({
      success: true,
      message: "Catatan berhasil diupdate",
      data: updatedCatatan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal mengedit catatan",
      error: error.message,
    });
  }
};

const deleteCatatan = async (req, res) => {
  const { id } = req.params;

  try {
    const catatan = await catatanModel.findById(id);

    if (!catatan) {
      return res.status(404).json({
        success: false,
        message: "Catatan tidak ditemukan",
      });
    }

    await catatanModel.deleteById(id);
    res.status(200).json({
      success: true,
      message: "Catatan berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal menghapus catatan",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCatatan,
  createCatatan,
  getCatatanById,
  updateCatatan,
  deleteCatatan,
};
