const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Rating",
  tableName: "ratings",
  columns: {
    id: { primary: true, type: "int", generated: true },
    value: { type: "int" } // 1-5
  },
  relations: {
    user: { type: "many-to-one", target: "User", joinColumn: true },
    store: { type: "many-to-one", target: "Store", joinColumn: true }
  },
  uniques: [
    { columns: ["user", "store"] }
  ]
});