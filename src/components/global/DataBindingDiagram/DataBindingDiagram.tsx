import React, { useState, useEffect, useCallback } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './DataBindingDiagram.module.css';

type Element = 'control' | 'object' | 'update' | 'notify' | null;

interface ElementConfig {
  label: string;
  description: string;
}

const elements: Record<Exclude<Element, null>, ElementConfig> = {
  control: {
    label: 'Control (Binding Target)',
    description: 'The UI control that displays data. Examples include TextBox, TextBlock, and other Avalonia controls with bindable properties.',
  },
  object: {
    label: 'Object (Data Source)',
    description: 'The application object containing the data. Typically a ViewModel in MVVM pattern that implements INotifyPropertyChanged.',
  },
  update: {
    label: 'Update',
    description: 'When a user interacts with the control (e.g., typing in a TextBox), the binding system automatically updates the corresponding property on the data source.',
  },
  notify: {
    label: 'Notify',
    description: 'When a property changes on the data source, it raises PropertyChanged event. The binding system detects this and updates the control to reflect the new value.',
  },
};

const flowSequence: Exclude<Element, null>[] = ['control', 'update', 'object', 'notify'];

export default function DataBindingDiagram(): JSX.Element {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const [activeElement, setActiveElement] = useState<Element>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayIndex, setAutoPlayIndex] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setAutoPlayIndex((prev) => (prev + 1) % flowSequence.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const displayedElement = activeElement || (isAutoPlaying ? flowSequence[autoPlayIndex] : null);

  const handleElementInteraction = useCallback((element: Element) => {
    setIsAutoPlaying(false);
    setActiveElement(element);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveElement(null);
  }, []);

  const isActive = (element: Exclude<Element, null>) => displayedElement === element;
  const isDimmed = (element: Exclude<Element, null>) => displayedElement && !isActive(element);

  return (
    <div className={styles.container} data-theme={isDark ? 'dark' : 'light'}>
      <div className={styles.diagramWrapper} onMouseLeave={handleMouseLeave}>
        {/* Main row with boxes and Update arrow */}
        <div className={styles.mainRow}>
          {/* Control Box */}
          <div
            className={`${styles.box} ${styles.controlBox} ${isActive('control') ? styles.active : ''} ${isDimmed('control') ? styles.dimmed : ''}`}
            onMouseEnter={() => handleElementInteraction('control')}
            onClick={() => handleElementInteraction('control')}
          >
            <span className={styles.boxLabel}>Control</span>
          </div>

          {/* Update Arrow (horizontal, solid) */}
          <div
            className={`${styles.updateArrow} ${isActive('update') ? styles.active : ''} ${isDimmed('update') ? styles.dimmed : ''}`}
            onMouseEnter={() => handleElementInteraction('update')}
            onClick={() => handleElementInteraction('update')}
          >
            <span className={styles.arrowLabel}>Update</span>
            <svg className={styles.horizontalArrow} viewBox="0 0 108 20" overflow="visible">
              <defs>
                <marker
                  id="arrowHeadRight"
                  markerWidth="8"
                  markerHeight="8"
                  refX="8"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L8,4 L0,8 Z" className={styles.arrowHead} />
                </marker>
              </defs>
              <line
                x1="0"
                y1="10"
                x2="108"
                y2="10"
                className={styles.arrowLine}
                markerEnd="url(#arrowHeadRight)"
              />
            </svg>
          </div>

          {/* Object Box */}
          <div
            className={`${styles.box} ${styles.objectBox} ${isActive('object') ? styles.active : ''} ${isDimmed('object') ? styles.dimmed : ''}`}
            onMouseEnter={() => handleElementInteraction('object')}
            onClick={() => handleElementInteraction('object')}
          >
            <span className={styles.boxLabel}>Object</span>
          </div>
        </div>

        {/* Notify Arrow (L-shaped path going under) */}
        <div
          className={`${styles.notifyArrow} ${isActive('notify') ? styles.active : ''} ${isDimmed('notify') ? styles.dimmed : ''}`}
          onMouseEnter={() => handleElementInteraction('notify')}
          onClick={() => handleElementInteraction('notify')}
        >
          <svg className={styles.notifyPath} viewBox="0 0 340 50">
            <defs>
              <marker
                id="arrowHeadLeft"
                markerWidth="8"
                markerHeight="8"
                refX="2"
                refY="4"
                orient="auto"
              >
                <path d="M8,0 L0,4 L8,8 Z" className={styles.arrowHead} />
              </marker>
            </defs>
            {/* Path: down from Object, left horizontally, up to Control */}
            <path
              d="M 290 0 L 290 30 L 50 30 L 50 0"
              className={`${styles.arrowLine} ${styles.dashed}`}
              markerEnd="url(#arrowHeadLeft)"
              fill="none"
            />
            <text x="170" y="45" textAnchor="middle" className={styles.notifyLabel}>Notify</text>
          </svg>
        </div>
      </div>

      {/* Description */}
      <div className={styles.description}>
        {displayedElement ? (
          <>
            <strong>{elements[displayedElement].label}:</strong> {elements[displayedElement].description}
          </>
        ) : (
          <span className={styles.hint}>Hover over any element to learn more</span>
        )}
      </div>
    </div>
  );
}
