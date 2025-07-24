import { setPlayPauseCallbacks, setPlayerInstance } from './playerControl.js';
import { startScrollSync, stopScrollSync } from './scrollSync.js';
import { loadTimeline } from './sentenceData.js';

let sentenceTimeline = [];

loadTimeline()
  .then((data) => {
    sentenceTimeline = data;

    setPlayPauseCallbacks(
      () => startScrollSync(sentenceTimeline),
      () => stopScrollSync()
    );
  })
  .catch((err) => {
    console.error('Failed to load timeline:', err);
  });

window.onYouTubeIframeAPIReady = function() {
  const player = new YT.Player('player', {
    height: '180',
    width: '320',
    videoId: 'M7lc1UVf-VE', // YouTube API test video
    playerVars: {
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
    events: {
      onReady: (event) => {
        setPlayerInstance(event.target);
      }
    }
  });
};

// Dynamically load YouTube Iframe API script
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);
