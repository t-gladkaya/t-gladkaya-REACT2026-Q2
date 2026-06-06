import { useState } from "react";
import type { FormType } from "./types/types";
import Modal from "./components/Modal";
import UncontrolledForm from "./components/UncontrolledForm";
import ReactHookForm from "./components/ReactHookForm";

function App() {
  const [ activeForm, setActiveForm ] = useState<FormType>(null);

  const closeModal = () => {
    setActiveForm(null);
  }

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
          <h2 className="text-xl font-semibold">Submitted profiles</h2>
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
