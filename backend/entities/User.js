const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar", length: 60 },
    email: { type: "varchar", unique: true },
    password: { type: "varchar" },
    address: { type: "varchar", length: 400 },
    role: { type: "varchar", default: "user" } // admin, user, owner
  },
  relations: {
    ratings: { type: "one-to-many", target: "Rating", inverseSide: "user" },
    stores: { type: "one-to-many", target: "Store", inverseSide: "owner" }
  }
});