const connection = require("../config/mongoCollections");
const allUsers = connection.users;
const allTransaction = connection.transactions;
const bcrypt = require("bcryptjs");
const saltRounds = 16;

async function getUser(User_Name) {

    if (!User_Name || (typeof User_Name == "string" && User_Name.trim().length == 0))
        throw "Please enter a valid UserName";
    console.log(User_Name);
    const userCollection = await allUsers();

    //We need to require ObjectId from mongo
    //let { ObjectId } = require("mongodb");
    //console.log(typeof ObjectId);

    //let newUserId = ObjectId(User_Name);

    const userID = await userCollection.findOne({ User_Name: User_Name });

    if (!userID)
        throw "UserName not found";

    return userID;
};

async function createUser(First_Name, Last_Name, User_Name, Email, Password) {

  // Check user input
  if (!First_Name || (typeof First_Name == "string" && First_Name.trim().length == 0))
    throw "Please enter a valid First Name";
  if (!Last_Name || (typeof Last_Name == "string" && Last_Name.trim().length == 0))
    throw "Please enter a valid Last Name";
  if (!User_Name || (typeof User_Name == "string" && User_Name.trim().length == 0))
    throw "Please enter a valid UserName";
  if (!Password || (typeof Password == "string" && Password.trim().length == 0))
    throw "Please enter a valid Password";
  if (!Email || (typeof Email == "string" && Email.trim().length == 0))
    throw "Please enter a valid Email";

  const userCollection = await allUsers();

  // Check if the username is already taken
  let existsUser_Name = await userCollection.findOne({ User_Name: User_Name});
  let existsEmail = await userCollection.findOne({ Email: Email});

  // hashing password before storing in DB
  //const password = bcrypt.hashSync(Password, 2);
  const hashedPassword = await bcrypt.hash(Password, saltRounds);

  if (existsUser_Name !== null)
    throw "The selected User_Name already exists in the system.";

  if (existsEmail !== null)
      throw "The selected Email already exists in the system.";

  let newUser = {
    First_Name: First_Name,
    Last_Name: Last_Name,
    User_Name: User_Name,
    Password_Hashed: hashedPassword, // add salt things here
    Email: Email,
    Gender: "",
    DOB: "",
    Profile_Picture: "",
    Home_Address_1: "",
    Home_Address_2: "",
    Home_City: "",
    Home_State: "",
    Home_Zip: "",
    Phone_Number: "",
    Credit_Card_Number_Hashed: "",
    Expiry_Month: "",
    Expiry_Year: "",
    Security_Code: "",
    Billing_Address_1: "",
    Billing_Address_2: "",
    Billing_City: "",
    Billing_State: "",
    Billing_Zip: "",
    Transactions: [],
    Movie_Reviews: [],
    Movie_Theatre_Reviews: [],
  };

  const newUserRecord = await userCollection.insertOne(newUser);

  if (newUserRecord.insertedCount === 0)
    throw "User Creation failed!";

  console.log(newUserRecord);
  return await userCollection.findOne(newUserRecord.insertedId)
  //this.getUserById(newUserRecord.insertedId);
}

async function updateUser(Email, data) {

  // Check user input
  if (!data.First_Name || (typeof data.First_Name == "string" && data.First_Name.trim().length == 0))
    throw "Please enter a valid First Name";
  if (!data.Last_Name || (typeof data.Last_Name == "string" && data.Last_Name.trim().length == 0))
    throw "Please enter a valid Last Name";

  // Check Phone Number Format
  let regex_phone = /\d\d\d-\d\d\d-\d\d\d\d/;

  if (typeof data.Phone_Number == "string" && regex_phone.test(data.Phone_Number) != true)
    throw `The value passed in "${data.Phone_Number}" is not in the right Phone_Number format (###-###-####)`;

  // Credit Card Format
  let regex_CreditCard = /\d\d\d\d-\d\d\d\d-\d\d\d\d-\d\d\d\d/;

  if (typeof data.Credit_Card_Number_Hashed == "string" && regex_CreditCard.test(data.Credit_Card_Number_Hashed) != true)
    throw `The value passed in "${data.Credit_Card_Number_Hashed}" is not in the right creditcard format (####-####-####-####)`;

  // Zip Code (5 digits)

  // Expiry Month (1-12)

  // Expiry Year > getdate

  const userCollection = await allUsers();

  // Check if the username is already taken
  let existsEmail = await userCollection.findOne({ Email: Email});

  if (!existsEmail)
      throw "The selected Email doesn't Exist.";

  let hashedCreditCard = await bcrypt.hash(data.Credit_Card_Number_Hashed, 8);

  let newUser = {
    First_Name: data.First_Name,
    Last_Name: data.Last_Name,
    Gender: data.Gender,
    DOB: data.DOB,
    Profile_Picture: data.Profile_Picture,
    Home_Address_1: data.Home_Address_1,
    Home_Address_2: data.Home_Address_2,
    Home_City:data.Home_City,
    Home_State: data.Home_State,
    Home_Zip: data.Home_Zip,
    Phone_Number: data.Phone_Number,
    Credit_Card_Number_Hashed: hashedCreditCard,
    Expiry_Month: data.Expiry_Month,
    Expiry_Year: data.Expiry_Year,
    Security_Code:  data.Security_Code };



  //const newUserRecord = await userCollection.updateOne({Email: Email},{$set:{...newUser}});
  const newUserRecord  = await userCollection.findOneAndUpdate({Email: Email}, { $set: newUser }, { new: true });

  console.log(newUserRecord);
  if (newUserRecord.updateCount === 0)
    throw "User Updation failed!";

  console.log(newUserRecord);
  return await userCollection.findOne({Email: Email})
  //this.getUserById(newUserRecord.insertedId);
}


async function getTransaction(User_Name) {

    const transCollection = await allTransaction();
    const transData = await transCollection.find({ User_Name: User_Name }).toArray();

    if (!transData)
        throw "no transactions found";

    return transData;
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getTransaction
};