function validateLogin({ username, email, password }) {
  const errors = [];

  if (!username && !email) {
    errors.push("Username or email is required.");
  }

  if (email && !/.+@.+\..+/.test(email)) {
    errors.push("Email format is invalid.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  return errors;
}

function validateRegister({
  username,
  email,
  password,
  confirmPassword,
  existingUsers,
}) {
  const errors = [];
  if (!username.trim()) errors.push("Username is required.");
  if (username.length < 3)
    errors.push("Username must be at least 3 characters.");
  if (existingUsers?.some((u) => u.username === username)) {
    errors.push("Username already exists.");
  }

  if (!email.trim()) errors.push("Email is required.");
  else if (!/.+@.+\..+/.test(email)) errors.push("Email format is invalid.");
  else if (existingUsers?.some((u) => u.email === email)) {
    errors.push("Email already exists.");
  }

  if (!password) errors.push("Password is required.");
  else if (password.length < 6)
    errors.push("Password must be at least 6 characters.");

  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  return errors;
}

export { validateLogin, validateRegister };
