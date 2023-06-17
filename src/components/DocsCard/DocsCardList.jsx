import React from 'react'
import { DocsCard } from './';
import styles from './DocsCard.css'

export const DocsCardList = ({ list }) => {
    console.log('list', list);
    return (
        <div className='card-container-setup'>
            {list.map(item => <DocsCard key={item.docId} label={item.label} link={item.href} />)}
        </div>
    )
}

