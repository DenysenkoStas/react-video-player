import React, {useRef} from 'react';
import useVideoPlayer from './hooks/useVideoPlayer';
import video from './assets/video.mp4';
import {ReactComponent as PlayIcon} from './assets/icons/play.svg';
import {ReactComponent as PauseIcon} from './assets/icons/pause.svg';
import {ReactComponent as SoundOnIcon} from './assets/icons/sound-on.svg';
import {ReactComponent as SoundOffIcon} from './assets/icons/sound-off.svg';
import './App.css';

const App = () => {
  const videoElement = useRef(null);
  const {
    playing,
    progress,
    speed,
    muted,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute
  } = useVideoPlayer(videoElement);
  const speedList = ['0.50', '1', '1.25', '2'];

  return (
    <main className='container'>
      <div className='video-wrap'>
        <video
          className='video-wrap__video'
          src={video}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
          onClick={togglePlay}
        />

        <div className='video-wrap__controls'>
          <button className='video-wrap__play-pause' type='button' aria-label='Playback control' onClick={togglePlay}>
            {!playing ? <PlayIcon/> : <PauseIcon/>}
            <span className='visually-hidden'>{!playing ? 'Play' : 'Pause'}</span>
          </button>

          <input
            className='video-wrap__progress'
            aria-label='Video progress'
            type='range'
            min='0'
            max='100'
            value={progress}
            onChange={handleVideoProgress}
          />

          <select
            className='video-wrap__speed'
            aria-label='Play speed'
            value={speed}
            onChange={handleVideoSpeed}
          >
            {speedList.map((item) => <option key={item} value={item}>{item}x</option>)}
          </select>

          <button className='video-wrap__mute-btn' aria-label='Sound control' onClick={toggleMute}>
            {!muted ? <SoundOnIcon/> : <SoundOffIcon/>}
            <span className='visually-hidden'>{!muted ? 'Mute sound' : 'Turn on the sound'}</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
