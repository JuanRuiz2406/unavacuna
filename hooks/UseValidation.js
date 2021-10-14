import React, { useEffect, useState } from "react";

export const UseValidation = (initState, validate, fn) => {
  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        fn();
      }
      setSubmitForm(false);
    }
  }, [errors, fn, submitForm]);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitForm(true);
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };
  return { values, errors, submitForm, handleChange, handleSubmit, handleBlur };
};
