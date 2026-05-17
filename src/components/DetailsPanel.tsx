import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { API_URLS } from '../api/api';

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

  return (
    <aside className="w-90 shrink-0 rounded-3xl bg-white p-6 shadow-md transition-all duration-300 ease-out animate-[slideIn_250ms_ease-out]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Character details
        </h2>

        <button
          type="button"
          onClick={handleClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800 active:bg-slate-700"
          aria-label="Close details"
        >
          x
        </button>
      </div>

      <p className="text-sm text-slate-600">
        {loading ? (
          <p className="text-sm text-slate-600">Loading details...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error.message}</p>
        ) : character ? (
          <div className="flex flex-col gap-4">
            <img
              src={character.image}
              alt={character.name}
              className="w-full rounded-2xl object-cover"
            />

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {character.name}
              </h3>

              <div className="mt-3 flex flex-col gap-2 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Status:</span>{' '}
                  {character.status}
                </p>
                <p>
                  <span className="font-semibold">Species:</span>{' '}
                  {character.species}
                </p>
                <p>
                  <span className="font-semibold">Gender:</span>{' '}
                  {character.gender}
                </p>
                <p>
                  <span className="font-semibold">Origin:</span>{' '}
                  {character.origin.name}
                </p>
                <p>
                  <span className="font-semibold">Location:</span>{' '}
                  {character.location.name}
                </p>
                <p>
                  <span className="font-semibold">Episodes:</span>{' '}
                  {character.episode.length}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-600">No details found.</p>
        )}
      </p>
    </aside>
  );
};

export default DetailsPanel;
