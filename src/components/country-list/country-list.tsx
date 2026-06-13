import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = ({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) => {
  const countryPopulationById = useMemo(() => {
    return new Map(
      countries.map((country) => {
        const yearDataMap = createYearDataMap(country.data);
        const population = getPopulationForYear(yearDataMap, selectedYear) || 0;

        return [country.id, population];
      })
    );
  }, [countries, selectedYear]);

  const filteredCountries = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase();

    return countries
      .filter((c) => {
        const matchesSearch = c.id.toLowerCase().includes(normalizedSearchQuery);
        const matchesRegion = !selectedRegion || c.data.some((d) => d.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        } else {
          const popA = countryPopulationById.get(a.id) || 0;
          const popB = countryPopulationById.get(b.id) || 0;
          return sortOrder === 'asc' ? popA - popB : popB - popA;
        }
      });
  }, [countries, searchQuery, selectedRegion, sortField, sortOrder, countryPopulationById]);

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredCountries.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 240,
    overscan: 5,
  });

  return (
    <div ref={parentRef} className={styles.countryList}>
      <div
        className={styles.virtualContent}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const country = filteredCountries[virtualRow.index];

          return (
            <div
              key={country.id}
              ref={rowVirtualizer.measureElement}
              data-index={virtualRow.index}
              className={styles.virtualItem}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <CountryCard
                country={country}
                selectedYear={selectedYear}
                selectedColumns={selectedColumns}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
