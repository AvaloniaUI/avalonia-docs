import React, {useCallback, useMemo, useRef, useState, ReactNode} from 'react';
import {createPortal} from 'react-dom';
import {DocSearchButton, useDocSearchKeyboardEvents} from '@docsearch/react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import DefaultSearchBar from '@theme-original/SearchBar';
import {
  isRegexpStringMatch,
  useSearchLinkCreator,
} from '@docusaurus/theme-common';
import {
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import translations from '@theme/SearchTranslations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let DocSearchModal: any = null;

function importDocSearchModalIfNeeded(): Promise<void> {
  if (DocSearchModal) {
    return Promise.resolve();
  }
  return Promise.all([
    import('@docsearch/react/modal'),
    import('@docsearch/react/style'),
    import('./styles.scss'),
  ]).then(([{DocSearchModal: Modal}]) => {
    DocSearchModal = Modal;
  });
}

interface NavigatorParams {
  itemUrl: string;
}

interface UseNavigatorProps {
  externalUrlRegex?: string;
}

function useNavigator({externalUrlRegex}: UseNavigatorProps) {
  const history = useHistory();
  const [navigator] = useState(() => {
    return {
      navigate(params: NavigatorParams) {
        // Algolia results could contain URL's from other domains which cannot
        // be served through history and should navigate with window.location
        if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
          window.location.href = params.itemUrl;
        } else {
          history.push(params.itemUrl);
        }
      },
    };
  });
  return navigator;
}

function useTransformSearchClient() {
  const {
    siteMetadata: {docusaurusVersion},
  } = useDocusaurusContext();
  return useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (searchClient: any) => {
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion);
      return searchClient;
    },
    [docusaurusVersion],
  );
}

interface SearchItem {
  url: string;
  [key: string]: unknown;
}

interface UseTransformItemsProps {
  transformItems?: (items: SearchItem[]) => SearchItem[];
}

function useTransformItems(props: UseTransformItemsProps) {
  const processSearchResultUrl = useSearchResultUrlProcessor();
  const [transformItems] = useState(() => {
    return (items: SearchItem[]) =>
      props.transformItems
        ? // Custom transformItems
          props.transformItems(items)
        : // Default transformItems
          items.map((item) => ({
            ...item,
            url: processSearchResultUrl(item.url),
          }));
  });
  return transformItems;
}

interface UseResultsFooterComponentProps {
  closeModal: () => void;
}

function useResultsFooterComponent({closeModal}: UseResultsFooterComponentProps) {
  return useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({state}: {state: any}) =>
        <ResultsFooter state={state} onClose={closeModal} />,
    [closeModal],
  );
}

interface HitProps {
  hit: {url: string};
  children: ReactNode;
}

function Hit({hit, children}: HitProps): JSX.Element {
  return <Link to={hit.url}>{children}</Link>;
}

interface ResultsFooterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
  onClose: () => void;
}

function ResultsFooter({state, onClose}: ResultsFooterProps): JSX.Element {
  const createSearchLink = useSearchLinkCreator();
  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate
        id="theme.SearchBar.seeAll"
        values={{count: state.context.nbHits}}>
        {'See all {count} results'}
      </Translate>
    </Link>
  );
}

interface UseSearchParametersProps {
  contextualSearch?: boolean;
  searchParameters?: {
    facetFilters?: string | string[];
  };
}

function useSearchParameters({contextualSearch, ...props}: UseSearchParametersProps) {
  type FacetFilter = string | string[] | readonly (string | string[])[];

  function mergeFacetFilters(f1: FacetFilter | undefined, f2: FacetFilter): (string | string[])[] {
    const normalize = (f: FacetFilter | undefined): (string | string[])[] => {
      if (!f) return [];
      if (typeof f === 'string') return [f];
      return [...f] as (string | string[])[];
    };
    return [...normalize(f1), ...normalize(f2)];
  }

  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters();
  const configFacetFilters = props.searchParameters?.facetFilters ?? [];

  // Get the current path to determine which product we're viewing
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  let product: string | null = null;

  // Determine the product based on the URL path
  if (path.startsWith('/xpf/')) {
    product = 'xpf';
  } else if (path.startsWith('/docs/')) {
    product = 'avalonia';
  } else if (path.startsWith('/accelerate/')) {
    product = 'accelerate';
  }

  // Only add product facet if we've determined a product
  const dynamicFacet = product ? [`product:${product}`] : [];

  // Merge all facet filters
  const facetFilters = contextualSearch
    ? mergeFacetFilters(contextualSearchFacetFilters, [
        ...configFacetFilters,
        ...dynamicFacet,
      ])
    : mergeFacetFilters(configFacetFilters, dynamicFacet);

  return {
    ...props.searchParameters,
    facetFilters,
  };
}

interface DocSearchProps {
  externalUrlRegex?: string;
  appId: string;
  apiKey: string;
  indexName: string;
  searchPagePath?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations?: any;
  contextualSearch?: boolean;
  searchParameters?: {
    facetFilters?: string | string[];
  };
  transformItems?: (items: SearchItem[]) => SearchItem[];
}

function DocSearch({externalUrlRegex, ...props}: DocSearchProps): JSX.Element {
  const navigator = useNavigator({externalUrlRegex});
  const searchParameters = useSearchParameters({...props});
  const transformItems = useTransformItems(props);
  const transformSearchClient = useTransformSearchClient();
  const searchContainer = useRef<HTMLDivElement | null>(null);
  const searchButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | undefined>(undefined);

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div');
      searchContainer.current = divElement;
      document.body.insertBefore(divElement, document.body.firstChild);
    }
  }, []);

  const openModal = useCallback(() => {
    prepareSearchContainer();
    importDocSearchModalIfNeeded().then(() => setIsOpen(true));
  }, [prepareSearchContainer]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    searchButtonRef.current?.focus();
    setInitialQuery(undefined);
  }, []);

  const handleInput = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'f' && (event.metaKey || event.ctrlKey)) {
        // ignore browser's ctrl+f
        return;
      }
      // prevents duplicate key insertion in the modal input
      event.preventDefault();
      setInitialQuery(event.key);
      openModal();
    },
    [openModal],
  );

  const resultsFooterComponent = useResultsFooterComponent({closeModal});

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen: openModal,
    onClose: closeModal,
    onInput: handleInput,
    searchButtonRef,
  });

  return (
    <>
      <Head>
        {/* This hints the browser that the website will load data from Algolia,
        and allows it to preconnect to the DocSearch cluster. It makes the first
        query faster, especially on mobile. */}
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={openModal}
        ref={searchButtonRef}
        translations={props.translations?.button ?? translations.button}
      />

      {isOpen &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={closeModal}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && {
              resultsFooterComponent,
            })}
            placeholder={translations.placeholder}
            {...props}
            translations={props.translations?.modal ?? translations.modal}
            searchParameters={searchParameters}
          />,
          searchContainer.current,
        )}
    </>
  );
}

interface SearchBarProps {
  [key: string]: unknown;
}

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const searchConfig = (siteConfig.themeConfig as any).algolia;

  // If Algolia config is missing, fall back to the default search bar
  if (!searchConfig || !searchConfig.appId || !searchConfig.apiKey || !searchConfig.indexName) {
    console.warn('Algolia search configuration is incomplete. Check your themeConfig.algolia settings in docusaurus.config.js');
    return <DefaultSearchBar {...props} />;
  }

  return <DocSearch {...searchConfig} {...props} />;
}
