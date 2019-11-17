
exports.up = function(knex) {
    return knex.schema.createTable('users', t =>{
        t.increments();
        t.string('username', 255)
        .unique()
        .notNullable();

        t.string('password', 255)
        .notNullable();
    })
    .createTable('photos', t =>{
      t.increments()

      t.string('title', 255)
      .notNullable();
      t.string('url', 255)
      .notNullable();

      // Foreign User ID
      t.integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    })
    .createTable('analysis', t =>{
      t.increments();

      t.string('classification_1', 255)
      .notNullable();
      t.string('confidence_1', 255)
      .notNullable();

      t.string('classification_2', 255)
      .notNullable();
      t.string('confidence_2', 255)
      .notNullable();

      t.string('classification_3', 255)
      .notNullable();
      t.string('confidence_3', 255)
      .notNullable();

      t.string('closest_classification', 255);

      // Foreign Photo ID
      t.integer('photo_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('photos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('analysis')
  .dropTable('photos')
  .dropTable('users');
};
