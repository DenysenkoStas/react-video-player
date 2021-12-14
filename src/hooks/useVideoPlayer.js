import {useEffect, useState} from 'react';

const useVideoPlayer = (videoElement) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => setPlaying(prevState => !prevState);

  useEffect(() => {
    playing ? videoElement.current.play() : videoElement.current.pause();
  }, [playing, videoElement]);

  useEffect(() => {
    progress === 100 && setPlaying(false);
  }, [progress]);

  const handleOnTimeUpdate = () => {
    const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
    setProgress(progress);
  };

  const handleVideoProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
    setProgress(manualChange);
  };

  const handleVideoSpeed = (event) => {
    const speed = Number(event.target.value);
    videoElement.current.playbackRate = speed;
    setSpeed(speed);
  };

  const toggleMute = () => setMuted(prevState => !prevState);

  useEffect(() => {
    muted ? (videoElement.current.muted = true) : (videoElement.current.muted = false);
  }, [muted, videoElement]);

  return {
    playing,
    progress,
    speed,
    muted,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute
  };
};

export default useVideoPlayer;
