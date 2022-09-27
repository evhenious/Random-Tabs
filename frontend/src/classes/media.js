import { writeChunk } from '../helpers/websocket';
import { Mountable } from './tabs';

//! fixme: config
const videoStreamParams = {
  video: true,
  audio: true,
};

const recorderOptions = {
  // mimeType: 'video/webm' //! fixme: figure out if need
};

class MediaCapture extends Mountable {
  #cameraStreamRoot;
  /** @type {MediaStream} */
  #cameraStream;
  /** @type {Recorder} */
  #recorder;

  constructor(parent) {
    super(parent, 'media-capture');

    this.#cameraStreamRoot = document.createElement('video');
    this.#cameraStreamRoot.classList.add('camera-preview');
    this.#cameraStreamRoot.poster = './images/empty-video-small.jpeg';
    const captureBtn = document.createElement('button');
    captureBtn.innerText = 'Capture Camera';

    this.#cameraStreamRoot.addEventListener('loadedmetadata', () => {
      console.log('Stream started...');
      captureBtn.innerText = 'Stop Stream';
      this.#cameraStreamRoot.play();

      this.#cameraStream.getTracks().forEach((track) => {
        console.log(track.getSettings());
      });
    });

    // stop or start recording + capturing
    captureBtn.addEventListener('click', async () => {
      try {
        if (this.#cameraStream) {
          this.#recorder.stopRecording();
          this.#recorder = null;
          this.stopCameraStream();
          captureBtn.innerText = 'Capture Camera';
        } else {
          await this.startCameraStream();
          this.#recorder = new Recorder(this.#cameraStream);
          this.#recorder.startRecording();
        }
      } catch (error) {
        console.warn(error);
      }
    });

    this.root.append(this.#cameraStreamRoot, captureBtn);
  }

  /**
   * This will effectively show a popup asking for camera permissions
   * @returns {Promise<void>}
   */
  async startCameraStream() {
    const stream = await navigator.mediaDevices.getUserMedia(videoStreamParams);
    this.#cameraStreamRoot.srcObject = stream;
    this.#cameraStream = stream;
  }

  stopCameraStream() {
    // we need to stop each track separately
    this.#cameraStream.getTracks().forEach((track) => {
      track.stop();
    });

    this.#cameraStreamRoot.srcObject = null;
    this.#cameraStream = null;

    console.log('Stream stopped');
  }
}

class Recorder {
  constructor(stream) {
    this.mediaRecorder = new MediaRecorder(stream, recorderOptions);

    this.mediaRecorder.ondataavailable = ({ data }) => {
      console.log('stream data chunk available');
      writeChunk(data, this.mediaRecorder.state === 'inactive');
    };

    this.mediaRecorder.onstop = () => {
      console.log('stream data ends');
    };
  }

  startRecording() {
    this.mediaRecorder.start(1000); //! FIXME: magic const
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }
}

export default MediaCapture;
