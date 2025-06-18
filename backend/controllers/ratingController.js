const { getRepository } = require("typeorm");

exports.submit = async (req, res) => {
  const repo = getRepository("Rating");
  const storeRepo = getRepository("Store");
  const { storeId, value } = req.body;
  if (!storeId || !value || value < 1 || value > 5) return res.status(400).json({ error: "Invalid data" });
  const store = await storeRepo.findOne({where: { id: storeId } });
  if (!store) return res.status(404).json({ error: "Store not found" });

  let rating = await repo.findOne({ where: { user: req.user.id, store: storeId } });
  if (rating) {
    rating.value = value;
    await repo.save(rating);
    return res.json({ message: "Rating updated" });
  }
//   console;log("Creating new rating");
  rating = repo.create({ user: req.user.id, store: storeId, value });
  await repo.save(rating);
  res.json({ message: "Rating submitted" });
};

exports.list = async (req, res) => {
  const repo = getRepository("Rating");
  const ratings = await repo.find({ relations: ["user", "store"] });
  res.json(ratings);
};