import { useForm } from "react-hook-form";
import type { FormProps } from "../types/types";

const ReactHookForm = ({ onSuccess }: FormProps) => {
  const { register } = useForm();

  return (
    <form
      className="flex w-full min-w-64 max-w-72 flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSuccess();
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-name" className="text-sm font-medium text-slate-700">Name</label>
        <input 
          id="rhf-name"
          type="text" {...register("name")}
          className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-age" className="text-sm font-medium text-slate-700">Age</label>
        <input 
          id="rhf-age"
          type="number" {...register("age")} 
          className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="rhf-email" className="text-sm font-medium text-slate-700">Email</label>
        <input 
          id="rhf-email" 
          type="email" 
          {...register("email")} 
          className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
        />
      </div>

      <fieldset className="flex flex-col gap-1.5">
        <legend className="text-sm font-medium text-slate-700">Gender</legend>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input 
            type="radio"
            value="male" {...register("gender")}
            className="focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]" 
          />
          Male
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="radio" value="female" {...register("gender")} />
          Female
        </label>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="radio" value="other" {...register("gender")} />
          Other
        </label>

      </fieldset>

      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input type="checkbox" className="mt-1" {...register("terms")} />
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

export default ReactHookForm;
