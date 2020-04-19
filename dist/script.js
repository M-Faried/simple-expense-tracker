const balance = document.getElementById('balance');
const moneyIncome = document.getElementById('money-income');
const moneyExpenses = document.getElementById('money-expenses');

const transactionsList = document.getElementById('transactions-list');
const transactionForm = document.getElementById('transaction-form');
const transactionLabel = document.getElementById('transaction-label');
const transactionAmount = document.getElementById('transaction-ammount');

let transactions = [];
const sampleTransactions = [
  { id: 1, label: 'Flower', amount: -20 },
  { id: 2, label: 'Salary', amount: 300 },
  { id: 3, label: 'Book', amount: -10 },
  { id: 4, label: 'Camera', amount: 150 },
];

//////////////////////////////////////////////////////////////////////// On Load Functions
loadSavedTransactions();
updateTransactionsBalance();
updateTransationsList();

transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let label = transactionLabel.value;
  let amount = transactionAmount.value;
  if (label !== '' && amount !== '') addTransation(label, +amount);
  else alert('Please enter a label and amount for the transaction.');
});

//////////////////////////////////////////////////////////////////////// Helper Functions
function addTransation(label, amount) {
  transactions.push({
    id: generateRandomID(),
    label: label,
    amount: amount,
  });

  saveCurrentTransactions();
  updateTransactionsBalance();
  updateTransationsList();
}
function deleteTransaction(transactionID) {
  transactions = transactions.filter((tr) => tr.id !== transactionID);

  saveCurrentTransactions();
  updateTransactionsBalance();
  updateTransationsList();
}

function loadSavedTransactions() {
  let storedTransactions = JSON.parse(
    localStorage.getItem('simple-expense-tracker')
  );

  if (storedTransactions) transactions = storedTransactions;
  else transactions = sampleTransactions;
}
function saveCurrentTransactions() {
  localStorage.setItem('simple-expense-tracker', JSON.stringify(transactions));
}

function updateTransactionsBalance() {
  let income = transactions
    .filter((tr) => tr.amount > 0)
    .reduce((acc, tr) => acc + tr.amount, 0);

  let expenses = transactions
    .filter((tr) => tr.amount < 0)
    .reduce((acc, tr) => acc + tr.amount, 0);

  balance.innerHTML = `$${(income + expenses).toFixed(2)}`;
  moneyIncome.innerHTML = `+$${income.toFixed(2)}`;
  moneyExpenses.innerHTML = `-$${Math.abs(expenses).toFixed(2)}`;
}
function updateTransationsList() {
  transactionsList.innerHTML = transactions
    .map((tr) => createTransactionCard(tr))
    .join('');
}
function createTransactionCard(transaction) {
  if (transaction.amount > 0)
    return `<li class="plus">${transaction.label} <span>+$${transaction.amount}</span><button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button></li>`;
  else
    return `<li class="minus">${transaction.label} <span>-$${Math.abs(
      transaction.amount
    )}</span><button class="delete-btn" onclick="deleteTransaction(${
      transaction.id
    })" >X</button></li>`;
}

function generateRandomID() {
  return Math.floor(Math.random() * 100000000);
}
