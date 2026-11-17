import { track, type AskAiSurface } from './posthog'

// DocSearch v4 renders Ask AI into these classes. There is no public callback
// for it, so usage is counted from the DOM: a conversation screen appearing is
// one open (the search modal and the side panel use different containers), a
// user message node appearing is one question. Only counts are recorded; the
// question text never leaves the page.
const SCREEN_CLASSES = ['DocSearch-AskAiScreen', 'DocSearch-Sidepanel-ConversationScreen']
const USER_MESSAGE_CLASS = 'DocSearch-AskAiScreen-Message--user'

const seenScreens = new WeakSet<Element>()
const seenQuestions = new WeakSet<Element>()

function surfaceOf(element: Element): AskAiSurface {
  return element.closest('.DocSearch-Modal') ? 'search_modal' : 'side_panel'
}

function collect(root: Element, className: string): Element[] {
  const matches: Element[] = []
  if (root.classList.contains(className)) matches.push(root)
  matches.push(...Array.from(root.getElementsByClassName(className)))
  return matches
}

export function startAskAiTracking(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of Array.from(mutation.addedNodes)) {
        if (!(node instanceof Element)) continue

        for (const screenClass of SCREEN_CLASSES) {
          for (const screen of collect(node, screenClass)) {
            if (seenScreens.has(screen)) continue
            seenScreens.add(screen)
            track('ask_ai.opened', { surface: surfaceOf(screen) })
          }
        }

        for (const message of collect(node, USER_MESSAGE_CLASS)) {
          if (seenQuestions.has(message)) continue
          seenQuestions.add(message)
          track('ask_ai.asked', { surface: surfaceOf(message) })
        }
      }
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
