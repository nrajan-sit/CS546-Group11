const dbConnection = require("../config/mongoConnection");
// const users = require("../data/users");
// const movies = require("../data/movies");
// const movietheatres = require("../data/");
// const showtimes = require("../data/showtimes");
const data = require("../data/");
const userData = data.users;
const movieData = data.movies;
const movietheatreData = data.movietheatres;
const showtimeData = data.showtimes;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                                      Movie List
  /////////////////////////////////////////////////////////////////////////////////////////////
  const johnWick3 = await movieData.createMovie(
    "John Wick : Chapter 3 - Parabellum",
    "../../public/images/JohnWick3.jpg",
    "2020-10-20",
    ["Action", "Crime"],
    "Chad Stahelski",
    ["Keanu Reeves", "Halle Berry", "Ian McShane"],
    "R",
    "130m",
    "In this third installment of the adrenaline-fueled action franchise, skilled assassin John Wick (Keanu Reeves) returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin's guild, the High Table, John Wick is excommunicado, but the world's most ruthless hit men and women await his every turn.",
    10,
    10,
    []
  );

  const F9 = await movieData.createMovie(
    "F9",
    "../../public/images/F9.jpg",
    "2021-05-28",
    ["Action", "Adventure", "Crime"],
    "Justin Lin",
    ["Charlize Theron", "Tyrese Gibson", "Vin Diesel"],
    "PG-13",
    "145m",
    "Cypher enlists the help of Jakob, Dom's younger brother to take revenge on Dom and his team.",
    10,
    9,
    []
  );

  const Tenet = await movieData.createMovie(
    "Tenet",
    "../../public/images/Tenet.jpg",
    "2020-09-03",
    ["Action", "Sci-Fi"],
    "Christopher Nolan",
    ["John David Washington", "Robert Pattinson", "Elizabeth Debicki"],
    "PG-13",
    "150m",
    "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    7.7,
    7,
    []
  );

  const WonderWoman1984 = await movieData.createMovie(
    "Wonder Woman 1984",
    "../../public/images/WonderWoman1984.jpg",
    "2020-12-25",
    ["Action", "Adventure", "Fantasy"],
    "Patty Jenkins",
    ["Pedro Pascal", "Gal Gadot", "Connie Nielsen"],
    "PG-13",
    "151m",
    "Fast forward to the 1980s as Wonder Woman's next big screen adventure finds her facing two all-new foes: Max Lord and The Cheetah.",
    0,
    0,
    []
  );

  const Mulan = await movieData.createMovie(
    "Mulan",
    "../../public/images/Mulan.jpg",
    "2020-09-04",
    ["Action", "Adventure", "Drama"],
    "Niki Caro",
    ["Yifei Liu", "Donnie Yen", "Li Gong"],
    "PG-13",
    "115m",
    "A young Chinese maiden disguises herself as a male warrior in order to save her father.",
    5.5,
    0,
    []
  );

  const SoundofMetal = await movieData.createMovie(
    "Sound of Metal",
    "../../public/images/SoundofMetal.jpg",
    "2020-12-04",
    ["Drama", "Music"],
    "Darius Marder",
    ["Riz Ahmed", "Olivia Cooke", "Paul Raci"],
    "R",
    "120m",
    "A heavy-metal drummer's life is thrown into freefall when he begins to lose his hearing.",
    7.8,
    0,
    []
  );

  const BadBoysforLife = await movieData.createMovie(
    "Bad Boys for Life",
    "../../public/images/BadBoysforLife.jpg",
    "2020-01-17",
    ["Action", "Comedy", "Crime"],
    "Adil El Arbi",
    ["Will Smith", "Martin Lawrence", "Vanessa Hudgens"],
    "R",
    "124m",
    "Miami detectives Mike Lowrey and Marcus Burnett must face off against a mother-and-son pair of drug lords who wreak vengeful havoc on their city.",
    6.6,
    0,
    []
  );

  const OldGuard = await movieData.createMovie(
    "The Old Guard",
    "../../public/images/TheOldGuard.jpg",
    "2020-07-10",
    ["Action", "Adventure", "Fantasy"],
    "Gina Prince-Bythewood",
    ["Charlize Theron", "KiKi Layne", "Matthias Schoenaerts"],
    "R",
    "125m",
    "A covert team of immortal mercenaries is suddenly exposed and must now fight to keep their identity a secret just as an unexpected new member is discovered.",
    6.6,
    0,
    []
  );

  const BillandTed = await movieData.createMovie(
    "Bill & Ted Face the Music",
    "../../public/images/BillnTedFacetheMusic.jpg",
    "2020-08-28",
    ["Adventure", "Comedy", "Music"],
    "Dean Parisot",
    ["Keanu Reeves", "Alex Winter", "Kristen Schaal"],
    "PG-13",
    "91m",
    "Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.",
    6.1,
    0,
    []
  );

  const Onward = await movieData.createMovie(
    "Onward",
    "../../public/images/Onward.jpg",
    "2020-03-06",
    ["Animation", "Adventure", "Comedy"],
    "Dan Scanlon",
    ["Tom Holland", "Chris Pratt", "Julia Louis-Dreyfus"],
    "PG",
    "102m",
    "Two elven brothers embark on a quest to bring their father back for one day.",
    7.4,
    0,
    []
  );

  const Dune = await movieData.createMovie(
    "Onward",
    "../../public/images/dune.jpg",
    "2021-10-01",
    ["Adventure", "Drama", "Sci - Fi"],
    "Denis Villeneuve",
    ["Zendaya", "Timothée Chalamet", "Rebecca Ferguson"],
    "PG-13",
    "N/A",
    "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    0,
    0,
    []
  );

  const NoTimeToDie = await movieData.createMovie(
    "No Time to Die",
    "../../public/images/NoTimeToDie.jpg",
    "2021-05-02",
    ["Action", "Adventure", "Thriller"],
    "Cary Joji Fukunaga",
    ["Ana de Armas", "Daniel Craig", "Léa Seydoux"],
    "PG-13",
    "163m",
    "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
    0,
    0,
    []
  );

  const Elf = await movieData.createMovie(
    "Elf",
    "../../public/images/elf.jpg",
    "2003-11-07",
    ["Adventure", "Comedy", "Family"],
    "Jon Favreau",
    ["Will Ferrell", "James Caan", "Bob Newhart" ],
    "PG",
    "97m",
    "After discovering he is a human, a man raised as an elf at the North Pole decides to travel to New York City to locate his real father.",
    7,
    0,
    []
  );

  const Grinch = await movieData.createMovie(
    "How the Grinch Stole Christmas",
    "../../public/images/Grinch.jpg",
    "2000-11-17",
    ["Comedy", "Family", "Fantasy"],
    "Ron Howard",
    ["Jim Carrey", "Taylor Momsen", "Kelley"],
    "PG",
    "104m",
    "On the outskirts of Whoville lives a green, revenge-seeking Grinch who plans to ruin Christmas for all of the citizens of the town.",
    6.2,
    0,
    []
  );  

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                                Movie Theatre List
  /////////////////////////////////////////////////////////////////////////////////////////////

  const movieTheatre1 = await movietheatreData.createMovieTheatres(
    "AMC Empire 25",
    [],
    "234 W 42nd St",
    "",
    "New York",
    "NY",
    "10036",
    []
  );

  const movieTheatre2 = await movietheatreData.createMovieTheatres(
    "AMC Newport Centre 11",
    [],
    "30-300 Mall Drive West",
    "",
    "Jersey City",
    "NJ",
    "07303",
    []
  );

  const movieTheatre3 = await movietheatreData.createMovieTheatres(
    "Cinépolis Luxury Cinemas",
    [],
    "260 W 23rd St",
    "",
    "New York",
    "NY",
    "10011",
    []
  );

  const movieTheatre4 = await movietheatreData.createMovieTheatres(
    "Kerasotes ShowPlace 14",
    [],
    "650 Plz Dr",
    "",
    "Secaucus",
    "NJ",
    "07094",
    []
  );

  const movieTheatre5 = await movietheatreData.createMovieTheatres(
    "Regal Battery Park",
    [],
    "102 North End Ave",
    "",
    "New York",
    "NY",
    "10282",
    [""]
  );

  /////////////////////////////////////////////////////////////////////////////////////////////
  //                                    ShowTime List
  /////////////////////////////////////////////////////////////////////////////////////////////

  // Get date and time 
  let newDate = new Date();
  let date1 = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  let date2 = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + (newDate.getDate() + 1);
  let date3 = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + (newDate.getDate() + 2);

  // var time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();


  // -----------------------------
  // -- AMC Empire 25 (theatre1)
  // -----------------------------
  // -- Day 1 : John Wick 3 
  const theatre1d1johnwick1 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date1,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1johnwick2 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date1,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1johnwick3 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date1,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1johnwick4 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date1,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1johnwick5 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date1,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day2 : John Wick 3 
  const theatre1d2johnwick1 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date2,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2johnwick2 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date2,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2johnwick3 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date2,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2johnwick4 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date2,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2johnwick5 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date2,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day3 : John Wick 3
  const theatre1d3johnwick1 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date3,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3johnwick2 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date3,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3johnwick3 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date3,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3johnwick4 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date3,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3johnwick5 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    johnWick3._id,
    date3,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );


  // -- Day 1 : Tenet
  const theatre1d1Tenet1 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date1,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1Tenet2 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date1,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1Tenet3 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date1,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1Tenet4 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date1,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d1Tenet5 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date1,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day2 : Tenet
  const theatre1d2Tenet1 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date2,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2Tenet2 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date2,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2Tenet3 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date2,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2Tenet4 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date2,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d2Tenet5 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date2,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day3 : Tenet
  const theatre1d3Tenet1 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date3,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3Tenet2 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date3,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3Tenet3 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date3,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3Tenet4 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date3,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre1d3Tenet5 = await showtimeData.createShowtimes(
    movieTheatre1._id,
    Tenet._id,
    date3,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -------------------------------------
  // -- AMC Newport Centre 11 (theatre2)
  // -------------------------------------
  // -- Day 1 : John Wick 3 
  const theatre2d1johnwick1 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date1,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1johnwick2 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date1,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1johnwick3 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date1,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1johnwick4 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date1,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1johnwick5 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date1,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day2 : John Wick 3 
  const theatre2d2johnwick1 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date2,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d2johnwick2 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date2,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d2johnwick3 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date2,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d2johnwick4 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date2,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d2johnwick5 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    johnWick3._id,
    date2,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day3 : Tenet
  const theatre2d3Tenet1 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    Tenet._id,
    date3,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d3Tenet2 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    Tenet._id,
    date3,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d3Tenet3 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    Tenet._id,
    date3,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d3Tenet4 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    Tenet._id,
    date3,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d3Tenet5 = await showtimeData.createShowtimes(
    movieTheatre2._id,
    Tenet._id,
    date3,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );



   // -------------------------------------
  // -- Cinépolis Luxury Cinemas (theatre3)
  // -------------------------------------
  // -- Day 1 : Mulan
  const theatre3d1Mulan1 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Mulan._id,
    date1,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Mulan2 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Mulan._id,
    date1,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Mulan3 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Mulan._id,
    date1,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Mulan4 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Mulan._id,
    date1,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Mulan5 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Mulan._id,
    date1,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  // -- Day 1 : Onward
  const theatre3d1Onward1 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Onward._id,
    date1,
    "12pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Onward2 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Onward._id,
    date1,
    "2:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Onward3 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Onward._id,
    date1,
    "5pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Onward4 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Onward._id,
    date1,
    "7:30pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  const theatre2d1Onward5 = await showtimeData.createShowtimes(
    movieTheatre3._id,
    Onward._id,
    date1,
    "10pm",
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"] ,
    ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
  );

  console.log("Done seeding database");
  await db.serverConfig.close();
};

main().catch(console.log);
