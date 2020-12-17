const mongoCollections = require("../config/mongoCollections");
const allUsers = mongoCollections.users;
const allShowtimes = mongoCollections.showtime;
const allTransactions = mongoCollections.transactions;

const bcrypt = require("bcryptjs");
const saltRounds = 16;


// get 1 transaction
async function getTransaction(transactionID) {
    console.log("inside getTransaction transactionID/ ", transactionID);
    const transactionCollection = await allTransactions();

  if (
    !transactionID ||
    (typeof transactionID == "string" && transactionID.trim().length == 0)
  )
    throw "Please enter a valid transactionID";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  let newtransactionID = ObjectId(transactionID);

  const storedTransactionID = await transactionCollection.findOne({_id: newtransactionID});

  return storedTransactionID;
}

// get all transactions for user
async function getAllTransactionforUser(userID) {
    console.log("inside getTransaction userID/ ", userID);
    const transactionCollection = await allTransactions();

  if (!userID || (typeof userID == "string" && userID.trim().length == 0))
    throw "Please enter a valid userID";

  //We need to require ObjectId from mongo
  let { ObjectId } = require("mongodb");

  let newUserID = ObjectId(userID);

  const userTransactionCollection = await transactionCollection.findOne({User_id: newUserID});

  return userTransactionCollection;
}

// Insert transaction
async function createTransaction(transactionData) {
    console.log("inside createTransaction/ ", transactionData);
    const showTimeCollection = await allShowtimes();
    const transactionCollection = await allTransactions();

  if (
    !User_Name ||
    (typeof User_Name == "string" && User_Name.trim().length == 0)
  )
    throw "Please enter a valid UserName";

  let newTransactionRecord = {
    User_id: User_id,
    Movie_Theatre_id: Movie_Theatre_id,
    Movie_id: Movie_id,
    Showtime_id: Showtime_id,
    Seating_id: Seating_id,
    Seats: Seats,
    Cost: Cost,
    Credit_Card: Credit_Card,
    Credit_Card_Expiry_Month: Credit_Card_Expiry_Month,
    Credit_Card_Expiry_Year: Credit_Card_Expiry_Year,
    Credit_Card_Security_Code: Credit_Card_Security_Code,
  };

  const newTransaction = await transactionCollection.insertOne(newTransactionRecord);

  if (newTransaction.insertedCount === 0)
    throw "Transaction failed!";

  console.log(newTransaction);
  newTransactionID = await transactionCollection.findOne(newTransaction.insertedId);

  return newTransactionID;
}


module.exports = {
  getTransaction,
  getAllTransactionforUser,
  createTransaction,
};