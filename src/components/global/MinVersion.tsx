import React from 'react';
import styles from './MinVersion.module.css';

interface MinVersionProps {
  version: string;
}

const newVersion = '11.2';
const previewVersion = '11.3';

export default function MinVersion({ version }: MinVersionProps) {
    let variantClass: string;
    let description: string;

    if (version === newVersion) {
        variantClass = styles.new;
        description = ' New!';
    } else if (version === previewVersion) {
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
