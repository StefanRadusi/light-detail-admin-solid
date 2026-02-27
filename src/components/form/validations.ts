export const isRequired = (value: string) => !!value;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
export const isEmail = (value: string) => emailRegex.test(value);
