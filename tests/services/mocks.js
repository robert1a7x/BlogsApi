const categoriesMock = [
  {
    id: 1,
    name: "Escola"
  },
  {
    id: 2,
    name: "Inovação"
  }
];

const userMock = [
  {
    id: 1,
    displayName: "Brett Wiltshire",
    email: "brett@email.com",
    image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
];

const createUserMock = {
  displayName: "Brett Wiltshire",
  email: "brett@email.com",
  password: "123456",
  image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const postMock = [
  {
    id: 1,
    title: "Post do Ano",
    content: "Melhor post do ano",
    userId: 1,
    published: "2011-08-01T19:58:00.000Z",
    updated: "2011-08-01T19:58:51.000Z",
    user: {
      id: 1,
      displayName: "Lewis Hamilton",
      email: "lewishamilton@gmail.com",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    categories: [
      {
        id: 1,
        name: "Inovação"
      }
    ]
  }
];

const createPostMock = {
  title: "Latest updates, August 1st",
  content: "The whole text for the blog post goes here in this key",
  categoryIds: [1, 2]
}

const createdPostMock = {
	id: 1,
	userId: 1,
  title: "Latest updates, August 1st",
  content: "The whole text for the blog post goes here in this key",
}

const updatedPostMock = {
  title: "Post do Ano",
  content: "Ainda Melhor post do ano",
  userId: 1,
  categories: [
    {
      id: 1,
      name: "Inovação"
    }
  ]
}

module.exports = {
	categoriesMock,
	userMock,
	createUserMock,
	postMock,
	createPostMock,
	createdPostMock,
  updatedPostMock,
}