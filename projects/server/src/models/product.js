"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasOne(models.Product_Details, {
      //     foreignKey: {
      //         name: "product_id",
      //     },
      // });
      // Product.hasMany(models.Category, {
      //     foreignKey: {
      //         name: "category_id",
      //     }
      // });
      // Product.hasMany(models.Discount, {
      //     foreignKey: {
      //         name: "product_id",
      //     }
      // });
      // Product.hasMany(models.Transaction_Detail, {
      //     foreignKey: {
      //         name: "product_id",
      //     }
      // });
      // Product.hasMany(models.Stock, {
      //     foreignKey: {
      //         name: "product_id"
      //     }
      // });
    }
  }
  product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "product_name",
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "image",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      indication: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dose: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rules: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
