import React from 'react';
import styles from './MinVersion.module.css';

interface MinVersionProps {
  version: string;
  isNewVersion?: boolean;
  isPreviewVersion?: boolean;
}

const newVersion = '12.1';
const previewVersion = '12.2';

export default function MinVersion({ version, isNewVersion, isPreviewVersion }: MinVersionProps) {
    let variantClass: string;
    let description: string;

    if (isNewVersion || version === newVersion) {
        variantClass = styles.new;
        description = ' New!';
    } else if (isPreviewVersion || version === previewVersion) {
        variantClass = styles.preview;
        description = ' Preview!';
    } else {
        variantClass = styles.default;
        description = '';
    }

    return (
        <span className={`${styles.badge} ${variantClass}`}>
            v{version}{description}
        </span>
    );
}
