import { Link } from 'react-router';
import {
  selectItem,
  unselectItem,
  useAppDispatch,
  useAppSelector,
} from '../app/state';
import type React from 'react';
import type { Character } from '../types/types';

interface CardProps {
  data: Character;
  detailsHref: string;
}

const Card = (props: CardProps) => {
  const { name, image, id } = props.data;
  const { detailsHref } = props;

  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedItems.items.some((item) => item.id === id)
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.target.checked) {
      dispatch(selectItem({ ...props.data, detailsUrl: detailsHref }));
    } else {
      dispatch(unselectItem(id));
    }
  };

  return (
    <Link
      to={detailsHref}
      className="relative flex flex-col gap-3 justify-between items-center bg-white rounded-3xl shadow-md w-full max-w-60 hover:translate-1 transition duration-300 ease-in-out pt-10 dark:bg-slate-800 dark:shadow-slate-950/40"
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleSelectChange}
        onClick={(event) => event.stopPropagation()}
        aria-label={`Select ${name}`}
        className="absolute right-4 top-4 h-5 w-5 cursor-pointer rounded border-slate-300 accent-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-600 dark:accent-slate-100 dark:focus:ring-slate-500 dark:focus:ring-offset-slate-800"
      />

      <h2 className="line-clamp-2 px-4 text-center text-lg leading-tight text-black-500 dark:text-white">
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
