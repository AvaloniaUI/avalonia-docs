interface SearchTranslations {
  button: {
    buttonText: string;
    buttonAriaLabel: string;
  };
  modal: {
    searchBox: {
      resetButtonTitle: string;
      resetButtonAriaLabel: string;
      cancelButtonText: string;
      cancelButtonAriaLabel: string;
    };
    startScreen: {
      recentSearchesTitle: string;
      noRecentSearchesText: string;
      saveRecentSearchButtonTitle: string;
      removeRecentSearchButtonTitle: string;
      favoriteSearchesTitle: string;
      removeFavoriteSearchButtonTitle: string;
    };
    errorScreen: {
      titleText: string;
      helpText: string;
    };
    footer: {
      selectText: string;
      navigateText: string;
      closeText: string;
      searchByText: string;
    };
    noResultsScreen: {
      noResultsText: string;
      suggestedQueryText: string;
      reportMissingResultsText: string;
      reportMissingResultsLinkText: string;
    };
  };
  placeholder?: string;
}

const translations: SearchTranslations = {
  button: {
    buttonText: 'Search',
    buttonAriaLabel: 'Search',
  },
  modal: {
    searchBox: {
      resetButtonTitle: 'Clear the query',
      resetButtonAriaLabel: 'Clear the query',
      cancelButtonText: 'Cancel',
      cancelButtonAriaLabel: 'Cancel',
    },
    startScreen: {
      recentSearchesTitle: 'Recent',
      noRecentSearchesText: 'No recent searches',
      saveRecentSearchButtonTitle: 'Save to recent',
      removeRecentSearchButtonTitle: 'Remove from recent',
      favoriteSearchesTitle: 'Favourites',
      removeFavoriteSearchButtonTitle: 'Remove from favourites',
    },
    errorScreen: {
      titleText: 'Unable to fetch results',
      helpText: 'You might want to check your network connection.',
    },
    footer: {
      selectText: 'to select',
      navigateText: 'to navigate',
      closeText: 'to close',
      searchByText: 'Search by',
    },
    noResultsScreen: {
      noResultsText: 'No results for',
      suggestedQueryText: 'Try searching for',
      reportMissingResultsText: 'Think this query should return results?',
      reportMissingResultsLinkText: 'Let us know.',
    },
  },
};

export default translations;
