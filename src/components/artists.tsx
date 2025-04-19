import "./artists.css"


interface Track {
  name: string;
  url: string;
  duration: number;
}

interface Band {
  artist: string;
  name: string;
  year: number;
  tracks: Track[];
}


interface ArtistsProps {
  band: Band;
  onClick: (artist: Band) => void;
}


const Artists = ({band, onClick}: ArtistsProps )  => {

  const {artist, name: album, year, tracks} = band
  
  const handleClick = () => {
    onClick(band) 
  }

  return (
    <div onClick={handleClick} className="artists_container">
      <p>Name: {artist}</p>
      <p>Album: {album}</p>
      <p>Release: {year}</p>
      <p>Number of tracks: {tracks.length}</p>
    </div>
  )
}

export default Artists