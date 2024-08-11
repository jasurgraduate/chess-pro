// src/game/sound.js

const sounds = {
    move: '/snd/move.mp3',
    capture: '/snd/capture.mp3',
    check: '/snd/move-check.mp3',
    promote: '/snd/promote.mp3',
    castle: '/snd/castle.mp3',
  };
  
  let soundObjects = {};
  
  // Function to preload all sounds and store them in memory
  const preloadSounds = async () => {
    const promises = Object.keys(sounds).map(async (key) => {
      try {
        const response = await fetch(sounds[key]);
        if (!response.ok) {
          throw new Error(`Failed to fetch sound: ${sounds[key]}`);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.preload = 'auto';
        soundObjects[key] = audio;
      } catch (error) {
        console.error('Error preloading sound:', error);
      }
    });
  
    await Promise.all(promises);
  };
  
  // Function to play a sound
  const playSound = (type) => {
    const sound = soundObjects[type];
    if (sound) {
      sound.play().catch(error => {
        console.error('Error playing sound:', error);
      });
    } else {
      console.error('Sound type not found:', type);
    }
  };
  
  // Preload sounds when the module is imported
  preloadSounds();
  
  export { playSound };
  