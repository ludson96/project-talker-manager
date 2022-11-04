const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

async function getTalker() {
  const contentJSON = await fs.readFile(talkerPath);
  const talker = JSON.parse(contentJSON);
  return talker;
}

module.exports = getTalker;