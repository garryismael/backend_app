const { Deta } = require("deta");

const deta = Deta(process.env.DETA_PROJECT_KEY);
const drive = deta.Drive("donnees");
module.exports = drive;