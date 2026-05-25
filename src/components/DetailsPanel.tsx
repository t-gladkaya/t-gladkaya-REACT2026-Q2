import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { API_URLS } from '../api/api';
import PreLoader from './PreLoader';

interface CharacterDetails {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: string[];
  created: string;
}

const DetailsPanel = () => {
  const { id, page } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = React.useState<CharacterDetails | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchCharacterDetails = async (
    id: string
  ): Promise<CharacterDetails> => {
    let lastError: unknown;

    for (const apiUrl of API_URLS) {
      try {
        const response = await fetch(`${apiUrl}/${id}`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return (await response.json()) as CharacterDetails;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError ?? new Error('Failed to fetch character details.');
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }

    let isCancelled = false;

    const loadDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCharacterDetails(id);

        if (isCancelled) {
          return;
        }

        setCharacter(data);
      } catch {
        if (isCancelled) {
          return;
        }

        setCharacter(null);
        setError(new Error('Something went wrong while loading details.'));
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void loadDetails();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  const handleClose = () => {
    navigate(`/page/${page ?? 1}`);
  };

  const details = character
    ? [
        ['Status', character.status],
        ['Species', character.species],
        ...(character.type ? [['Type', character.type]] : []),
        ['Gender', character.gender],
        ['Origin', character.origin.name],
        ['Location', character.location.name],
        ['Episodes', character.episode.length.toString()],
      ]
    : [];

  return (
    <aside className="h-full w-90 shrink-0 overflow-hidden rounded-3xl bg-white p-4 shadow-md transition-all duration-300 ease-out animate-[slideIn_250ms_ease-out] dark:bg-slate-900 dark:shadow-slate-950/40">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Character details
        </h2>

        <button
          type="button"
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 active:bg-slate-700 cursor-pointer dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
          aria-label="Close details"
        >
          x
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-600 dark:text-slate-300">
          <PreLoader />
        </div>
      ) : error ? (
        <p className="text-sm text-red-600">{error.message}</p>
      ) : character ? (
        <div className="flex h-[calc(100%-2.5rem)] flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <img
              src={character.image}
              alt={character.name}
              className="mx-auto mt-3 aspect-square w-32 shrink-0 rounded-2xl object-cover"
            />

            <div className="min-h-0 p-3">
              <h3 className="truncate text-base font-semibold leading-tight text-slate-900 dark:text-slate-100">
                {character.name}
              </h3>

              <dl className="mt-2 grid gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                {details.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[4.5rem_1fr] gap-2 leading-tight text-lte"
                  >
                    <dt className="font-semibold text-slate-900 dark:text-slate-100">
                      {label}
                    </dt>
                    <dd className="min-w-0 truncate">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          No details found.
        </p>
      )}
    </aside>
  );
};

export default DetailsPanel;
