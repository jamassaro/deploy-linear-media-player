

import NowPlayingInformation from './now-playing'

interface Artist {
  tracks: {
    url: string;
    name: string;
    duration: number
  }[];
  artist: string;
  name: string;
  year: number;
}

interface MediaPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  currentTime: number;
  setCurrentTime: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
  selectecArtist: Artist;
  setSelectedArtist: (artist: Artist) => void;
  trackIndex: number;
  setTrackIndex: (value: number) => void;
  selectedTrack: string;
  setSelectedTrack: (value: string) => void;
}

const MediaPlayer = ({ audioRef, isPlaying, setIsPlaying, currentTime, duration, selectecArtist, trackIndex, setTrackIndex, selectedTrack, setSelectedTrack }: MediaPlayerProps) => {

  const togglePlay = () => {
    const audio = audioRef.current as unknown as HTMLAudioElement
    
    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const forwardPlay = () => {
    const nextTrackIndex = trackIndex + 1
    if (nextTrackIndex >= selectecArtist.tracks.length) return 
    const nextTrackUrl = selectecArtist.tracks[nextTrackIndex].url
    const audio = audioRef.current as unknown as HTMLAudioElement
    setSelectedTrack(nextTrackUrl)
    setTrackIndex(nextTrackIndex)
    setIsPlaying(true)
    const onCanPlay = () => {
      audio.play()
      audio.removeEventListener('canplaythrough', onCanPlay)
    }
    audio.addEventListener('canplaythrough', onCanPlay)
  }



  const backwardPlay = () => {
    const nextTrackIndex = trackIndex - 1
    if (nextTrackIndex < 0) return 
    const nextTrackUrl = selectecArtist.tracks[nextTrackIndex].url
    const audio = audioRef.current as unknown as HTMLAudioElement
    setSelectedTrack(nextTrackUrl)
    setTrackIndex(nextTrackIndex)
    setIsPlaying(true)
    const onCanPlay = () => {
      audio.play()
      audio.removeEventListener('canplaythrough', onCanPlay) // clean up
    }
    audio.addEventListener('canplaythrough', onCanPlay)
  }

    const formatTime = (time: number) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`
  return (
    <div className="player_wrapper">
    <div className="player_time">
      <NowPlayingInformation 
        bandName={selectecArtist.artist}
        songName={selectecArtist.tracks[trackIndex].name}
        year={selectecArtist.year}  
      />
      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
    </div>
    <div className="player_controls">
      <button onClick={backwardPlay}>⏮️</button>
      <button onClick={togglePlay}>{isPlaying ? "⏸️" : "▶️"}</button>
      <button onClick={forwardPlay}>⏭️</button>
    </div>
    <audio 
      ref={audioRef} 
      src={selectedTrack} 
    />
  </div>
  )
}

export default MediaPlayer