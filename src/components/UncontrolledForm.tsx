import type { FormProps } from "../types/types";
import { countries } from "../features/forms/formSchema";

const UncontrolledForm = ({ onSuccess }: FormProps) => {
  return (
    <form
      className="grid w-[min(42rem,calc(100vw-4rem))] gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSuccess();
      }}   
    >
      <section className="grid gap-3 sm:grid-cols-2">
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
            min={0}
            step={1}
            onKeyDown={(event) => {
              if (["e", "E", "+", "-", "."].includes(event.key)) {
                event.preventDefault();
              }
            }}
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

        <fieldset className="grid gap-1.5 sm:col-span-2">
          <legend className="text-sm font-medium text-slate-700">Gender</legend>

          <div className="flex flex-wrap gap-3">
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
          </div>
        </fieldset>
      </section>

      <section className="grid gap-3 border-t border-slate-200 pt-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="uncontrolled-country" className="text-sm font-medium text-slate-700">
            Country
          </label>
          <input
            id="uncontrolled-country"
            name="country"
            type="text"
            list="uncontrolled-countries"
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />

          <datalist id="uncontrolled-countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="uncontrolled-image" className="text-sm font-medium text-slate-700">
            Upload file
          </label>
          <input
            id="uncontrolled-image"
            name="image"
            type="file"
            accept="image/png,image/jpeg"
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm file:mr-3 file:rounded file:border-0 file:bg-slate-950 file:px-3 file:py-1 file:text-sm file:font-medium file:text-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="uncontrolled-password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="uncontrolled-password"
            name="password"
            type="password"
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="uncontrolled-confirm-password" className="text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <input
            id="uncontrolled-confirm-password"
            name="confirmPassword"
            type="password"
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-700">
          <input type="checkbox" name="terms" className="mt-1" />
          I accept Terms and Conditions
        </label>
      </section>

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
