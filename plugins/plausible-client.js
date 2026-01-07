import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  return {
    onRouteUpdate({ location }) {
      // Check if plausible is loaded before calling it
      // This prevents errors during hot module replacement
      if (typeof window.plausible === 'function') {
        window.plausible('pageview');
      }
    },
  };
})();
