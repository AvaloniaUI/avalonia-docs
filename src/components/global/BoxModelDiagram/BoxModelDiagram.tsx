import React, { useState, useEffect, useCallback } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './BoxModelDiagram.module.css';

type Zone = 'margin' | 'border' | 'padding' | 'content' | null;

interface ZoneConfig {
  label: string;
  number: number;
  description: string;
}

const zones: Record<Exclude<Zone, null>, ZoneConfig> = {
  margin: {
    label: 'Margin',
    number: 1,
    description: 'The outermost transparent space that creates distance between this control and neighboring elements.',
  },
  border: {
    label: 'Border',
    number: 2,
    description: 'A visible boundary around the control. Can have thickness, color, and corner radius.',
  },
  padding: {
    label: 'Padding',
    number: 3,
    description: 'The inner space between the border and content. Pushes content inward from the edges.',
  },
  content: {
    label: 'Content',
    number: 4,
    description: 'Where child controls are placed. Each window or panel accepts only one direct child.',
  },
};

const zoneOrder: Exclude<Zone, null>[] = ['margin', 'border', 'padding', 'content'];

export default function BoxModelDiagram(): JSX.Element {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [activeZone, setActiveZone] = useState<Zone>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);

  // Auto-play through zones
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setAutoPlayIndex((prev) => (prev + 1) % zoneOrder.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const displayedZone = activeZone || (isAutoPlaying ? zoneOrder[autoPlayIndex] : null);

  const handleZoneInteraction = useCallback((zone: Zone) => {
    setIsAutoPlaying(false);
    setActiveZone(zone);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveZone(null);
  }, []);

  const getZoneClass = (zone: Exclude<Zone, null>) => {
    const isActive = displayedZone === zone;
    return `${styles.zone} ${styles[zone]} ${isActive ? styles.active : ''} ${displayedZone && !isActive ? styles.dimmed : ''}`;
  };

  return (
    <div className={styles.container} data-theme={isDark ? 'dark' : 'light'}>
      <div className={styles.diagram} onMouseLeave={handleMouseLeave}>
        {/* Margin zone */}
        <div
          className={getZoneClass('margin')}
          onMouseEnter={() => handleZoneInteraction('margin')}
          onClick={() => handleZoneInteraction('margin')}
        >
          <span className={styles.zoneBadge}>1</span>
          <span className={styles.zoneText}>Margin</span>
        </div>

        {/* Border zone */}
        <div
          className={getZoneClass('border')}
          onMouseEnter={() => handleZoneInteraction('border')}
          onClick={() => handleZoneInteraction('border')}
        >
          <span className={styles.zoneBadge}>2</span>
          <span className={styles.zoneText}>Border</span>
        </div>

        {/* Padding zone */}
        <div
          className={getZoneClass('padding')}
          onMouseEnter={() => handleZoneInteraction('padding')}
          onClick={() => handleZoneInteraction('padding')}
        >
          <span className={styles.zoneBadge}>3</span>
          <span className={styles.zoneText}>Padding</span>
        </div>

        {/* Content zone */}
        <div
          className={getZoneClass('content')}
          onMouseEnter={() => handleZoneInteraction('content')}
          onClick={() => handleZoneInteraction('content')}
        >
          <span className={styles.zoneBadge}>4</span>
          <span className={styles.zoneText}>Content</span>
        </div>
      </div>

      <div className={styles.legend}>
        {zoneOrder.map((zone) => {
          const config = zones[zone];
          const isActive = displayedZone === zone;
          return (
            <button
              key={zone}
              className={`${styles.legendItem} ${isActive ? styles.legendActive : ''}`}
              onMouseEnter={() => handleZoneInteraction(zone)}
              onClick={() => handleZoneInteraction(zone)}
            >
              <span className={`${styles.legendNumber} ${styles[`legendNumber_${zone}`]}`}>
                {config.number}
              </span>
              <span className={styles.legendLabel}>{config.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.description}>
        {displayedZone ? (
          <>
            <strong>{zones[displayedZone].label}:</strong> {zones[displayedZone].description}
          </>
        ) : (
          <span className={styles.hint}>Hover over a zone to learn more about it</span>
        )}
      </div>
    </div>
  );
}
