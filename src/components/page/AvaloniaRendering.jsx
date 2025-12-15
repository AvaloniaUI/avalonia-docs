import React, { useState, useEffect, useRef } from 'react';
import Play from 'lucide-react/dist/esm/icons/play';
import Pause from 'lucide-react/dist/esm/icons/pause';
import Layers from 'lucide-react/dist/esm/icons/layers';
import Monitor from 'lucide-react/dist/esm/icons/monitor';
import Cpu from 'lucide-react/dist/esm/icons/cpu';
import Paintbrush from 'lucide-react/dist/esm/icons/paintbrush';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Info from 'lucide-react/dist/esm/icons/info';
import RefreshCw from 'lucide-react/dist/esm/icons/refresh-cw';
import Settings from 'lucide-react/dist/esm/icons/settings';
import Box from 'lucide-react/dist/esm/icons/box';
import Type from 'lucide-react/dist/esm/icons/type';
import Scissors from 'lucide-react/dist/esm/icons/scissors';
import Zap from 'lucide-react/dist/esm/icons/zap';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';

// --- Shared Components ---

const Section = ({ title, children, className = "" }) => (
  <div className={`bg-slate-50 rounded-xl shadow-lg p-6 mb-8 border border-slate-300 ${className}`}>
    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">{title}</h2>
    {children}
  </div>
);

const Tooltip = ({ text, children }) => (
  <div className="group relative flex items-center justify-center">
    {children}
    <div className="absolute bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-50 text-center pointer-events-none">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
    </div>
  </div>
);

const CodeBlock = ({ code, highlightLine = -1 }) => (
  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto shadow-inner">
    {code.split('\n').map((line, i) => (
      <div 
        key={i} 
        className={`${i === highlightLine ? 'bg-blue-900/50 text-blue-200 border-l-4 border-blue-400 pl-2' : 'pl-3'} py-0.5 transition-colors duration-200`}
      >
        <span className="text-slate-600 select-none w-6 inline-block text-right mr-4">{i + 1}</span>
        {line}
      </div>
    ))}
  </div>
);

// --- Modules ---

const Intro = ({ onStart }) => (
  <div className="text-center py-16 max-w-3xl mx-auto">
    <div className="inline-block p-4 bg-purple-100 rounded-full mb-6">
      <Layers size={48} className="text-purple-600" />
    </div>
    <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
      From XAML to Pixels
    </h1>
    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
      Have you ever wondered how a simple <code className="bg-slate-100 px-2 py-1 rounded text-purple-600 font-bold">&lt;Button /&gt;</code> turns into pixels on your screen?
      Join us for a deep dive into Avalonia's rendering engine. No graphics experience required—just curiosity.
    </p>
    <button 
      onClick={onStart}
      className="bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 flex items-center mx-auto gap-2 shadow-xl shadow-purple-200"
    >
      Start the Tour <ArrowRight size={20} />
    </button>
  </div>
);

const ProductionLine = () => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 20);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getStage = (p) => {
    if (p < 30) return { name: "The Architect (Visual Tree)", desc: "Your code defines WHAT to draw.", icon: Box, color: "bg-blue-500" };
    if (p < 60) return { name: "The Manager (Compositor)", desc: "Organises the work and schedules frames.", icon: Layers, color: "bg-amber-500" };
    if (p < 90) return { name: "The Artist (Backend)", desc: "Mixes the paint and draws the pixels.", icon: Paintbrush, color: "bg-pink-500" };
    return { name: "The Display (GPU)", desc: "The final pixels on your physical screen.", icon: Monitor, color: "bg-green-500" };
  };

  const currentStage = getStage(progress);
  const StageIcon = currentStage.icon;

  return (
    <Section title="Module 1: The Production Line">
      <p className="mb-6 text-slate-600">
        Think of rendering as a factory line. Your app doesn't draw directly to the screen; it sends orders down the line.
      </p>
      
      <div className="relative h-48 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden mb-6">
        {/* Track */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-300 -translate-y-1/2"></div>
        
        {/* Stations */}
        {[20, 50, 80].map((pos, i) => (
          <div key={i} className="absolute top-1/2 -translate-y-1/2 w-4 h-8 bg-slate-400 rounded" style={{ left: `${pos}%` }}></div>
        ))}

        {/* Moving Package */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-75 flex flex-col items-center"
          style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
        >
          <div className={`w-16 h-16 ${currentStage.color} rounded-xl shadow-lg flex items-center justify-center text-white mb-2`}>
            <StageIcon size={28} />
          </div>
          <div className="text-xs font-bold text-slate-500 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
            Button.axaml
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 w-full flex justify-between px-10 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>Design</span>
          <span>Composition</span>
          <span>Rasterisation</span>
          <span>Display</span>
        </div>
      </div>

      <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700 transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            {currentStage.name}
          </h3>
          <p className="text-slate-600">{currentStage.desc}</p>
        </div>
      </div>
    </Section>
  );
};

const ArchitectureStack = () => {
  const [activeLayer, setActiveLayer] = useState(null);

  const layers = [
    {
      id: 'visual',
      title: "The Visual Tree",
      subtitle: "Controls & Layout",
      desc: "This is your logical app structure (StackPanels, Buttons). It calculates size and position (Measure/Arrange) but doesn't draw pixels.",
      tech: "Visual, Control, IVisual",
      color: "bg-blue-100 border-blue-300 text-blue-800"
    },
    {
      id: 'compositor',
      title: "The Compositor",
      subtitle: "Scene Management",
      desc: "The boss. It decides WHEN a frame is needed. It manages the 'Scene Graph'—a simplified version of your visual tree optimised for drawing.",
      tech: "Compositor, ICompositionTarget",
      color: "bg-amber-100 border-amber-300 text-amber-800"
    },
    {
      id: 'interface',
      title: "The Abstraction Layer",
      subtitle: "IPlatformRenderInterface",
      desc: "The universal translator. Avalonia talks to this interface, so it doesn't need to know if it's running on Windows, Linux, or macOS.",
      tech: "IPlatformRenderInterface, IRenderTarget",
      color: "bg-purple-100 border-purple-300 text-purple-800"
    },
    {
      id: 'backend',
      title: "The Backend Implementation",
      subtitle: "Skia / Direct2D",
      desc: "The engine that does the work. Skia (used by Chrome) is the most common. It executes the actual drawing commands like 'DrawRect'.",
      tech: "IDrawingContextImpl, SkiaSharp",
      color: "bg-pink-100 border-pink-300 text-pink-800"
    },
    {
      id: 'gpu',
      title: "Platform Graphics",
      subtitle: "GPU / CPU",
      desc: "The metal. Direct3D, Metal, Vulkan, or OpenGL. This is where the data finally leaves Avalonia and enters the OS graphics driver.",
      tech: "IPlatformGraphicsContext, GPU",
      color: "bg-slate-200 border-slate-400 text-slate-800"
    }
  ];

  return (
    <Section title="Module 2: High-Level Architecture">
      <p className="mb-6 text-slate-600">
        Avalonia is built like a layer cake. Click a layer to inspect its role in the stack.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          {layers.map((layer) => (
            <div 
              key={layer.id}
              onClick={() => setActiveLayer(layer.id)}
              className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all transform hover:translate-x-1 ${
                activeLayer === layer.id ? 'shadow-md ring-2 ring-offset-1 ring-purple-400' : 'opacity-80 hover:opacity-100'
              } ${layer.color}`}
            >
              <div className="font-bold flex justify-between">
                {layer.title}
                {activeLayer === layer.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
              <div className="text-xs opacity-75 uppercase tracking-wider mt-1 font-semibold">{layer.subtitle}</div>
            </div>
          ))}
        </div>
        
        <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-200 min-h-[300px] flex flex-col justify-center">
          {activeLayer ? (
            <div className="animate-fadeIn">
              <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded mb-4 inline-block">
                {layers.find(l => l.id === activeLayer).subtitle}
              </span>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                {layers.find(l => l.id === activeLayer).title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {layers.find(l => l.id === activeLayer).desc}
              </p>
              <div className="bg-white p-4 rounded border border-slate-200">
                <div className="text-xs text-slate-400 font-bold uppercase mb-2">Key Types</div>
                <code className="text-sm font-mono text-slate-700">
                  {layers.find(l => l.id === activeLayer).tech}
                </code>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <Info size={48} className="mx-auto mb-4 opacity-50" />
              <p>Select a layer to see details</p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

const FrameWalkthrough = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. The Trigger",
      desc: "Something changed visually (animation tick, mouse hover). The Compositor determines a new frame is needed.",
      code: `void RenderFrame() {\n  // Frame needed!\n  if (!renderNeeded) return;\n  \n  // Start the pipeline...`,
      highlight: 1
    },
    {
      title: "2. Get Graphics Context",
      desc: "Avalonia asks the OS for a handle to the GPU. It doesn't know if it's Metal or DirectX yet, just that it's a 'Context'.",
      code: `  // Ask platform for GPU handle\n  var gpuContext = platform.GetGraphicsContext();\n  // e.g., wraps MTLDevice or ID3D11Device`,
      highlight: 1
    },
    {
      title: "3. Create Backend Context",
      desc: "The Render Interface Factory creates a Skia (or other backend) context that wraps the GPU handle.",
      code: `  // Abstract factory pattern\n  var backendContext = renderInterface\n      .CreateBackendContext(gpuContext);\n  // Now we have a Skia Context!`,
      highlight: 2
    },
    {
      title: "4. Get Surfaces",
      desc: "We ask the window for 'Surfaces' (textures/swapchains) to draw onto.",
      code: `  // Get window swapchain\n  var surfaces = window.GetRenderSurfaces();\n  \n  // Create a RenderTarget for this frame\n  var target = backendContext\n      .CreateRenderTarget(surfaces);`,
      highlight: 5
    },
    {
      title: "5. Create Drawing Context",
      desc: "We create an IDrawingContextImpl. This is the object that accepts commands like 'DrawRectangle'.",
      code: `  // Begin the frame\n  using (var ctx = target.CreateDrawingContext())\n  {\n     // Ready to draw...`,
      highlight: 2
    },
    {
      title: "6. Issue Commands",
      desc: "The visual tree is traversed. Each control tells the context what to draw.",
      code: `     ctx.Clear(Colors.White);\n     ctx.DrawRectangle(Brushes.Blue, null, rect);\n     ctx.DrawGlyphRun(textBrush, text);\n  }`,
      highlight: 2
    },
    {
      title: "7. Present",
      desc: "The context is disposed. The GPU flushes commands, flips the buffers, and pixels appear.",
      code: `  // Context Disposed.\n  // GPU Flush.\n  // Swap Buffers.\n}`,
      highlight: 2
    }
  ];

  return (
    <Section title="Module 3: Anatomy of a Single Frame">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Controls & Info */}
        <div>
          <p className="text-slate-600 mb-6">
            Let's freeze time. Use the slider to step through the exact moment a frame is rendered.
          </p>
          
          <div className="bg-slate-100 p-6 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-700">{steps[step].title}</h3>
              <span className="text-sm font-bold text-slate-400">Step {step + 1} of {steps.length}</span>
            </div>
            <p className="text-slate-700 h-20">{steps[step].desc}</p>
          </div>

          <input 
            type="range" 
            min="0" 
            max={steps.length - 1} 
            value={step} 
            onChange={(e) => setStep(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600 mb-8"
          />
          
          <div className="flex gap-2">
            <button 
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-4 py-2 rounded bg-white border hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
              disabled={step === steps.length - 1}
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Right: Visual Code & Diagram */}
        <div className="space-y-4">
           <div className="bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <div className="flex gap-2 p-2 border-b border-slate-100 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="text-xs text-slate-400 font-mono ml-2">Avalonia Render Loop</div>
              </div>
              <CodeBlock code={steps[step].code} highlightLine={steps[step].highlight} />
           </div>
           
           {/* Dynamic Flow Diagram */}
           <div className="h-32 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-around px-4 relative overflow-hidden">
              {/* Elements */}
              <div className={`transition-all duration-500 flex flex-col items-center z-10 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                <Box className="text-blue-500 mb-1" />
                <span className="text-[10px] font-bold">Compositor</span>
              </div>
              
              <ArrowRight className={`transition-all duration-500 text-slate-300 ${step >= 2 ? 'text-purple-500 scale-110' : ''}`} />

              <div className={`transition-all duration-500 flex flex-col items-center z-10 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                <Cpu className="text-purple-500 mb-1" />
                <span className="text-[10px] font-bold">Backend</span>
              </div>

              <ArrowRight className={`transition-all duration-500 text-slate-300 ${step >= 4 ? 'text-purple-500 scale-110' : ''}`} />

              <div className={`transition-all duration-500 flex flex-col items-center z-10 ${step >= 6 ? 'opacity-100' : 'opacity-30'}`}>
                <Monitor className="text-green-500 mb-1" />
                <span className="text-[10px] font-bold">GPU</span>
              </div>

              {/* Activity Pulse */}
              {step === 6 && (
                 <div className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-400 rounded-full animate-ping opacity-50"></div>
              )}
           </div>
        </div>
      </div>
    </Section>
  );
};

const PlaygroundTransform = () => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [clip, setClip] = useState(false);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <div>
           <label className="block text-sm font-bold text-slate-700 mb-2">Rotation (Degrees)</label>
           <input type="range" min="0" max="360" value={rotation} onChange={e => setRotation(e.target.value)} className="w-full accent-purple-600" />
        </div>
        <div>
           <label className="block text-sm font-bold text-slate-700 mb-2">Scale ({scale}x)</label>
           <input type="range" min="0.5" max="2" step="0.1" value={scale} onChange={e => setScale(e.target.value)} className="w-full accent-purple-600" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="clip" checked={clip} onChange={e => setClip(e.target.checked)} className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500" />
          <label htmlFor="clip" className="text-sm font-bold text-slate-700">Enable PushClip (Clipping)</label>
        </div>
        
        <div className="bg-slate-800 text-slate-300 p-4 rounded text-sm font-mono">
          <div>context.PushTransform(Matrix.CreateRotation({rotation}));</div>
          <div>context.PushTransform(Matrix.CreateScale({scale}, {scale}));</div>
          {clip && <div className="text-green-400">context.PushClip(new Rect(0, 0, 100, 100));</div>}
          <div>context.DrawRectangle(Brushes.Blue, ...);</div>
          {clip && <div className="text-green-400">context.PopClip();</div>}
        </div>
      </div>

      <div className="flex-1 bg-slate-100 rounded-xl flex items-center justify-center h-[300px] relative overflow-hidden border border-slate-300">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-10 pointer-events-none">
          {[...Array(16)].map((_, i) => <div key={i} className="border border-slate-400"></div>)}
        </div>

        {clip && (
          <div className="absolute w-[100px] h-[100px] border-2 border-dashed border-red-500 z-20 pointer-events-none flex items-start justify-end">
             <span className="bg-red-500 text-white text-[10px] px-1">Clip</span>
          </div>
        )}

        {/* The Object being drawn */}
        <div 
          className="w-24 h-24 bg-blue-500 rounded-lg shadow-xl flex items-center justify-center text-white font-bold z-10 transition-transform duration-75"
          style={{ 
            transform: `rotate(${rotation}deg) scale(${scale})`,
            clipPath: clip ? 'polygon(-50% -50%, 150% -50%, 150% 150%, -50% 150%)' : 'none' // CSS trick to simulate context clip conceptually
          }}
        >
           Button
        </div>
        
        {/* Overlay for clip simulation (Visual trickery for React) */}
        {clip && (
           <div className="absolute inset-0 bg-slate-100/80 z-30 pointer-events-none"
                style={{ 
                  clipPath: `polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 
                             calc(50% - 50px) calc(50% - 50px), calc(50% + 50px) calc(50% - 50px), 
                             calc(50% + 50px) calc(50% + 50px), calc(50% - 50px) calc(50% + 50px))` 
                }}>
           </div>
        )}
      </div>
    </div>
  );
};

const PlaygroundBackend = () => {
  const [backend, setBackend] = useState('skia-cpu');

  const options = {
    'skia-cpu': { name: "Skia (Software)", path: "RAM → CPU → RAM → Screen", color: "text-yellow-600", speed: "Slow", desc: "The CPU does all the math. Pixels are copied manually." },
    'skia-d3d': { name: "Skia (Direct3D)", path: "RAM → GPU Memory → Screen", color: "text-green-600", speed: "Fast", desc: "Skia commands are translated to D3D commands. Data stays on GPU." },
    'skia-metal': { name: "Skia (Metal)", path: "RAM → GPU Memory → Screen", color: "text-green-600", speed: "Fast", desc: "Native macOS rendering. Texture wrapping prevents copying." },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg">
        <label className="font-bold text-slate-700">Select Backend:</label>
        <select 
          value={backend} 
          onChange={(e) => setBackend(e.target.value)}
          className="p-2 border rounded shadow-sm focus:ring-2 ring-purple-500 outline-none"
        >
          <option value="skia-cpu">Software (CPU)</option>
          <option value="skia-d3d">Direct3D (Windows)</option>
          <option value="skia-metal">Metal (macOS)</option>
        </select>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center relative overflow-hidden min-h-[200px]">
         <h3 className="text-xl font-bold mb-8">{options[backend].name}</h3>
         
         <div className="flex items-center gap-4 w-full justify-center">
            <div className="w-24 h-24 bg-blue-100 rounded-lg border-2 border-blue-300 flex flex-col items-center justify-center text-blue-800">
              <Box />
              <span className="text-xs font-bold mt-2">App Data</span>
            </div>

            <div className="flex-1 h-2 bg-slate-200 relative rounded overflow-hidden">
               <div className={`absolute top-0 left-0 h-full w-1/3 bg-purple-500 animate-pulse-fast rounded ${backend === 'skia-cpu' ? 'duration-[2000ms]' : 'duration-[500ms]'}`}></div>
            </div>

            <div className={`w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center ${backend === 'skia-cpu' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' : 'bg-green-100 border-green-300 text-green-800'}`}>
              {backend === 'skia-cpu' ? <Cpu /> : <Zap />}
              <span className="text-xs font-bold mt-2">{backend === 'skia-cpu' ? 'CPU Raster' : 'GPU Raster'}</span>
            </div>

            <div className="flex-1 h-2 bg-slate-200 relative rounded overflow-hidden">
               <div className={`absolute top-0 left-0 h-full w-1/3 bg-purple-500 animate-pulse-fast rounded ${backend === 'skia-cpu' ? 'duration-[2000ms]' : 'duration-[500ms]'}`}></div>
            </div>

            <div className="w-24 h-24 bg-slate-800 rounded-lg border-4 border-slate-600 flex flex-col items-center justify-center text-white">
               <Monitor />
               <span className="text-xs font-bold mt-2">Screen</span>
            </div>
         </div>

         <div className="mt-8 flex gap-4">
            <div className={`px-4 py-1 rounded-full font-bold text-sm bg-slate-100 ${options[backend].color}`}>
               Path: {options[backend].path}
            </div>
            <div className={`px-4 py-1 rounded-full font-bold text-sm ${backend === 'skia-cpu' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
               Speed: {options[backend].speed}
            </div>
         </div>
         
         <p className="mt-4 text-slate-500 text-center max-w-md">
            {options[backend].desc}
         </p>
      </div>
    </div>
  );
};

const PlaygroundDirty = () => {
  const [cells, setCells] = useState(Array(9).fill(false));
  const [flash, setFlash] = useState(null);

  const toggleCell = (i) => {
    setFlash(i);
    setTimeout(() => setFlash(null), 400);
    const newCells = [...cells];
    newCells[i] = !newCells[i];
    setCells(newCells);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Dirty Region Tracker</h3>
        <p className="text-slate-600 mb-4">
          Redrawing the whole screen is expensive. Avalonia tracks which parts of the UI have changed ("Dirty Regions") and clips the drawing command to just that area.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg text-blue-800 text-sm">
          <strong>Try it:</strong> Click a square to update it. Notice only that specific square flashes red (the dirty region) before repainting.
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl shadow-xl">
        <div className="grid grid-cols-3 gap-2">
          {cells.map((isActive, i) => (
            <div 
              key={i}
              onClick={() => toggleCell(i)}
              className={`w-20 h-20 rounded cursor-pointer transition-all duration-300 flex items-center justify-center relative overflow-hidden
                ${isActive ? 'bg-purple-500' : 'bg-slate-600 hover:bg-slate-500'}
              `}
            >
              {flash === i && (
                <div className="absolute inset-0 bg-red-500 animate-ping opacity-75"></div>
              )}
              {flash === i && (
                 <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs bg-red-500/50 z-10">DIRTY</span>
              )}
              <div className="text-white/20 font-bold text-2xl">{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Lab = () => {
  const [activeTab, setActiveTab] = useState('transform');

  return (
    <Section title="Module 4: The Rendering Lab">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'transform', label: 'Transforms & Clips', icon: Scissors },
          { id: 'backend', label: 'Backend Switcher', icon: Settings },
          { id: 'dirty', label: 'Dirty Regions', icon: RefreshCw },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap font-bold transition-colors ${
              activeTab === tab.id 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl min-h-[400px]">
        {activeTab === 'transform' && <PlaygroundTransform />}
        {activeTab === 'backend' && <PlaygroundBackend />}
        {activeTab === 'dirty' && <PlaygroundDirty />}
      </div>
    </Section>
  );
};

const TextDemo = () => {
  const [text, setText] = useState("Hello");
  
  const getGlyphs = (str) => {
    // Fake shaping logic for demo purposes
    const glyphs = [];
    let i = 0;
    while(i < str.length) {
      if (str[i] === 'f' && str[i+1] === 'i') {
        glyphs.push({ char: 'ﬁ', id: 982, width: 40, isLigature: true });
        i += 2;
      } else {
        glyphs.push({ char: str[i], id: str.charCodeAt(i), width: 30, isLigature: false });
        i++;
      }
    }
    return glyphs;
  };

  const glyphs = getGlyphs(text);

  return (
    <Section title="Module 5: Text Rendering Demystified">
      <div className="flex flex-col gap-6">
         <p className="text-slate-600">
           Text isn't just typing. It involves <strong>Shaping</strong> (using HarfBuzz) to pick the right shapes from the font file, especially for complex scripts or ligatures.
         </p>

         <div className="flex flex-col md:flex-row gap-4">
           <div className="flex-1">
             <label className="block text-sm font-bold text-slate-700 mb-2">Input Text</label>
             <input 
               type="text" 
               value={text} 
               onChange={(e) => setText(e.target.value)}
               className="w-full p-3 border border-slate-300 rounded-lg font-sans text-lg focus:ring-2 ring-purple-500 outline-none"
               placeholder="Try typing 'fi'..."
             />
             <p className="text-xs text-slate-400 mt-2">Try typing "fi" to see a ligature!</p>
           </div>
         </div>

         {/* Pipeline Visual */}
         <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
               
               <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
                 <div className="text-xs font-bold text-slate-400 uppercase mb-2">1. String (C#)</div>
                 <div className="text-2xl font-mono text-blue-600">"{text}"</div>
               </div>

               <div className="flex flex-col items-center justify-center text-slate-400">
                 <ArrowRight />
                 <span className="text-[10px] font-bold bg-slate-200 px-2 py-0.5 rounded mt-1">HarfBuzz Shaping</span>
               </div>

               <div className="bg-white p-4 rounded shadow-sm border border-slate-200">
                 <div className="text-xs font-bold text-slate-400 uppercase mb-2">2. Glyph Run</div>
                 <div className="flex flex-wrap justify-center gap-1">
                    {glyphs.map((g, i) => (
                       <Tooltip key={i} text={`Glyph ID: ${g.id} (Width: ${g.width})`}>
                         <div className={`
                           border rounded px-2 py-1 min-w-[30px] flex flex-col items-center
                           ${g.isLigature ? 'bg-amber-100 border-amber-300' : 'bg-slate-100 border-slate-300'}
                         `}>
                           <span className="font-serif text-xl">{g.char}</span>
                           <span className="text-[8px] text-slate-500 font-mono">#{g.id}</span>
                         </div>
                       </Tooltip>
                    ))}
                 </div>
               </div>

            </div>
         </div>
      </div>
    </Section>
  );
};

const Quiz = ({ onRestart }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const questions = [
    {
      q: "Who decides WHEN a frame needs to be drawn?",
      opts: [
        "The Button Control",
        "The Compositor",
        "The GPU",
        "The Operating System"
      ],
      a: 1
    },
    {
      q: "Why does Avalonia use IPlatformRenderInterface?",
      opts: [
        "To make rendering faster",
        "To allow the same code to run on Windows, macOS, and Linux",
        "To use less memory",
        "To confuse developers"
      ],
      a: 1
    },
    {
      q: "Which backend is currently the default for Avalonia?",
      opts: [
        "Direct2D",
        "GDI+",
        "Skia",
        "Vulkan"
      ],
      a: 2
    },
    {
      q: "What is a 'Glyph Run'?",
      opts: [
        "A font file",
        "A list of shaped characters ready to draw",
        "An animation of text",
        "A type of brush"
      ],
      a: 1
    }
  ];

  const handleAnswer = (idx) => {
    setSelected(idx);
    if (idx === questions[qIndex].a) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (qIndex < questions.length - 1) {
        setQIndex(qIndex + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-slate-200">
        <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz Complete!</h2>
        <p className="text-xl text-slate-600 mb-8">
          You scored <span className="font-bold text-purple-600">{score}</span> out of {questions.length}.
        </p>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
           {score === 4 ? "Perfect! You're a rendering expert." : "Good effort! You're on your way to mastering the pipeline."}
        </p>
        <button 
          onClick={onRestart}
          className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-700 transition-colors flex items-center gap-2 mx-auto"
        >
           <RefreshCw size={18} /> Start Over
        </button>
      </div>
    );
  }

  return (
    <Section title="Knowledge Check">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between text-sm text-slate-400 font-bold mb-4">
           <span>Question {qIndex + 1} of {questions.length}</span>
           <span>Score: {score}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full mb-8">
           <div className="h-full bg-purple-500 rounded-full transition-all duration-300" style={{ width: `${((qIndex + 1) / questions.length) * 100}%`}}></div>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-6">{questions[qIndex].q}</h3>

        <div className="space-y-3">
           {questions[qIndex].opts.map((opt, i) => (
             <button
               key={i}
               onClick={() => handleAnswer(i)}
               disabled={selected !== null}
               className={`w-full p-4 rounded-lg text-left font-semibold transition-all transform hover:translate-x-1 border-2
                 ${selected === null 
                   ? 'bg-white border-slate-200 hover:border-purple-300 text-slate-600' 
                   : i === questions[qIndex].a 
                     ? 'bg-green-50 border-green-500 text-green-700' 
                     : selected === i 
                       ? 'bg-red-50 border-red-500 text-red-700'
                       : 'bg-slate-50 border-slate-100 text-slate-400 opacity-50'
                 }
               `}
             >
               {opt}
             </button>
           ))}
        </div>
      </div>
    </Section>
  );
};

// --- Main App ---

const AvaloniaRendering = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-sans">
        <Intro onStart={() => setStarted(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-slate-800 pb-32">
      
      <main className="max-w-7xl mx-auto py-12">
        
        <div className="mb-12 animate-fadeIn">
          <ProductionLine />
        </div>

        <div className="mb-12 animate-fadeIn animation-delay-100">
          <ArchitectureStack />
        </div>

        <div className="mb-12 animate-fadeIn animation-delay-200">
          <FrameWalkthrough />
        </div>

        <div className="mb-12 animate-fadeIn animation-delay-300">
          <Lab />
        </div>

        <div className="mb-12 animate-fadeIn animation-delay-400">
          <TextDemo />
        </div>

        <div className="mb-12 animate-fadeIn animation-delay-500">
          <Quiz onRestart={() => setStarted(false)} />
        </div>

      </main>
    
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-pulse-fast {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AvaloniaRendering;