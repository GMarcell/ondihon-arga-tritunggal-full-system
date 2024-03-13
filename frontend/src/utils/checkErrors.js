export const checkFormError = (formState, fieldName) => {
  return formState == null ? false : fieldName in formState;
};
