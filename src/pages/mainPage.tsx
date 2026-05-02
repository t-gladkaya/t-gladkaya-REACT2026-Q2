import React from 'react';
import SearchLine from '../components/SearchLine';
import ResultsSection from '../components/ResultsSection';
import TestButton from '../components/TestButton';
import type { Character } from '../components/Card';
import { API_URLS } from '../api/api';
import {
  getSavedSearchTerm,
  saveSearchTerm,
} from '../utils/handleLocalStorage';

interface CharacterResponse {
  results: Character[];
}

interface MainPageState {
  query: string;
  results: Character[];
  loading: boolean;
  error: string | null;
}

class MainPage extends React.Component<object, MainPageState> {
  state: MainPageState = {
    query: '',
    results: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const savedQuery = getSavedSearchTerm();

    this.setState({ query: savedQuery }, () => {
      void this.handleSearch();
    });
  }

  handleQueryChange = (query: string) => {
    this.setState({ query });
  };

  handleSearch = async () => {
    saveSearchTerm(this.state.query);
    this.setState({ loading: true, error: null });

    try {
      const data = await this.fetchCharacter(this.state.query);
      this.setState({ results: data.results, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({
        results: [],
        loading: false,
        error: 'Something went wrong while loading results.',
      });
    }
  };

  fetchCharacter = async (query: string): Promise<CharacterResponse> => {
    let lastError: unknown;

    for (const apiUrl of API_URLS) {
      try {
        const trimmedQuery = query.trim();
        const url = trimmedQuery
          ? `${apiUrl}?name=${encodeURIComponent(trimmedQuery)}`
          : apiUrl;
        const response = await fetch(url);

        if (response.status === 404) {
          return { results: [] };
        }

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return (await response.json()) as CharacterResponse;
      } catch (error) {
        lastError = error;
        console.error(`Error fetching from ${apiUrl}: `, error);
      }
    }

    throw lastError ?? new Error('Failed to fetch planets.');
  };

  render() {
    const { query, results, loading, error } = this.state;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-295 flex-col gap-8 px-6 py-8">
          <SearchLine
            value={query}
            onChange={this.handleQueryChange}
            onSearch={this.handleSearch}
          />
          <ResultsSection results={results} loading={loading} error={error} />
          <TestButton />
        </div>
      </div>
    );
  }
}

export default MainPage;
