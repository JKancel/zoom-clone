
const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3004'
});
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
  addVideoStream(myVideo, stream);
  
  myPeer.on('call', call => {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userResVideoStream => {
      addVideoStream(video, userResVideoStream);
    });
  });

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream);
  });
});

myPeer.on('open', id => {
  console.log('My peer ID is: ', id);
  socket.emit('join-room', ROOM_ID, id);
});

socket.on('user-connected', userId => {
  console.log(`User ${userId} connected`);
});

socket.on('user-disconnected', userId => {
  console.log(`User ${userId} disconnected`);
  peers[userId] && peers[userId].close();
});


function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });
  peers[userId] = call;
}