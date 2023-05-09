const express = require("express");
const moment = require("moment");
const morgan = require("morgan");

const client = require("./mongodb");
require("./mongoose");
const Subject = require("./matakuliah");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json);

// GET /matakuliah
app.get("/matakuliah", async (req, res) => {
  try {
    const query = {};
    if (req.query.nama) {
      query.nama = req.query.nama;
    }
    const matakuliah = await Matakuliah.find(query);
    res.json({
      status: "success",
      message: "matakuliah retrieved successfully",
      data: matakuliah,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "an error occurred while retrieving matakuliah",
      data: [],
    });
  }
});

// GET /matakuliah:kode
app.get('/matakuliah/:kode', async (req, res) => {
  try {
    const matakuliah = await Matakuliah.findOne({ kode_matakuliah: req.params.kode });
    res.json({
      status: 'success',
      message: 'matakuliah retrieved successfully',
      data: matakuliah
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'an error occurred while retrieving matakuliah',
      data: []
    });
  }
});

// POST /matakuliah
app.post('/matakuliah', async (req, res) => {
  try {
    const matakuliah = await Matakuliah.create(req.body);
    res.json({
      status: 'success',
      message: 'matakuliah created successfully',
      data: matakuliah
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'an error occurred while creating matakuliah',
      data: []
    });
  }
});

// DELETE /matakuliah/:kode
app.delete('/matakuliah/:kode', async (req, res) => {
  try {
    const matakuliah = await Matakuliah.findOneAndDelete({ kode_matakuliah: req.params.kode });
    res.json({
      status: 'success',
      message: 'matakuliah deleted successfully',
      data: matakuliah
      });
    }
  })
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
