import type { FormProps } from "../types/types";
const UncontrolledForm = ({ onSuccess }: FormProps) => {
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSuccess();
      }}   
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="uncontrolled-name" className="text-sm font-medium text-slate-700">Name</label>
        <input 
          id="uncontrolled-name"
          name="name"
          type="text"
          className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="uncontrolled-age" className="text-sm font-medium text-slate-700">Age</label>
        <input 
          id="uncontrolled-age"
          name="age"
          type="number"
          className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="uncontrolled-email" className="text-sm font-medium text-slate-700">Email</label>
        <input 
          id="uncontrolled-email"
          name="email"
          type="email" 
          className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        />
      </div>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-sm font-medium text-slate-700">Gender</legend>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input 
            type="radio"
            name="gender"
            value="male"
            className="focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]" 
          />
          Male
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="radio" name="gender" value="female" />
          Female
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="radio" name="gender" value="other" />
          Other
        </label>

      </fieldset>

      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input type="checkbox" name="terms" className="mt-1" />
        I accept Terms and Conditions
      </label>

      <button
        type="submit"
        className="rounded bg-slate-950 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
      >
        Submit
      </button>
    </form>
  )
};

export default UncontrolledForm;