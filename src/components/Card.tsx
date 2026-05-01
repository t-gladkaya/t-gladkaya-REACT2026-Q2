import React from 'react';

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  url: string;
}

interface CardProps {
  data: Planet;
}

class Card extends React.Component<CardProps> {
  render() {
    const {
      name,
      rotation_period,
      orbital_period,
      diameter,
      climate,
      gravity,
      terrain,
      surface_water,
      population,
    } = this.props.data;

    return (
      <div className="bg-white rounded-3xl p-5 shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-slate-900">{name}</h2>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Name:</span> {name}
          </p>
          <p>
            <span className="font-semibold">Rotation Period:</span>{' '}
            {rotation_period}
          </p>
          <p>
            <span className="font-semibold">Orbital Period:</span>{' '}
            {orbital_period}
          </p>
          <p>
            <span className="font-semibold">Diameter:</span> {diameter} km
          </p>
          <p>
            <span className="font-semibold">Climate:</span> {climate}
          </p>
          <p>
            <span className="font-semibold">Gravity:</span> {gravity}
          </p>
          <p>
            <span className="font-semibold">Terrain:</span> {terrain}
          </p>
          <p>
            <span className="font-semibold">Surface Water:</span>{' '}
            {surface_water}
          </p>
          <p>
            <span className="font-semibold">Population:</span> {population}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
