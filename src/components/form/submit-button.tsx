import { ArrowIcon } from "./arrows-icon";

export const SubmitButton = () => {
  return (
    <button type="submit" class="flex items-center self-end mt-6 z-10">
      <ArrowIcon />
      <span class=" ml-2 text-brandYellow">S</span>END
    </button>
  );
};
