import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useState } from "react";
import ExpenseTable from "./ExpenseTable";
import { Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Expense Types
const expenseTypes = [
  { value: "Food", label: "Food" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Travel", label: "Travel" },
  { value: "Rent", label: "Rent" },
  { value: "Gym", label: "Gym" },
  { value: "Shopping", label: "Shopping" },
  { value: "Health", label: "Health" },
  { value: "Beauty", label: "Beauty" },
  { value: "Recharges", label: "Recharges" },
  { value: "Loans", label: "Loans" },
  { value: "Others", label: "Others" },
];

// Payment Methods
const paymentMethods = [
  { value: "Cash", label: "Cash" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Debit Card", label: "Debit Card" },
  { value: "UPI", label: "UPI" },
];

const BudgetFeed = () => {
  const [expenseData, setExpenseData] = useState(
    JSON.parse(localStorage.getItem("expenseData")) || []
  );
  const [expense, setExpense] = useState("");
  const [expenseType, setExpenseType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const totalAmount = expenseData.reduce(
    (total, item) => total + Number(item.amount),
    0
  );
  function handleSubmit() {
    if (!expense || isNaN(expense) || Number(expense) <= 0) {
      setSnackbar({
        open: true,
        message: "Please enter a valid positive expense amount and type",
        severity: "error",
      });
      return;
    }
    

    const currentExpense = {
      date: new Date(),
      expenseType,
      paymentMethod,
      amount: Number(expense),
    };

    const storedExpenses = localStorage.getItem("expenseData");
    if (storedExpenses) {
      const existingExpenses = JSON.parse(storedExpenses);
      existingExpenses.push(currentExpense);
      localStorage.setItem("expenseData", JSON.stringify(existingExpenses));
      setExpenseData(existingExpenses);
    } else {
      localStorage.setItem("expenseData", JSON.stringify([currentExpense]));
      setExpenseData([currentExpense]);
    }

    // Reset fields
    setExpense("");
    setExpenseType("");
    setPaymentMethod("");
    setSnackbar({
      open: true,
      message: "Expense saved successfully!",
      severity: "success",
    });
  }

  const handleCloseSnack = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "",
    });
  };

  return (
    <div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Typography
        variant="h5"
        textAlign={"center"}
        padding={1}
        color={"primary"}
      >
        Monthly Expenses Records
      </Typography>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Amount Input */}
        <TextField
          id="outlined-basic"
          label="Enter Amount"
          type="number"
          value={expense}
          onChange={(e) => {
            const inputValue = e.target.value;
            // Convert to number and prevent negatives
            if (inputValue === "" || Number(inputValue) >= 0) {
              setExpense(inputValue);
            }
          }}
          variant="outlined"
        />

        {/* Expense Type Select */}
        <FormControl fullWidth>
          <InputLabel id="expense-type-label">Expense Type</InputLabel>
          <Select
            label="Expense Type"
            id="select-expense"
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
          >
            {expenseTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Payment Method Select */}
        <FormControl fullWidth>
          <InputLabel id="expense-type-label">Payment Method</InputLabel>
          <Select
            label="Payment Method"
            id="select-expense"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Add Expense Button */}
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleSubmit}
        >
          Add Expense
        </Button>
        <div
          style={{
            backgroundColor: "orange",
            borderRadius: "50%",
            width: "92px",
            padding: "6px 11px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            padding={1}
            color={"#fff"}
          >
            Total
          </Typography>{" "}
          {totalAmount}
        </div>
      </Box>

      {/* Expense Table */}
      <ExpenseTable expenseData={expenseData} setExpenseData={setExpenseData} setSnackbar={setSnackbar}/>
    </div>
  );
};

export default BudgetFeed;
