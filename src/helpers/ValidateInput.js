function validate(name, value) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  switch (name) {
    case "name": {
      if (!value || value.length < 3) {
        return "Name must be more than 3 characters";
      } else if (/[0-9]/g.test(value)) {
        return "Name is not a valid";
      } else {
        return "";
      }
    }
    case "address": {
      if (!value || value.length < 5) {
        return "Please enter Your home address";
      } else {
        return "";
      }
    }
    case "email": {
      if (!value || value.length === 0) {
        return "Email address is required";
      } else if (!regexEmail.test(value.toLowerCase())) {
        return "Please enter a valid email address";
      } else {
        return "";
      }
    }
    case "zip": {
      if (!value || value.length < 4) {
        return "Zip must be more than 4 characters";
      } else {
        return "";
      }
    }
    default:
      return "";
  }
}

export default validate;
