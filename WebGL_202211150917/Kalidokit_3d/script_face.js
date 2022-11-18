
// yaw roll pitch
let yaw=0, roll=0, pitch=0;

// start camera using mediapipe camera utils
const startCamera = () => {
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await facemesh.send({ image: videoElement });
    },
    width: 640,
    height: 480
  });
  camera.start();
};


const videoElement = document.querySelector(".input_video");
const canvasElement = document.querySelector('canvas.guides');
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiFaceLandmarks) {
    for (const landmarks of results.multiFaceLandmarks) {
      drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                     {color: '#C0C0C070', lineWidth: 1});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, {color: '#FF3030'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: '#30FF30'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, {color: '#E0E0E0'});
      drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, {color: '#E0E0E0'});
    }
  }
  canvasCtx.restore();
  animateLive2DModel(results.multiFaceLandmarks[0])
}


const animateLive2DModel = points => {
  if (!points) return;

  let riggedFace;

  if (points) {
    // use kalidokit face solver
    riggedFace = Kalidokit.Face.solve(points, {
      runtime: "mediapipe",
      video: videoElement
    });
    // console.log(riggedFace.head.degrees)
    roll = riggedFace.head.degrees.z
    yaw = riggedFace.head.degrees.y
    pitch = riggedFace.head.degrees.x
  }
};

function getData() {
  /*
  array = some file
  this file only contain this
  {id:1,name:'Alpha'},
  {id:2,name:'Beta'}
  */
  var data = [roll, pitch, yaw];
  // console.log("roll, pitch, yaw: ",data);
  return data;
}

const faceMesh = new FaceMesh({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
}});
faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
faceMesh.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await faceMesh.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();