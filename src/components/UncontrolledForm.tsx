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
    </form>
  )
};

export default UncontrolledForm;