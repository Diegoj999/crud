export const validateForm = (name, dni, occ) => {
  let errors = {}
  const nameRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/;
  const dniRegex = /^\d{8}$/

  if (name.trim() === "") {
    errors.name = "El nombre es requerido";
  } else if (name.length < 4) {
    errors.name = "El nombre tiene que tener al menos 4 caracteres";
  } else if (!nameRegex.test(name)) {
    errors.name = "El nombre solo debe contener letras y espacios";
  }

  if (dni.trim() === "") {
    errors.dni = "El DNI es requerido";
  } else if (!dniRegex.test(dni)) {
    errors.dni = "El DNI debe contener 8 números";
  }

  if (occ.trim() === "") {
    errors.occ = "La ocupación es requerida";
  }

 
  let nameValidated =  errors?.name ? errors.name : "";
  let dniValidated =  errors?.dni ? errors.dni : "";
  let occValidated =  errors?.occ ? errors.occ : "";

  const errorsFix = {...errors, nameValidated, dniValidated, occValidated}

  return errorsFix
};
