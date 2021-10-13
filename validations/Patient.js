export default function patientValidate(values) {
  let errors = {};

  if (!values.idCard) {
    errors.idCard = "El cedula es obligatorio";
  } else if (values.idCard.length <= 8 ) {
    errors.idCard = "La cedula es muy corta";
  } else if (values.idCard.length >= 13){
    errors.idCard = "La cedula es muy extensa";
  }

  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  } else if (values.name.length > 10) {
    errors.name = "El nombre es muy extenso";
  }

  if (!values.lastName) {
    errors.lastName = "El apellido es obligatorio";
  } else if (values.lastName.length > 10) {
    errors.lastName = "El apellido es muy extenso";
  }

  if (!values.birthDate) {
    errors.birthDate = "La fecha es obligatoria";
  }

 if (!values.age) {
    errors.age = "La edad es obligatoria";
  } else if (values.age.length > 5) {
    errors.age = "El usuario tiene que ser mayor a 5";
  } else if (values.age.length > 120) {
    errors.age = "El usuario tiene que ser menor 120";
  }

  if (!values.address) {
    errors.address = "La direccion es obligatoria";
  }

 

  return errors;
}
