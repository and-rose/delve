import FileTable from './components/FileTable';
import FileTree from './components/FileTree';
import SampleWaveform from './components/SampleWaveform';

function App() {
    return (
        <div className="flex flex-column h-screen">
            <div className="flex justify-content-center align-content-center h-15rem border-1 border-round border-200 border-solid m-2">
                <SampleWaveform />
            </div>
            <div className="flex flex-grow-1">
                <div className="flex w-3 flex-shrink-1 justify-center-start align-items-start border-1 border-round border-200 border-solid m-2">
                    <FileTree />
                </div>
                <div className="flex flex-grow-1 flex-shrink-0 justify-content-center align-items-start border-1 border-round border-200 border-solid m-2">
                    <FileTable />
                </div>
            </div>
        </div>
    );
}

export default App;
