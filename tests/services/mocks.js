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
    id: "401465483996",
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

module.exports = {
	categoriesMock,
	userMock,
	createUserMock,
}