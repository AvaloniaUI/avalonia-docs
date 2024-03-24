import React from 'react';

const newVersion = '11.0';
const previewVersion = '11.1';
export default function MinVersion({version}) {
    let backgroundColor;
    let description;
    
    if (version === newVersion) {
        backgroundColor = '#ff8d8d';
        description = ' New!';
    } else if (version === previewVersion) {
        backgroundColor = '#d03737';
        description = ' Preview!';
    } else {
        backgroundColor = '#ebedf0';
        description = '';
    }
    
    return (
        <span
            style={{
                border: '1px solid #fff',
                display: 'inline-flex',
                padding: '4px 12px',
                backgroundColor,
                borderRadius: '16px',
                fontSize: '14px',
                color: '#111',
                margin: '0 1em 0 1em',
                verticalAlign: 'middle'
            }}>
            v{version}{description}
        </span>
    );
}

