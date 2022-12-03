const fs = require('fs')


const saveToCSV = (jsonData) => {
  const stream = fs.createWriteStream("songs.csv", {flags:'a'});
  const data = Object.values(jsonData);
  stream.write(data.join(';') + "\n");
  stream.end();
}


module.exports = saveToCSV
