class Sound {
  constructor() {
    this.ballBounce = new Audio('./assets/bounce.wav');
    this.brickPop = new Audio('./assets/pop.wav');
    this.brickColorChange = new Audio('./assets/color-change.wav');
    this.brickCollision = new Audio('./assets/collision.wav');
    this.backgroundMusic = document.getElementById('background-music');

    this.soundEffects = [
      this.ballBounce,
      this.brickPop,
      this.brickColorChange,
      this.brickCollision,
    ];

    this.masterVolumeSlider = document.getElementById('master-volume-slider');
    this.musicVolumeSlider = document.getElementById('music-volume-slider');
    this.effectsVolumeSlider = document.getElementById('effects-volume-slider');

    this.masterVolume = this.masterVolumeSlider.value / 100;
    this.musicVolume = this.musicVolumeSlider.value / 100;
    this.effectsVolume = this.effectsVolumeSlider.value / 100;

    this.masterVolumeSlider.addEventListener('input', () => {
      this.masterVolume = this.masterVolumeSlider.value / 100;
      this.updateMusicVolume();
      this.updateEffectsVolume();
    });

    this.musicVolumeSlider.addEventListener('input', () => {
      this.musicVolume = this.musicVolumeSlider.value / 100;
      this.updateMusicVolume();
    });

    this.effectsVolumeSlider.addEventListener('input', () => {
      this.effectsVolume = this.effectsVolumeSlider.value / 100;
      this.updateEffectsVolume();
    })

    this.preloadAudio();

    this.updateMusicVolume();
    this.updateEffectsVolume();
  }

  updateMusicVolume() {
    this.backgroundMusic.volume = this.musicVolume * this.masterVolume;
  }

  updateEffectsVolume() {
    this.soundEffects.forEach(sound => {
      sound.volume = this.effectsVolume * this.masterVolume;
    });
  }

  preloadAudio() {
    this.soundEffects.forEach(sound => {
      sound.preload = 'auto';
    });
    this.backgroundMusic.preload = 'auto';
  }
}

const sound = new Sound();
export default sound;