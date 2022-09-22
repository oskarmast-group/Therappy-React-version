export const toFormData = (object) => {
  const formdata = new FormData();

  Object.entries(object).forEach(([key, value]) => {
    if(value !== null) {
      value = typeof value === "object" && !(value instanceof File) ? JSON.stringify(value) : value;
      formdata.append(key, value);
    }
  });

  return formdata;
};

export const compareStrings = (a, b) => a.trim().toLowerCase().includes(b.trim().toLowerCase());