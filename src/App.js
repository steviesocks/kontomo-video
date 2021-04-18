import { useRef } from 'react';
import YouTube from 'react-youtube';
import './App.css';

function App() {
  const player = useRef();

  const props = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      loop: 1,
      playlist: "b96TnabpVyo",
      start: 1,
      end: 3600,
    },
  }

  const handlePlay = () => {
    player.current.getInternalPlayer().playVideo()
  }


  const handleCurrentTime = () => {
    const internalPlayer = player.current.getInternalPlayer()
    const minutes = (Date.now() / 60000) % 60;
    internalPlayer.seekTo(minutes*60)
  }

  // Deprecated: set playback quality to lowest available
  const handlePlayerReady = (e) => {
    const internalPlayer = player.current.getInternalPlayer()
    if (e.data === -1) {
      const lowestQuality = internalPlayer.getAvailableQualityLevels().then(result => {
        if (result.length > 1) {
          return result[result.length - 2]
        }
      }).catch(err => console.log(err))
      internalPlayer.setPlaybackQuality(lowestQuality)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="video-wrapper" onClick={handlePlay}> 
          <YouTube ref={player} opts={props} videoId="b96TnabpVyo" onStateChange={handlePlayerReady}/>
          <div className="video-cover" />
        </div>
        <button onClick={handleCurrentTime}>Go to current time</button>
      </header>
     
    </div>
  );
}

export default App;
