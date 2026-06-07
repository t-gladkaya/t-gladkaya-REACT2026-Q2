import { z } from "zod";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import type { FormProps } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../features/forms/formSchema";
import { fileToBase64 } from "../features/forms/fileToBase64";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addSubmission } from "../features/submissions/submissionsSlice";
import { getPasswordStrength } from "../features/forms/passwordStrength";

type FormInputValues = z.input<typeof formSchema>;
type FormOutputValues = z.output<typeof formSchema>;

const ReactHookForm = ({ onSuccess }: FormProps) => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.submissions.countries);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<FormInputValues, unknown, FormOutputValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const password = String(
    useWatch({
      control,
      name: "password",
    }) ?? ""
  );
  const passwordStrength = getPasswordStrength(password);

  const onSubmit: SubmitHandler<FormOutputValues> = async(data) => {
    const imageBase64 = await fileToBase64(data.image);
    const submissionId = crypto.randomUUID();

    dispatch(addSubmission({
      id: submissionId,
      source: "react-hook-form",
      name: data.name,
      age: data.age,
      email: data.email,
      gender: data.gender,
      terms: data.terms,
      image: imageBase64,
      password: data.password,
      confirmPassword: data.confirmPassword,
      country: data.country,
      createdAt: new Date().toISOString(),
    }))
    onSuccess(submissionId);
  }

  return (
    <form
      className="grid w-[min(42rem,calc(100vw-4rem))] gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-name" className="text-sm font-medium text-slate-700">Name</label>
          <input
            id="rhf-name"
            type="text" {...register("name")}
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
          />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-age" className="text-sm font-medium text-slate-700">Age</label>
          <input 
            id="rhf-age"
            type="number"
            min={0}
            step={1}
            {...register("age")}
            onKeyDown={(event) => {
              if (["e", "E", "+", "-", "."].includes(event.key)) {
                event.preventDefault();
              }
            }}
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
          />
          {errors.age && (
            <p className="text-xs text-red-600">{errors.age.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-email" className="text-sm font-medium text-slate-700">Email</label>
          <input 
            id="rhf-email" 
            type="email" 
            {...register("email")} 
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <fieldset className="grid gap-1.5 sm:col-span-2">
          <legend className="text-sm font-medium text-slate-700">Gender</legend>

          <div className="flex flex-wrap gap-3">
            <label htmlFor="rhf-gender-male" className="flex items-center gap-2 text-sm text-slate-700">
              <input 
                id="rhf-gender-male"
                type="radio"
                value="male" {...register("gender")}
                className="focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)]" 
              />
              Male
            </label>

            <label htmlFor="rhf-gender-female" className="flex items-center gap-2 text-sm text-slate-700">
              <input id="rhf-gender-female" type="radio" value="female" {...register("gender")} />
              Female
            </label>

            <label htmlFor="rhf-gender-other" className="flex items-center gap-2 text-sm text-slate-700">
              <input id="rhf-gender-other" type="radio" value="other" {...register("gender")} />
              Other
            </label>
          </div>

          {errors.gender && (
            <p className="text-xs text-red-600">{errors.gender.message}</p>
          )}

        </fieldset>
      </section>

      <section className="grid gap-3 border-t border-slate-200 pt-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-country" className="text-sm font-medium text-slate-700">
            Country
          </label>
          <input
            id="rhf-country"
            type="text"
            list="rhf-countries"
            {...register("country")}
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />

          <datalist id="rhf-countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>

          {errors.country && (
            <p className="text-xs text-red-600">{errors.country.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-image" className="text-sm font-medium text-slate-700">
            Upload file
          </label>
          <input
            id="rhf-image"
            type="file"
            accept="image/png,image/jpeg"
            onChange={(event) => {
              const file = event.target.files?.[0];

              setValue("image", file as File, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm file:mr-3 file:rounded file:border-0 file:bg-slate-950 file:px-3 file:py-1 file:text-sm file:font-medium file:text-white"
          />
          {errors.image && (
            <p className="text-xs text-red-600">{errors.image.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-password" className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="rhf-password"
            type="password"
            {...register("password")}
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          {password.length > 0 && (
            <ul className="grid gap-1 text-xs text-slate-500">
              <li className={passwordStrength.hasNumber ? "text-green-600" : ""}>
                1 number
              </li>
              <li className={passwordStrength.hasUppercase ? "text-green-600" : ""}>
                1 uppercase letter
              </li>
              <li className={passwordStrength.hasLowercase ? "text-green-600" : ""}>
                1 lowercase letter
              </li>
              <li className={passwordStrength.hasSpecial ? "text-green-600" : ""}>
                1 special character
              </li>
            </ul>
          )}

          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-confirm-password" className="text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <input
            id="rhf-confirm-password"
            type="password"
            {...register("confirmPassword")}
            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rhf-terms" className="flex items-start gap-2 text-sm text-slate-700">
            <input id="rhf-terms" type="checkbox" className="mt-1" {...register("terms")} />
            I accept Terms and Conditions
          </label>

          {errors.terms && (
            <p className="text-xs text-red-600">{errors.terms.message}</p>
          )}
        </div>
      </section>

      <button
        type="submit"
        disabled={!isValid}
        className="rounded bg-slate-950 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800 hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(34,211,238,0.7)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
      >
        Submit
      </button>
    </form>
  )
};

export default ReactHookForm;
