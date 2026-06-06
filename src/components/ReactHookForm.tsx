import type { FormProps } from "../types/types";


const ReactHookForm = ({ onSuccess }: FormProps) => {
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

export default ReactHookForm;