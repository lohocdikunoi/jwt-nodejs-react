"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "john.doe@example1.com",
          password: "hashed_password",
          username: "johndoe1",
        },
        {
          email: "john.doe@example2.com",
          password: "hashed_password",
          username: "johndoe2",
        },
        {
          email: "john.doe@example3.com",
          password: "hashed_password",
          username: "johndoe3",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
  },
};
