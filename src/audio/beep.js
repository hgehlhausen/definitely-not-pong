// Notes
const AUDIO_C4 = 261.63; // C4
const AUDIO_B4 = 493.88; // B4


class Beeper {
    constructor() {
        this.audioContext = new AudioContext();

        this.beepOscillator = this.audioContext.createOscillator();
        this.beepOscillator.frequency.value = AUDIO_C4;
        this.beepGainNode = this.audioContext.createGain();
        this.beepGainNode.gain.value = 0;
        this.beepGainNode.connect(this.audioContext.destination);
        this.beepOscillator.connect(this.beepGainNode);
        this.beepOscillator.start(0);

        this.boopOscillator = this.audioContext.createOscillator();
        this.boopOscillator.frequency.value = AUDIO_B4;
        this.boopGainNode = this.audioContext.createGain();
        this.boopGainNode.gain.value = 0;
        this.boopGainNode.connect(this.audioContext.destination);
        this.boopOscillator.connect(this.boopGainNode);
        this.boopOscillator.start(0);

    }

    beep() {
        this.beepGainNode.gain.value = 0.5;
        setTimeout(() => this.beepGainNode.gain.value = 0.0, 20);
    }

    boop() {
        this.boopGainNode.gain.value = 0.5;
        setTimeout(() => this.boopGainNode.gain.value = 0.0, 20);
    }
}
