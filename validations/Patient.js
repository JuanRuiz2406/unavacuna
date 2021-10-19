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
  } else if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(values.name)) {
    errors.name = "* Solo se permiten letras *";
  }

  if (!values.lastName) {
    errors.lastName = "* Los apellidos son obligatorios *";
  } else if (values.lastName.length > 30) {
    errors.lastName = "* Los apellidos son muy extensos *";
  } else if (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(values.lastName)) {
    errors.lastName = "* Solo se permiten letras *";
  }

  if (!values.birthDate) {
    errors.birthDate = "* La fecha es obligatoria *";
  }

  if (!values.address) {
    errors.address = "* La direccion es obligatoria *";
  }

  return errors;
}
