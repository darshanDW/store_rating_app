const { getRepository } = require("typeorm");
const bcrypt = require("bcryptjs");
const { validateUser } = require("../utils/validation");

exports.list = async (req, res) => {
  const repo = getRepository("User");
  const { name, email, address, role, sort = "name", order = "ASC" } = req.query;
  let qb = repo.createQueryBuilder("user");
  if (name) qb = qb.andWhere("user.name ILIKE :name", { name: `%${name}%` });
  if (email) qb = qb.andWhere("user.email ILIKE :email", { email: `%${email}%` });
  if (address) qb = qb.andWhere("user.address ILIKE :address", { address: `%${address}%` });
  if (role) qb = qb.andWhere("user.role = :role", { role });
  qb = qb.orderBy(`user.${sort}`, order.toUpperCase() === "DESC" ? "DESC" : "ASC");
  const users = await qb.getMany();
  res.json(users);
};

exports.create = async (req, res) => {
  const repo = getRepository("User");
  const { name, email, address, password, role } = req.body;
  const error = validateUser({ name, email, address, password });
  if (error) return res.status(400).json({ error });
  if (!["admin", "user", "owner"].includes(role)) return res.status(400).json({ error: "Invalid role" });

  const exists = await repo.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = repo.create({ name, email, address, password: hash, role });
  await repo.save(user);
  res.json({ message: "User created" });
};

exports.updatePassword = async (req, res) => {
  const repo = getRepository("User");
  const { password } = req.body;
  const error = validateUser({ name: "A".repeat(20), email: "a@a.com", address: "A", password });
  if (error) return res.status(400).json({ error });
  const user = await repo.findOne({ where: { id: req.user.id } });
  if (!user) return res.sendStatus(404);
  user.password = await bcrypt.hash(password, 10);
  await repo.save(user);
  res.json({ message: "Password updated" });
};

exports.me = async (req, res) => {
  const repo = getRepository("User");
  const user = await repo.findOne({ where: { id: req.user.id } });
  if (!user) return res.sendStatus(404);
  res.json(user);
};