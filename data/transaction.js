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
async function createTransaction(transactionData, session) {
    console.log("inside createTransaction/ ", transactionData);
    const showTimeCollection = await allShowtimes();
    const transactionCollection = await allTransactions();

    const Data = transactionData.moviedtl.split('||');
    const SeatsSplit = transactionData.Seats.split('=');
    console.log(Data);


  let newTransactionRecord = {
    User_Name: session.User_Name,
    Movie_Theatre_Name: Data[0],
    Movie_Name: Data[1],
    Showtime_Detail: Data[2]+'/'+ Data[3],
    Seats: SeatsSplit[0],
    Cost: SeatsSplit[1],
    Credit_Card: transactionData.Credit_Card,
    Credit_Card_Expiry_Month: transactionData.Credit_Card_Expiry_Month,
    Credit_Card_Security_Code: transactionData.CVV,
  };

  const newTransaction = await transactionCollection.insertOne(newTransactionRecord);

  if (newTransaction.insertedCount === 0)
    throw "Transaction failed!";

  console.log(newTransaction);
  newTransactionID = await transactionCollection.findOne(newTransaction.insertedId);
console.log("Done");
  return newTransactionID;
}


module.exports = {
  getTransaction,
  getAllTransactionforUser,
  createTransaction,
};
