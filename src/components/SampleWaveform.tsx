import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import { WaveSurfer, WaveForm } from 'wavesurfer-react';
import { Slider } from 'primereact/slider';

function SampleWaveform() {
    const [position, setPosition] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(75);

    const wavesurferRef = useRef<any>(null);
    const waveContainerRef = useRef<HTMLDivElement>(null);

    const handleWSMount = (wavesurfer: any) => {
        wavesurferRef.current = wavesurfer;
        if (wavesurferRef.current !== undefined) {
            wavesurferRef.current.load('/data/playwithfire.mp3');
        }
    };

    function secondsToHHMMSSMS(seconds: number) {
        //limit ms to 3 digits
        const ms = Math.floor((seconds % 1) * 1000);
        const s = Math.floor(seconds % 60);
        const m = Math.floor((seconds / 60) % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms
            .toString()
            .padStart(3, '0')}`;
    }

    useEffect(() => {
        if (wavesurferRef.current !== undefined) {
            wavesurferRef.current.on('audioprocess', (time: number) => {
                setPosition(time);
            });
        }
    }, []);

    useEffect(() => {
        if (wavesurferRef.current !== undefined) {
            wavesurferRef.current.playPause();
        }
    }, [playing]);

    useEffect(() => {
        if (wavesurferRef.current !== undefined) {
            wavesurferRef.current.setVolume(volume / 100);
        }
    }, [volume]);

    return (
        <div className="min-w-full flex flex-column justify-content-around align-content-center">
            <div className="flex flex-row justify-content-between align-content-center max-w-full gap-3 mx-3">
                <div className="flex align-items-center h-full w-6rem">
                    <p>{secondsToHHMMSSMS(position)}</p>
                </div>
                <div className="flex w-full min-w-5" ref={waveContainerRef}>
                    <div className="min-w-full flex flex-column justify-content-around align-content-center">
                        <WaveSurfer onMount={handleWSMount}>
                            <WaveForm id="waveform" responsive={true}></WaveForm>
                        </WaveSurfer>
                    </div>
                </div>
                <div className="flex align-items-center h-full w-6rem">
                    <p>{secondsToHHMMSSMS(position)}</p>
                </div>
            </div>
            <div className="flex w-full justify-content-center align-items-center min-w-full gap-5">
                <span className="p-buttonset ">
                    <Button
                        icon="pi pi-play"
                        tooltip="Play"
                        onClick={() => setPlaying(!playing)}
                        tooltipOptions={{ position: 'top' }}
                    />
                    <Button icon="pi pi-stop" tooltip="Stop" tooltipOptions={{ position: 'top' }} />
                    <Button
                        icon="pi pi-replay"
                        tooltip="Loop"
                        tooltipOptions={{ position: 'top' }}
                    />
                </span>
                <div className="flex justify-content-center align-items-center gap-3">
                    <i className="pi pi-volume-down text-primary" style={{ fontSize: '1.2em' }}></i>
                    <Slider
                        className="w-10rem"
                        value={volume}
                        onChange={e => setVolume(e.value as number)}
                        min={0}
                        max={100}
                    />
                    <i className="pi pi-volume-up text-primary" style={{ fontSize: '1.35em' }}></i>
                </div>
            </div>
        </div>
    );
}

export default SampleWaveform;
