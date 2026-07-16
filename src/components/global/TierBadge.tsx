import React from 'react';
import { Badge, type BadgeTone } from '@avaloniaui/web-ds';
import styles from './TierBadge.module.css';

interface TierBadgeProps {
  tier: 1 | 2 | 3;
}

const tierTones: Record<TierBadgeProps['tier'], BadgeTone> = {
  1: 'success',
  2: 'info',
  3: 'warning',
};

export default function TierBadge({ tier }: TierBadgeProps) {
  return (
    <Badge className={styles.badge} size="sm" tone={tierTones[tier]}>
      Tier {tier}
    </Badge>
  );
}
