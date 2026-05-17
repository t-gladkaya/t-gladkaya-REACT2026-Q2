import { Link } from 'react-router';

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface CardProps {
  data: Character;
  detailsHref: string;
}

const Card = (props: CardProps) => {
  const { name, status, species, gender, image } = props.data;
  const { detailsHref } = props;

  return (
    <Link
      to={detailsHref}
      className="flex flex-col gap-3 justify-between items-center bg-white rounded-3xl shadow-md w-full max-w-60 hover:translate-1 transition duration-300 ease-in-out pt-5"
    >
      <h2 className="text-l font-semibold text-slate-900">{name}</h2>

      <div className="flex flex-col gap-1 text-sm text-slate-700">
        <p>
          <span className="font-semibold">Status:</span> {status}
        </p>
        <p>
          <span className="font-semibold">Species:</span> {species}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {gender}
        </p>
      </div>
      <div>
        <img
          src={image}
          alt="Character image"
          className="w-full rounded-b-lg"
        />
      </div>
    </Link>
  );
};

export default Card;
