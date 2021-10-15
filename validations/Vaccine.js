export default function vaccine(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "El nombre es obligatorio";
  } else if (values.name.length > 20) {
    errors.name = "El nombre es muy extenso";
  }

  if (!values.description) {
    errors.description = "La descipcion es obligatoria";
  } else if (values.description.length > 250) {
    errors.description = "La descipcion es muy extenso";
  }
  if (!values.quantity) {
    errors.quantity = "La cantidad es obligatoria";
  }

  return errors;
}
