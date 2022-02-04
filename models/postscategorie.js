module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie', {}, { timestamps: false });

  PostsCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });

    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostsCategorie,
      foreignKey: 'id',
      otherKey: 'id',
    });
  };

  return PostsCategorie;
};