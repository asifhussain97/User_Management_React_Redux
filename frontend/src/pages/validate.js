export const profileValidate = (values) => {
    const errors = {};
  
    if (!values.name.trim()) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]+$/.test(values.name)) {
      errors.name = "valid name";
    }
  
    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      errors.email = "Enter a valid email address";
    }
  
    if (!values.image) {
      errors.image = "Please upload an image";
    }
  
    return errors;
  };