const { getRepository } = require("typeorm");

exports.list = async (req, res) => {
  const repo = getRepository("Store");
  const { name, address, sort = "name", order = "ASC" } = req.query;
  let qb = repo.createQueryBuilder("store")
    .leftJoinAndSelect("store.owner", "owner")
    .leftJoinAndSelect("store.ratings", "ratings");
  if (name) qb = qb.andWhere("store.name ILIKE :name", { name: `%${name}%` });
  if (address) qb = qb.andWhere("store.address ILIKE :address", { address: `%${address}%` });
  qb = qb.orderBy(`store.${sort}`, order.toUpperCase() === "DESC" ? "DESC" : "ASC");
  const stores = await qb.getMany();
  // Calculate average rating
  const result = stores.map(store => {
    const avgRating = store.ratings.length
      ? (store.ratings.reduce((a, r) => a + r.value, 0) / store.ratings.length).toFixed(2)
      : null;
    return {
      ...store,
      averageRating: avgRating
    };
  });
  res.json(result);
};

exports.create = async (req, res) => {
  const repo = getRepository("Store");
  const userRepo = getRepository("User");
  const { name, email, address, ownerId } = req.body;
  if (!name || name.length < 1 || name.length > 60) return res.status(400).json({ error: "Name 1-60 chars" });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: "Invalid email" });
  if (!address || address.length > 400) return res.status(400).json({ error: "Address max 400 chars" });
  const owner = await userRepo.findOne({ where: { id: ownerId } });
  if (!owner || owner.role !== "owner") return res.status(400).json({ error: "Invalid owner" });
  const exists = await repo.findOne({ where: { email } });
  if (exists) return res.status(400).json({ error: "Email already exists" });
  const store = repo.create({ name, email, address, owner });
  await repo.save(store);
  res.json({ message: "Store created" });
};

exports.ownerDashboard = async (req, res) => {
  const repo = getRepository("Store");
  const ratingRepo = getRepository("Rating");
  const store = await repo.findOne({ where: { owner: req.user.id }, relations: ["ratings"] });
  if (!store) return res.status(404).json({ error: "No store found" });
  const ratings = await ratingRepo.find({ where: { store: store.id }, relations: ["user"] });
  const avg = ratings.length ? (ratings.reduce((a, r) => a + r.value, 0) / ratings.length).toFixed(2) : null;
  res.json({ store, ratings, averageRating: avg });
};