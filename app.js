const https = require('https');
const saveToCSV = require('./save-file')

function fetchData(){
  // console.log('fetch')
  https.get('https://rds.power.ee/jsonRdsInfo.php?Name=Star', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      // console.log(JSON.parse(data.slice(1,-1)));
      handleData(JSON.parse(data.slice(1,-1)));
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

const lastSong = {
  currentArtist: "",
  currentSong:"",
  currentStartTime: ""
}

function addSong (song) {
  console.log(song);
  lastSong.currentArtist = song.currentArtist;
  lastSong.currentSong = song.currentArtist;
  lastSong.currentStartTime = song.currentStartTime;
  saveToCSV(song);
}

function handleData({currentArtist, currentSong, currentStartTime}){
  if( !lastSong.currentStartTime){
    // console.log('first')
    addSong({currentArtist,currentSong, currentStartTime})
    return;
  }

  if(currentArtist && currentSong && currentStartTime !== lastSong.currentStartTime) {
    // console.log('add')
    addSong({currentArtist,currentSong, currentStartTime})
  }
}

fetchData();
setInterval(()=>{
  fetchData();
},1000*30)

