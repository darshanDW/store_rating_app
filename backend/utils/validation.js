function validateUser({ name, email, address, password }) {
  if (!name || name.length < 20 || name.length > 60) return "Name must be 20-60 chars";
  if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email";
  if (!address || address.length > 400) return "Address max 400 chars";
  if (
    !password ||
    password.length < 8 ||
    password.length > 16 ||
    !/[A-Z]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) return "Password: 8-16 chars, 1 uppercase, 1 special char";
  return "";
}

module.exports = { validateUser };