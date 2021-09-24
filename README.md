# credenceTest
Node app with CRUD API

Steps to run the app

1) Create a database with name nodeTest
2) Go to this source code directory
3) run npm install so that all the required modules will get downloaded
4) Run application by command node server.js
5) Test the APIS

1) POST 
URL => localhost:8080/movieData
Parameters => {
    "name":"Avengers: Endgame",
    "img":"https://bit.ly/2Pzczlb",
    "description":"Adrift in space with no food or water, Tony Stark sends a message to Pepper Potts as his oxygen supply starts to dwindle. Meanwhile, the remaining Avengers -- Thor, Black Widow, Captain America, and Bruce Banner -- must figure out a way to bring back their vanquished allies for an epic showdown with Thanos -- the evil demigod who decimated the planet and the universe"
}

2) GET

a) URL => localhost:8080/movieData
b) URL => localhost:8080/movieData/id

3) PUT
URL => localhost:8080/movieData
Parameter => {"id":"2","name":"The Lord of the Ringssss: The Fellowship of the Ring","img":"https://bit.ly/2tC1Lcg","description":"A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed"}

4) DELETE
URL => localhost:8080/movieData?id=2




