import { JSX, createSignal } from "solid-js";
import { createStore, unwrap } from "solid-js/store";

type FormData = {
  [key: string]: string;
};

type ErrorsFormData = {
  errors: Record<string, string | undefined>;
};

type FormDataWithErrors = FormData & ErrorsFormData;

export const useForm = () => {
  const [loading, setLoading] = createSignal(false);
  const [isSentSuccessfully, setIsSentSuccessfully] = createSignal(false);
  const [isSentError, setIsSentError] = createSignal(false);
  const [data, setData] = createStore<FormDataWithErrors>({
    errors: {},
  } as any);
  const validations: Record<string, (value: string) => boolean> = {};
  const errorMsgs: Record<string, string> = {};

  const register = (
    name: string,
    validation?: (value: string) => boolean,
    errorMsg?: string
  ) => {
    if (validation) validations[name] = validation;
    if (errorMsg) errorMsgs[name] = errorMsg;

    const inputHandler: JSX.EventHandler<
      HTMLInputElement | HTMLTextAreaElement,
      InputEvent
    > = (event) => {
      setData(name, event.currentTarget.value);
      if (data.errors[name]) {
        setData("errors", name, undefined);
      }
    };

    return {
      value: data[name],
      errorMsg: data.errors[name],
      onInput: inputHandler,
    };
  };

  const onSubmit =
    <Payload, Response>(callBack: (data: Payload) => Promise<Response>) =>
    (event: SubmitEvent) => {
      event.preventDefault();

      const validationsKeys = Object.keys(validations);
      let hasError = false;
      for (const validationsKey of validationsKeys) {
        const value = data[validationsKey];
        const validation = validations[validationsKey];

        if (!validation(value)) {
          setData("errors", validationsKey, errorMsgs[validationsKey]);
          hasError = true;
        }
      }

      if (!hasError && !loading()) {
        const payload: Record<string, string> = { ...unwrap(data) };
        delete payload.errors;
        setLoading(true);
        callBack(payload as Payload)
          .then(() => setIsSentSuccessfully(true))
          .catch(() => setIsSentError(true))
          .finally(() => setLoading(false));
      }
    };

  const submit = <Payload, Response>(
    callBack: (data: Payload) => Promise<Response>
  ) => {
    return {
      loading: loading(),
      isSentSuccessfully: isSentSuccessfully(),
      isSentError: isSentError(),
      onSubmit: onSubmit(callBack),
    };
  };

  return { register, submit };
};
