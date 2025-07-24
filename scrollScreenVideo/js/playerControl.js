let player;

export function setPlayerInstance(p) {
  player = p;
}

export function getPlayer() {
  return player;
}

export function setPlayPauseCallbacks(onPlay, onPause) {
  document.body.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!player) return;
      const state = player.getPlayerState();
      if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        onPause();
      } else {
        player.playVideo();
        onPlay();
      }
    }
  });
}
