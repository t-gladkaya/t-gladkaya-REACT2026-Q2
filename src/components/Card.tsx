import { Link } from 'react-router';

export interface Character {
  id: string;
  name: string;
  image: string;
}

interface CardProps {
  data: Character;
  detailsHref: string;
}

const Card = (props: CardProps) => {
  const { name, image } = props.data;
  const { detailsHref } = props;

  return (
    <Link
      to={detailsHref}
      className="flex flex-col gap-3 justify-between items-center bg-white rounded-3xl shadow-md w-full max-w-60 hover:translate-1 transition duration-300 ease-in-out pt-5"
    >
      <h2 className="line-clamp-2 px-4 text-center font-serif text-lg font-bold leading-tight text-emerald-700">
        {name}
      </h2>

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
