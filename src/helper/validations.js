export const validateForm = (name, dni) => {
  let isValid = true;
  let nameError = "";
  let dniError = "";

  if (name.trim() === "") {
    nameError = "El nombre es requerido";
    isValid = false;
  } else if (name.length < 4) {
    nameError = "El nombre tiene que tener al menos 4 caracteres";
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    nameError = "El nombre solo debe contener letras y espacios";
    isValid = false;
  }

  if (dni.trim() === "") {
    dniError = "El DNI es requerido";
    isValid = false;
  } else if (!/^\d{8}$/.test(dni)) {
    dniError = "El DNI debe contener 8 números";
    isValid = false;
  }

  return {
    isValid,
    nameError,
    dniError,
  };
};
