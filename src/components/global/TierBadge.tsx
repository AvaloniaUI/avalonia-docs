import React from 'react';
import styles from './TierBadge.module.css';

interface TierBadgeProps {
  tier: 1 | 2 | 3;
}

const tierClasses: Record<number, string> = {
  1: styles.tier1,
  2: styles.tier2,
  3: styles.tier3,
};

export default function TierBadge({ tier }: TierBadgeProps) {
  return (
    <span className={`${styles.badge} ${tierClasses[tier]}`}>
      Tier {tier}
    </span>
  );
}
