const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Store",
  tableName: "stores",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar", length: 60 },
    email: { type: "varchar", unique: true },
    address: { type: "varchar", length: 400 }
  },
  relations: {
    owner: { type: "many-to-one", target: "User", joinColumn: true },
    ratings: { type: "one-to-many", target: "Rating", inverseSide: "store" }
  }
});