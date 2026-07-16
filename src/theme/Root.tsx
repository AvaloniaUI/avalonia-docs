import type {Props} from '@theme/Root';
import {WebDSProvider} from '@avaloniaui/web-ds';
import {DocusaurusLinkAdapter} from '@site/src/components/global/DocusaurusLinkAdapter';

export default function Root({children}: Props) {
  return (
    <WebDSProvider linkAdapter={DocusaurusLinkAdapter}>
      {children}
    </WebDSProvider>
  );
}
