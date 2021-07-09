const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.middlename = !isEmpty(data.middlename) ? data.middlename : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.dob = !isEmpty(data.dob) ? data.dob : "";
  data.education = !isEmpty(data.education) ? data.education : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  // data.attachment = !isEmpty(data.attachment) ? data.attachment : "";

// Name checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "Name field is required";
  }
  if (Validator.isEmpty(data.middlename)) {
    errors.middlename = "Name field is required";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Name field is required";
  }
// Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
// mobile checks
if (Validator.isEmpty(data.mobile)) {
  errors.mobile = "Mobile Number is required";
}else if(!Validator.isMobilePhone(data.mobile)){
   errors.mobile="Enter a valid Phone Number";
}
if(Validator.isEmpty(data.otp)){
  errors.otp = "OTP is required";
}else if(!validator.isNumeric(data.otp)){
  errors.otp="enter valid OTP"
}
//dob checks
if (Validator.isEmpty(data.dob)) {
  errors.dob = "Date of Birth is required";
}
//education checks
if(Validator.isEmpty(data.education)){
  errors.education="Education feild is required";
}
// addresss checks
if(Validator.isEmpty(data.address)){
  errors.address="Address feild is required";
}
if(Validator.isEmpty(data.pincode)){
  errors.pincode="Pincode feild is required";
}else if(!Validator.isPostalCode(data.pincode, "any")){
  errors.pincode="Enter a valid Pincode";
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};