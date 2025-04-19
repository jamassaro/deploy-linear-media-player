import Artists from "./artists"

interface Track {
  name: string
  url: string
  duration: number
}

interface Band  {
  artist: string
  name: string
  year: number
  tracks: Track[]
}

interface albumsProps {
  playlists: Band[]
  setSelectedArtist: (artist: Band) => void
}

const Albums = ({playlists, setSelectedArtist}: albumsProps) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
    {
      playlists.map((playlist, index) => (
        <div key={index}>
          <Artists
            band={playlist}
            onClick={setSelectedArtist}
          />
        </div>
      ))
    }
  </div>
  )
}

export default Albums