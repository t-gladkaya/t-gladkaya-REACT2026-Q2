import type { FormProps } from "../types/types";
import { countries, formSchema } from "../features/forms/formSchema";
import { useState } from "react";
import { z } from "zod";
import { useAppDispatch } from "../app/hooks";
import { addSubmission } from "../features/submissions/submissionsSlice";
import { fileToBase64 } from "../features/forms/fileToBase64";


type FormInputValues = z.input<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormInputValues, string>>;

const UncontrolledForm = ({ onSuccess }: FormProps) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const image = formData.get("image");

    const values = {
      name: formData.get("name"),
      age: formData.get("age"),
      email: formData.get("email"),
      gender: formData.get("gender"),
      terms: formData.get("terms") === "on",
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      country: formData.get("country"),
      image: image instanceof File && image.size > 0 ? image : undefined,
    }

    const result = formSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FormErrors = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (typeof fieldName === "string") {
          nextErrors[fieldName as keyof FormErrors] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    const imageBase64 = await fileToBase64(result.data.image);

    dispatch(addSubmission({
      id: crypto.randomUUID(),
      source: "uncontrolled",
      name: result.data.name,
      age: result.data.age,
      email: result.data.email,
      gender: result.data.gender,
      terms: result.data.terms,
      image: imageBase64,
      password: result.data.password,
      confirmPassword: result.data.confirmPassword,
      country: result.data.country,
      createdAt: new Date().toISOString(),
    }));

    setErrors({});
    form.reset();
    onSuccess();
  }

  return (
    <form
      className="grid w-[min(42rem,calc(100vw-4rem))] gap-4"
      onSubmit={handleSubmit}   
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
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name}</p>
          )}
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
          {errors.age && (
            <p className="text-xs text-red-600">{errors.age}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="uncontrolled-email" className="text-sm font-medium text-slate-700">Email</label>
          <input 
            id="uncontrolled-email"
            name="email"
            type="email" 
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
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
          {errors.gender && (
            <p className="text-xs text-red-600">{errors.gender}</p>
          )}
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
          {errors.country && (
            <p className="text-xs text-red-600">{errors.country}</p>
          )}
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
          {errors.image && (
            <p className="text-xs text-red-600">{errors.image}</p>
          )}
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
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password}</p>
          )}
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
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input type="checkbox" name="terms" className="mt-1" />
            I accept Terms and Conditions
          </label>

          {errors.terms && (
            <p className="text-xs text-red-600">{errors.terms}</p>
          )}
        </div>
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
