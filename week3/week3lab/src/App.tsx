import { useState, useEffect } from 'react';

// --- COMPONENT 1: INPUT CONTROL ---
const ControlPanel = ({ source, setSource }: any) => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h3 className="mb-4 text-lg font-bold text-gray-800">Stage 1: Source</h3>
    <select 
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={source} 
      onChange={(e) => setSource(e.target.value)}
    >
      <option value="Cam_01_Main_Gate">Cam_01_Main_Gate</option>
      <option value="Cam_02_Loading_Dock">Cam_02_Loading_Dock</option>
      <option value="Stream_Test_mp4">Stream_Test.mp4</option>
    </select>
    <div className="mt-4 text-sm text-gray-500">
      Status: <span className="font-semibold text-green-600">Connected</span>
    </div>
  </div>
);

// --- COMPONENT 2: PIPELINE CONFIG ---
const PipelineConfig = () => (
  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
    <h3 className="mb-4 text-lg font-bold text-gray-800">Stage 2: Active Blocks</h3>
    <ul className="space-y-2 text-sm font-mono">
      <li className="flex items-center text-green-700">
        <span className="w-3 h-3 mr-2 bg-green-500 rounded-full animate-pulse"></span>
        Frame Sampler (15fps)
      </li>
      <li className="flex items-center text-green-700">
        <span className="w-3 h-3 mr-2 bg-green-500 rounded-full animate-pulse"></span>
        YOLOv8_Detector
      </li>
      <li className="flex items-center text-gray-400">
        <span className="w-3 h-3 mr-2 bg-gray-300 rounded-full"></span>
        OCR_Engine (Offline)
      </li>
    </ul>
  </div>
);

// --- COMPONENT 3: LIVE TELEMETRY LOG ---
const LiveLog = ({ logs }: any) => (
  <div className="flex flex-col p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-sm h-64">
    <h3 className="mb-2 text-lg font-bold text-gray-100">Stage 3: Telemetry Stream</h3>
    <div className="flex-1 overflow-y-auto font-mono text-xs">
      {logs.map((log: any) => (
        <div key={log.id} className={`mb-1 ${log.isAlert ? 'text-red-400 font-bold' : 'text-green-400'}`}>
          <span className="text-gray-500">[{log.time}]</span> {log.msg}
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN DASHBOARD LAYOUT ---
export default function App() {
  const [source, setSource] = useState('Cam_01_Main_Gate');
  const [logs, setLogs] = useState<{id: number, time: string, msg: string, isAlert: boolean}[]>([]);

  // Simulate incoming WebSocket data from the Python backend
  useEffect(() => {
    const mockDataStream = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const isAlert = Math.random() > 0.85; // 15% chance of an anomaly
      
      const newLog = {
        id: Date.now(),
        time: now,
        msg: isAlert ? '⚠️ ALERT: Unauthorized zone breach detected' : 'Routine: Person detected (0.94)',
        isAlert: isAlert
      };

      // Keep only the latest 20 logs to prevent memory leaks
      setLogs(prev => [newLog, ...prev].slice(0, 20));
    }, 2000);

    return () => clearInterval(mockDataStream);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-8 text-3xl font-extrabold text-gray-900 tracking-tight">
        Uni_Vision <span className="text-blue-600">Console</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ControlPanel source={source} setSource={setSource} />
        <PipelineConfig />
        <LiveLog logs={logs} />
      </div>
    </div>
  );
}
