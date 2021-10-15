export default function vaccinate(values) {
  let errors = {};
  let formIsValid = true;

  /*
  if (!values.idCard) {
    formIsValid = false;
    errors.idCard = "* La cédula es obligatoria *";
  } else if (values.idCard.length <= 8) {
    formIsValid = false;
    errors.idCard = "* La cedula es muy corta *";
  } else if (values.idCard.length >= 13) {
    formIsValid = false;
    errors.idCard = "* La cedula es muy extensa *";
  }
  */

  if (!values.vaccineName) {
    formIsValid = false;
    errors.vaccineName = "* El nombre es obligatorio *";
  } else if (values.vaccineName.length > 20) {
    formIsValid = false;
    errors.vaccineName = "* El nombre es muy extenso *";
  }

  if (!values.dose) {
    formIsValid = false;
    errors.dose = "* Los apellidos son obligatorios *";
  } else if (values.dose.length > 30) {
    formIsValid = false;
    errors.dose = "* Los apellidos son muy extensos *";
  }

  if (!values.vaccinationPlace) {
    formIsValid = false;
    errors.vaccinationPlace = "* La direccion es obligatoria *";
  }

  return { errors, formIsValid };
}
