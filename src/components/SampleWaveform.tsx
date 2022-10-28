import { useState } from 'react';
import Wavesurfer from 'react-wavesurfer.js';

function SampleWaveform() {
    const [position, setPosition] = useState(0);
    const [muted, setMuted] = useState(false);
    const [playing, setPlaying] = useState(false);

    const handlePositionChange = (position: number) => {
        /* ... */
    };

    const onReadyHandler = () => console.log('done loading!');

    return (
        <div className="w-full h-full justify-content-center align-items-center vertical-align-middle">
            <Wavesurfer
                src="data/playwithfire.mp3"
                style={{ width: '100%', height: '100%' }}
                position={position}
                onPositionChange={handlePositionChange}
                onReady={onReadyHandler}
                playing={playing}
                muted={muted}
            />
        </div>
    );
}

export default SampleWaveform;
