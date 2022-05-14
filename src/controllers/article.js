const drive = require("../config/deta");
const path = require("path");
const httpStatus = require("http-status");

const upload = async (req, res) => {
  const name = req.files.file.name;
  const contents = req.files.file.data;
  const img = await drive.put(name, { data: contents });
  res.send(img);
};

const remove = async (req, res) => {
  const name = req.body.filename;
  const img = await drive.delete(name);
  res.send(img);
};

const download = async (req, res) => {
  const name = req.params.name;
  const img = await drive.get(name);
  img
    ? res.send(Buffer.from(await img.arrayBuffer()))
    : res.status(httpStatus.NOT_FOUND).send();
};

module.exports = {
  upload,
  download,
  remove,
};
