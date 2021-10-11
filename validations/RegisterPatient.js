export default function registerValidate(values) {
  let errors = {};

  if (!values.idCard) {
    errors.idCard = "La cédula es obligatoria";
  }

  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  } else if (!/^[a-zA-Z\s]*$/.test(values.name)) {
    errors.name = "Nombre no valido";
  }

  if (!values.lastLame) {
    errors.lastLame = "La apellido es obligatorio";
  } else if (!/^[a-zA-Z\s]*$/.test(values.name)) {
    errors.lastLame = "Apellido no valido";
  }

  if (!values.age) {
    errors.age = "La edad es obligatoria";
  }

  if (!values.address) {
    errors.address = "La dirección es obligatoria";
  }

  if (!values.vaccinationPlace) {
    errors.vaccinationPlace = "El lugar de vacunación es obligatorio";
  }
  /*
  if (!values.dose) {
    errors.dose = "La dosis es obligatoria";
  }

  if (!values.vaccine) {
    errors.vaccine = "La vacuna es obligatoria";
  }
*/
  return errors;
}
