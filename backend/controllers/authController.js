const { getRepository } = require("typeorm");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../utils/validation");

exports.register = async (req, res) => {
  const repo = getRepository("User");
  console.log("Registering user with body:", req.body);
  const { name, email, address, password,role } = req.body;
  const error = validateUser({ name, email, address, password });
  if (error) return res.status(400).json({ error });

  const exists = await repo.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = repo.create({ name, email, address, password: hash, role: role });
  await repo.save(user);
  res.json({ message: "Registered successfully" });
};

exports.login = async (req, res) => {
  const repo = getRepository("User");
  const { email, password } = req.body;
  const user = await repo.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: "1d" }
  );
  res.json({ token, role: user.role });
};