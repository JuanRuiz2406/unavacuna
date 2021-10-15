export default function patient(values) {
  let errors = {};

  if (!values.idCard) {
    errors.idCard = "* La cédula es obligatoria *";
  } else if (values.idCard.length <= 8) {
    errors.idCard = "* La cedula es muy corta *";
  } else if (values.idCard.length >= 13) {
    errors.idCard = "* La cedula es muy extensa *";
  }

  if (!values.name) {
    errors.name = "* El nombre es obligatorio *";
  } else if (values.name.length > 20) {
    errors.name = "* El nombre es muy extenso *";
  }

  if (!values.lastName) {
    errors.lastName = "* Los apellidos son obligatorios *";
  } else if (values.lastName.length > 30) {
    errors.lastName = "* Los apellidos son muy extensos *";
  }

  if (!values.birthDate) {
    errors.birthDate = "* La fecha es obligatoria *";
  }

  if (!values.age) {
    errors.age = "* La edad es obligatoria *";
  } else if (values.age.length > 5) {
    errors.age = "* El usuario tiene que ser mayor a 5 años *";
  } else if (values.age.length > 120) {
    errors.age = "* El usuario tiene que ser menor a 120 años *";
  }

  if (!values.address) {
    errors.address = "* La direccion es obligatoria *";
  }

  return errors;
}
