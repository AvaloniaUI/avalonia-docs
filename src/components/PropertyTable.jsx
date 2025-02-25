import React from 'react';
import styles from './PropertyTable.module.css';

// Component to handle word breaks at capital letters
const BreakAtCapitals = ({ text }) => {
  if (!text) return null;
  
  // Split the text at capital letters and join with <wbr> elements
  const parts = text.split(/(?=[A-Z])/).map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </React.Fragment>
  ));
  
  return <>{parts}</>;
};

export default function PropertyTable({ properties }) {
  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className={styles.propertyTable}>
      <table>
        <tbody>
          {properties.map((prop, index) => (
            <tr key={index}>
              <td className={styles.propertyName}>
                <a href={`#${prop.name}`}>
                  <BreakAtCapitals text={prop.name} />
                </a>
              </td>
              <td className={styles.propertyDescription}>
                {prop.description}
                {prop.inheritedFrom && (
                  <>
                    <br />
                    (Inherited from {' '}
                    {prop.inheritedFrom.link ? (
                      <a href={prop.inheritedFrom.link}>{prop.inheritedFrom.name}</a>
                    ) : (
                      prop.inheritedFrom.name || prop.inheritedFrom
                    )}
                    )
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};