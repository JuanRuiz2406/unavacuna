export default function VaccinatePatientValidate(values) {
  let errors = {};

  if (!values.idCard) {
    errors.idCard = "* La cédula es obligatoria *";
  } else if (values.idCard.length <= 8) {
    errors.idCard = "* La cedula es muy corta *";
  } else if (values.idCard.length >= 13) {
    errors.idCard = "* La cedula es muy extensa *";
  }

  if (!values.vaccine_Name) {
    errors.vaccine_Name = "* El nombre es obligatorio *";
  } else if (values.vaccine_Name.length > 20) {
    errors.vaccine_Name = "* El nombre es muy extenso *";
  }

  if (!values.dose) {
    errors.dose = "* Los apellidos son obligatorios *";
  } else if (values.dose.length > 30) {
    errors.dose = "* Los apellidos son muy extensos *";
  }

  if (!values.vaccinationPlace) {
    errors.vaccinationPlace = "* La direccion es obligatoria *";
  }

  return errors;
}
