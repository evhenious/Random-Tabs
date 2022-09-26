import { Mountable } from './tabs';

const videoStreamParams = {
  video: true,
};

class MediaCapture extends Mountable {
  #cameraStreamRoot;
  /** @type {MediaStream} */
  #cameraStream;

  constructor(parent) {
    super(parent, 'media-capture');

    this.#cameraStreamRoot = document.createElement('video');
    const captureBtn = document.createElement('button');
    captureBtn.innerText = 'Capture Camera';

    this.#cameraStreamRoot.addEventListener('loadedmetadata', () => {
      console.log('Stream started...');
      captureBtn.innerText = 'Stop Stream';
      this.#cameraStreamRoot.play();
    });

    captureBtn.addEventListener('click', () => {
      if (this.#cameraStream) {
        this.stopCameraStream();
        captureBtn.innerText = 'Capture Camera';
      } else {
        this.startCameraStream();
      }
    });

    this.root.append(this.#cameraStreamRoot, captureBtn);
  }

  async startCameraStream() {
    try {
      // this will effectively show a popup asking for camera permissions
      const stream = await navigator.mediaDevices.getUserMedia(videoStreamParams);
      this.#cameraStreamRoot.srcObject = stream;
      this.#cameraStream = stream;
    } catch (error) {
      console.warn(error);
    }
  }

  stopCameraStream() {
    this.#cameraStream.getTracks().forEach((track) => {
      track.stop();
    });

    this.#cameraStreamRoot.srcObject = null;
    this.#cameraStream = null;

    console.log('Stream stopped');
  }
}

export default MediaCapture;
