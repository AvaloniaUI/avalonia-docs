/// <reference types="@docusaurus/module-type-aliases" />
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment'
import siteConfig from '@generated/docusaurus.config'
import { initPostHog } from '../lib/posthog'
import { startAskAiTracking } from '../lib/askAiTracking'

if (ExecutionEnvironment.canUseDOM) {
  const customFields = siteConfig.customFields ?? {}
  const token = typeof customFields.posthogToken === 'string' ? customFields.posthogToken : undefined
  const host = typeof customFields.posthogHost === 'string' ? customFields.posthogHost : undefined

  if (initPostHog(token, host)) {
    startAskAiTracking()
  }
}
