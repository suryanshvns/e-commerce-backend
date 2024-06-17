module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      establishment_type: {
        type: DataTypes.ENUM,
        values: [
          'Clinic',
          'Clinic with Pharmacy',
          'Doctor',
          'Distributor',
          'Pharmacy',
          'Hospital',
          'Nursing Home',
          'Medical Student',
          'Other'
        ],
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    },
  );
  return users;
};
