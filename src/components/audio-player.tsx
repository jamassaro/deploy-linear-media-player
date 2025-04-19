import { useEffect, useRef, useState } from "react";
import "./audio-player.css";
import music from "../data/playlists.json";
import MediaPlayer from "./media-player";
import Albums from "./albums";
import TrackList from "./track-list";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const playlists = music.playlists;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectecArtist, setSelectedArtist] = useState(playlists[0]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState('');

  useEffect(() => {
    const audio = audioRef.current as unknown as HTMLAudioElement;
    const updateTime = () => setCurrentTime(audio.currentTime);
    const setMeta = () => setDuration(audio.duration);
    setSelectedTrack(selectecArtist.tracks[trackIndex].url);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [audioRef, selectecArtist.tracks, trackIndex]);

  const selectSong = (song: number) => {
    setTrackIndex(song);
    const audio = audioRef.current as unknown as HTMLAudioElement;
    const selectedSong = selectecArtist.tracks[trackIndex].url;
    setSelectedTrack(selectedSong);
    setIsPlaying(true);
    const onCanPlay = () => {
      audio.play();
      audio.removeEventListener('canplaythrough', onCanPlay);
    };
    audio.addEventListener('canplaythrough', onCanPlay);
  };

  return (
    <div className="app_container">
      <div className="app_wrapper">
        <h1>Jose Massaro Media Player</h1>
        <section>
          <MediaPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            setDuration={setDuration}
            selectecArtist={selectecArtist}
            setSelectedArtist={setSelectedArtist}
            trackIndex={trackIndex}
            setTrackIndex={setTrackIndex}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        </section>
        <section className="artists_wrapper">
          <h3>Artists</h3>
          <Albums
            playlists={playlists}
            setSelectedArtist={setSelectedArtist}
          />
        </section>
        <section className="track_list_container">
          <h3>{selectecArtist.artist}</h3>
          <TrackList
            playlists={playlists}
            selectecArtist={selectecArtist}
            selectSong={selectSong}
          />
        </section>
      </div>
    </div>
  );
};

export default AudioPlayer;
