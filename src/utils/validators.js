export const validateEmail = (email) => {
  const expression = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i;
  return expression.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  return expression.test(String(password));
};
