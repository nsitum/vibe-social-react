function validateLogin({ username, password }) {
  const errors = [];

  if (!username) {
    errors.push({
      field: "username",
      message: "Username is required.",
    });
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required." });
  }

  if (password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
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
  if (!username.trim())
    errors.push({ field: "username", message: "Username is required." });
  if (username.length < 3)
    errors.push({
      field: "username",
      message: "Username must be at least 3 characters.",
    });
  if (existingUsers?.some((u) => u.username === username)) {
    errors.push({ field: "username", message: "Username already exists." });
  }

  if (!email.trim())
    errors.push({ field: "email", message: "Email is required." });
  else if (!/.+@.+\..+/.test(email))
    errors.push({ field: "email", message: "Email format is invalid." });
  else if (existingUsers?.some((u) => u.email === email)) {
    errors.push({ field: "email", message: "Email already exists." });
  }

  if (!password)
    errors.push({ field: "password", message: "Password is required." });
  else if (password.length < 6)
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters.",
    });

  if (password !== confirmPassword) {
    errors.push({ field: "password", message: "Passwords do not match." });
  }

  return errors;
}

function validateModifyUser({ username, email, oldPassword, newPassword }) {
  const errors = [];

  if (!username.trim()) {
    errors.push({ field: "username", message: "Username is required." });
  } else if (username.length < 3) {
    errors.push({
      field: "username",
      message: "Username must be at least 3 characters.",
    });
  }

  if (!email.trim()) {
    errors.push({ field: "email", message: "Email is required." });
  } else if (!/.+@.+\..+/.test(email)) {
    errors.push({ field: "email", message: "Email format is invalid." });
  }

  if (!oldPassword) {
    errors.push({
      field: "oldPassword",
      message: "Current password is required.",
    });
  }

  if (newPassword !== undefined && newPassword.trim().length > 0) {
    if (newPassword.length < 6) {
      errors.push({
        field: "newPassword",
        message: "New password must be at least 6 characters.",
      });
    }
  }

  return errors;
}

export { validateLogin, validateRegister, validateModifyUser };
