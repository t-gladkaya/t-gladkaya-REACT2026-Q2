import React from 'react';

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
}

class Card extends React.Component<CardProps> {
  render() {
    const { name, status, species, gender, image } = this.props.data;

    return (
      <div className="flex flex-col items-center bg-white rounded-3xl p-5 shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-slate-900">{name}</h2>
        <div className="flex flex-col gap-1 mt-3 space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Status:</span> {status}
          </p>
          <p>
            <span className="font-semibold">Species:</span> {species}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {gender}
          </p>
          <p>
            <img
              src={image}
              alt="Character image"
              className="h-40 rounded-lg"
            />
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
