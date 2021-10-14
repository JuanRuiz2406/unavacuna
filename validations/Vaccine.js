export default function vaccine(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  } else if (values.name.length > 10) {
    errors.name = "El nombre es muy extenso";
  }

  if (!values.description) {
    errors.description = "La descipcion es obligatoria";
  } else if (values.description.length > 20) {
    errors.description = "La descipcion es muy extenso";
  }
  if (!values.quantity) {
    errors.quantity = "La cantidad es obligatoria";
  } else if (/[1-9]/.test(values.quantity)) {
    errors.quantity = "La cantidad de vacunas tiene que ser mayor";
  }

  return errors;
}
