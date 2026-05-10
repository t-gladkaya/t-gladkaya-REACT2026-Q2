import { describe, it, expect, beforeEach } from 'vitest';
import { getSavedSearchTerm, saveSearchTerm } from './handleLocalStorage';

describe('handleLocalStorage', () => {
  beforeEach(() => localStorage.clear());

  it('returns empty string if no search term is saved', () => {
    expect(getSavedSearchTerm()).toBe('');
  });

  it('returns saved search term from localStorage', () => {
    localStorage.setItem('lastInput', 'rick');

    expect(getSavedSearchTerm()).toBe('rick');
  });

  it('saves search term to localStorage', () => {
    saveSearchTerm('morty');

    expect(localStorage.getItem('lastInput')).toBe('morty');
  });
});
