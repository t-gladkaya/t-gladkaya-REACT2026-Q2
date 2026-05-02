const SEARCH_TERM_KEY = 'lastInput';

export function getSavedSearchTerm(): string {
  return localStorage.getItem(SEARCH_TERM_KEY) ?? '';
}

export function saveSearchTerm(input: string): void {
  localStorage.setItem(SEARCH_TERM_KEY, input);
}
