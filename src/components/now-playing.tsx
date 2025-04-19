import "./now-playing.css"

type NowPlayingInformationProps = {
  bandName: string
  songName: string
  year: number
}

const NowPlayingInformation = ({ bandName, songName, year }: NowPlayingInformationProps) => {
  return (
    <div className="player_info">
      <p>Now playing</p>
      <span>Band: {bandName}</span>
      <span className="player_name">Song: {songName}</span>
      <span>Year: {year}</span>
    </div>
  )
}

export default NowPlayingInformation