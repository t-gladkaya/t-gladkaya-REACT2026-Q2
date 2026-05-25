import React from 'react';
import { Link, useNavigate } from 'react-router';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-190 flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src="./about-icon.svg"
            alt="About"
            className="h-10 w-10 dark:invert"
          />
          <h1 className="m-0 text-4xl font-bold text-slate-900 dark:text-slate-100">
            About This App
          </h1>
          <p className="max-w-120 text-base text-slate-600 dark:text-slate-300">
            This app is designed for searching Rick and Morty characters, built
            as part of the React course.
          </p>
        </div>

        <div className="grid w-full gap-5 md:grid-cols-2">
          <Link
            to="https://github.com/t-gladkaya"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-58 flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 text-center text-slate-900 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-950/40 dark:focus:ring-slate-600"
          >
            <img
              src="./git-author.jfif"
              alt="Github profile"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-100 dark:ring-slate-800"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Created by
              </p>
              <p className="text-lg font-semibold">@t-gladkaya</p>
            </div>
          </Link>

          <Link
            to="https://rs.school/"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-58 flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 text-center text-slate-900 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-950/40 dark:focus:ring-slate-600"
          >
            <img
              src="./course-logo.jpg"
              alt="RS School"
              className="h-24 w-24 rounded-lg object-contain"
            />
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Course
              </p>
              <p className="text-lg font-semibold">RS School React</p>
            </div>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex w-40 cursor-pointer justify-center rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-slate-800 active:bg-slate-700 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
        >
          To Main Page
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
