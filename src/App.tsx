import { useState } from "react";
import type { FormType } from "./types/types";
import Modal from "./components/Modal";
import UncontrolledForm from "./components/UncontrolledForm";
import ReactHookForm from "./components/ReactHookForm";
import { useAppSelector } from "./app/hooks";

function App() {
  const [ activeForm, setActiveForm ] = useState<FormType>(null);

  const closeModal = () => {
    setActiveForm(null);
  }

  const submissions = useAppSelector((state) => state.submissions.items);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-4">
        <section className="rounded-lg bg-white p-6 shadow">
          <h1 className="mb-4 text-xl font-semibold">Choose form type</h1>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
              onClick={() => setActiveForm('uncontrolled')}
            >
              Open Uncontrolled Form
            </button>

            <button
              type="button"
              className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-100 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
              onClick={() => setActiveForm('react-hook-form')}
            >
              Open React Hook Form
            </button>
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Submitted profiles</h2>

          {submissions.length === 0 ? (
            <p className="text-sm text-slate-500">No submitted profiles yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {submissions.map((submission) => (
                <article
                  key={submission.id}
                  className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm"
                >
                  <img
                    src={submission.image}
                    alt={`${submission.name} profile`}
                    className="h-40 w-full object-cover"
                  />

                  <div className="grid gap-2 p-4 text-sm text-slate-700">
                    <div>
                      <h3 className="text-base font-semibold text-slate-950">
                        {submission.name}
                      </h3>
                      <p className="text-slate-500">{submission.email}</p>
                    </div>

                    <p>Age: {submission.age}</p>
                    <p>Gender: {submission.gender}</p>
                    <p>Country: {submission.country}</p>
                    <p>Source: {submission.source}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <Modal isOpen={activeForm !== null} onClose={closeModal}>
          {activeForm === 'uncontrolled' && (
            <UncontrolledForm onSuccess={closeModal} />
          )}

          {activeForm === 'react-hook-form' && (
            <ReactHookForm onSuccess={closeModal} />
          )}
        </Modal>
      </section>
    </main>
  )
}

export default App
