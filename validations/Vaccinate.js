export default function vaccinate(values) {
  let errors = {};
  let formIsValid = true;

  if (!values.vaccineName) {
    formIsValid = false;
    errors.vaccineName = "* Debe seleccionar alguna Vacuna *";
  }

  if (!values.dose) {
    formIsValid = false;
    errors.dose = "* Debe seleccionar alguna Dosis *";
  }

  if (!values.vaccinationPlace) {
    formIsValid = false;
    errors.vaccinationPlace = "* El Lugar de Vacunación es obligatorio *";
  }

  return { errors, formIsValid };
}
