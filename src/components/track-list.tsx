
interface Track {
  name: string
  url: string
  duration: number
}

interface Playlist {
  artist: string
  tracks: Track[]
  name: string
  year: number
}

interface TrackListProps {
  playlists: Playlist[]
  selectecArtist: Playlist
  selectSong: (index: number) => void
}



const TrackList = ({playlists, selectecArtist, selectSong}: TrackListProps) => {
  return (
    <div className="track_list_wrapper">
        {
          playlists.find((playlist) => playlist.artist === selectecArtist.artist) && (
            <ul>
            {
              playlists.find((playlist) => playlist.artist === selectecArtist.artist)?.tracks.map((track, index) => (
                <li onClick={() => selectSong(index)} key={track.name}>
                  <span className="track_name">{track.name}</span>
                </li>
              ))
            }
          </ul>
          )
        }
         </div>
  )
}

export default TrackList