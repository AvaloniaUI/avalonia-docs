import React, { useState, useEffect, useCallback } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './ArchitectureDiagram.module.css';

type Layer =
  | 'avalonia'
  | 'graphics'
  | 'coreclr'
  | 'mono'
  | 'windows'
  | 'macos'
  | 'linux'
  | 'ios'
  | 'android'
  | 'wasm'
  | null;

interface LayerConfig {
  label: string;
  description: string;
}

const layers: Record<Exclude<Layer, null>, LayerConfig> = {
  avalonia: {
    label: 'Avalonia UI Framework',
    description: 'The cross-platform UI framework. Write your UI once using XAML and C#, and deploy to any supported platform without modification.',
  },
  graphics: {
    label: 'Graphics Engine',
    description: 'Avalonia uses Skia as its primary rendering engine. We\'re collaborating with Google to bring Impeller (Flutter\'s renderer) to .NET, and previously supported Direct2D on Windows.',
  },
  coreclr: {
    label: 'CoreCLR (.NET Runtime)',
    description: 'The high-performance, JIT-compiled .NET runtime optimized for desktop platforms. Provides the best startup time and peak performance for Windows, macOS, and Linux.',
  },
  mono: {
    label: 'Mono Runtime',
    description: 'A portable .NET runtime supporting AOT compilation. Essential for platforms like iOS (which requires AOT), Android, and WebAssembly where JIT compilation isn\'t available or practical.',
  },
  windows: {
    label: 'Windows',
    description: 'Full support for Windows 7 and later. Integrates with Win32 APIs, modern Windows features, and can use hardware-accelerated rendering.',
  },
  macos: {
    label: 'macOS',
    description: 'Native support for macOS 10.14+. Integrates with Cocoa, supports Apple Silicon natively, and provides full platform service integration.',
  },
  linux: {
    label: 'Linux',
    description: 'Supports X11, Wayland, and direct framebuffer rendering. Works on desktop distributions, embedded systems, and even Raspberry Pi.',
  },
  ios: {
    label: 'iOS',
    description: 'Runs on iPhone and iPad using Mono\'s AOT compilation. Provides native lifecycle management and integrates with iOS platform services.',
  },
  android: {
    label: 'Android',
    description: 'Full Android support across phones, tablets, and other devices. Uses Mono runtime and integrates with Android platform capabilities.',
  },
  wasm: {
    label: 'WebAssembly',
    description: 'Run Avalonia apps in any modern browser via WebAssembly. Uses Mono\'s AOT-to-WASM compilation for near-native performance in the browser.',
  },
};

const autoPlaySequence: Exclude<Layer, null>[] = [
  'avalonia', 'graphics', 'coreclr', 'mono', 'windows', 'macos', 'linux', 'ios', 'android', 'wasm'
];

export default function ArchitectureDiagram(): JSX.Element {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [activeLayer, setActiveLayer] = useState<Layer>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setAutoPlayIndex((prev) => (prev + 1) % autoPlaySequence.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const displayedLayer = activeLayer || (isAutoPlaying ? autoPlaySequence[autoPlayIndex] : null);

  const handleLayerInteraction = useCallback((layer: Layer) => {
    setIsAutoPlaying(false);
    setActiveLayer(layer);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveLayer(null);
  }, []);

  const isActive = (layer: Exclude<Layer, null>) => displayedLayer === layer;
  const isDimmed = (layer: Exclude<Layer, null>) => displayedLayer && !isActive(layer);

  const getLayerClass = (layer: Exclude<Layer, null>, baseClass: string) => {
    return `${baseClass} ${isActive(layer) ? styles.active : ''} ${isDimmed(layer) ? styles.dimmed : ''}`;
  };

  return (
    <div className={styles.container} data-theme={isDark ? 'dark' : 'light'}>
      <div className={styles.diagramWrapper} onMouseLeave={handleMouseLeave}>
        {/* Avalonia layer */}
        <div
          className={getLayerClass('avalonia', styles.fullWidthLayer)}
          onMouseEnter={() => handleLayerInteraction('avalonia')}
          onClick={() => handleLayerInteraction('avalonia')}
        >
          <span className={styles.layerLabel}>Avalonia</span>
        </div>

        {/* Graphics Engine layer */}
        <div
          className={getLayerClass('graphics', `${styles.fullWidthLayer} ${styles.graphicsLayer}`)}
          onMouseEnter={() => handleLayerInteraction('graphics')}
          onClick={() => handleLayerInteraction('graphics')}
        >
          <span className={styles.layerLabel}>Skia Graphics Engine</span>
          <span className={styles.subLabel}>+ Impeller (coming soon)</span>
        </div>

        {/* Runtime layer - split */}
        <div className={styles.splitRow}>
          <div
            className={getLayerClass('coreclr', styles.halfLayer)}
            onMouseEnter={() => handleLayerInteraction('coreclr')}
            onClick={() => handleLayerInteraction('coreclr')}
          >
            <span className={styles.layerLabel}>CoreCLR</span>
          </div>
          <div
            className={getLayerClass('mono', styles.halfLayer)}
            onMouseEnter={() => handleLayerInteraction('mono')}
            onClick={() => handleLayerInteraction('mono')}
          >
            <span className={styles.layerLabel}>Mono Runtime</span>
          </div>
        </div>

        {/* Platform layer */}
        <div className={styles.platformRow}>
          <div
            className={getLayerClass('windows', styles.platformBox)}
            onMouseEnter={() => handleLayerInteraction('windows')}
            onClick={() => handleLayerInteraction('windows')}
          >
            <span className={styles.platformLabel}>Windows</span>
          </div>
          <div
            className={getLayerClass('macos', styles.platformBox)}
            onMouseEnter={() => handleLayerInteraction('macos')}
            onClick={() => handleLayerInteraction('macos')}
          >
            <span className={styles.platformLabel}>macOS</span>
          </div>
          <div
            className={getLayerClass('linux', styles.platformBox)}
            onMouseEnter={() => handleLayerInteraction('linux')}
            onClick={() => handleLayerInteraction('linux')}
          >
            <span className={styles.platformLabel}>Linux</span>
          </div>
          <div
            className={getLayerClass('ios', styles.platformBox)}
            onMouseEnter={() => handleLayerInteraction('ios')}
            onClick={() => handleLayerInteraction('ios')}
          >
            <span className={styles.platformLabel}>iOS</span>
          </div>
          <div
            className={getLayerClass('android', styles.platformBox)}
            onMouseEnter={() => handleLayerInteraction('android')}
            onClick={() => handleLayerInteraction('android')}
          >
            <span className={styles.platformLabel}>Android</span>
          </div>
          <div
            className={getLayerClass('wasm', styles.platformBox)}
            onMouseEnter={() => handleLayerInteraction('wasm')}
            onClick={() => handleLayerInteraction('wasm')}
          >
            <span className={styles.platformLabel}>WebAssembly</span>
          </div>
        </div>

        {/* Connection indicators */}
        <div className={styles.connectionIndicators}>
          <div className={`${styles.connectionLine} ${styles.coreclrConnection} ${
            (isActive('coreclr') || isActive('windows') || isActive('macos') || isActive('linux')) ? styles.highlighted : ''
          }`} />
          <div className={`${styles.connectionLine} ${styles.monoConnection} ${
            (isActive('mono') || isActive('ios') || isActive('android') || isActive('wasm')) ? styles.highlighted : ''
          }`} />
        </div>
      </div>

      {/* Description */}
      <div className={styles.description}>
        {displayedLayer ? (
          <>
            <strong>{layers[displayedLayer].label}:</strong> {layers[displayedLayer].description}
          </>
        ) : (
          <span className={styles.hint}>Hover over any layer to learn more about the architecture</span>
        )}
      </div>
    </div>
  );
}
