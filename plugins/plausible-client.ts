import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import type { ClientModule } from '@docusaurus/types';

declare global {
  interface Window {
    plausible?: (event: string) => void;
  }
}

const clientModule: ClientModule = {
  onRouteUpdate({ location }) {
    // Check if plausible is loaded before calling it
    // This prevents errors during hot module replacement
    if (typeof window.plausible === 'function') {
      window.plausible('pageview');
    }
  },
};

export default ExecutionEnvironment.canUseDOM ? clientModule : null;
