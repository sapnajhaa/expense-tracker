import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

const ExpenseTable = ({expenseData, setExpenseData,setSnackbar}) => {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    date: "",
    expenseType: "",
    amount: "",
    paymentMethod: "",
  });
  const [deleteConfirm,setDeleteConfirm] = useState(false)
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }

  function handleDelete() {
      const updatedExpense = expenseData.filter((_, i) => i !== editIndex);
      setExpenseData(updatedExpense);
      localStorage.setItem("expenseData", JSON.stringify(updatedExpense));
      setSnackbar({
        open: true,
        message: "Record Deleted Successfully",
        severity: "warning",
      });
      setDeleteConfirm(false);
  };

  const handleDeleteModalOpen =(index)=>{
    setDeleteConfirm(true);
    setEditIndex(index);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditData(expenseData[index]);
    setOpen(true);
  }

  function handleUpdate() {
    let updatedExpenses = [...expenseData];
    updatedExpenses[editIndex] = editData;
    setExpenseData(updatedExpenses);
    localStorage.setItem("expenseData", JSON.stringify(updatedExpenses));
    setOpen(false);
    setSnackbar({
      open: true,
      message: "Record Updated Successfully",
      severity: "success",
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead sx={{ backgroundColor: "orange" }}>
          <TableRow>
            <TableCell sx={{color:"#fff"}}>Date</TableCell>
            <TableCell align="right" sx={{color:"#fff"}}>Expense Type</TableCell>
            <TableCell align="right" sx={{color:"#fff"}}>Amount</TableCell>
            <TableCell align="right" sx={{color:"#fff"}}>Payment Method</TableCell>
            <TableCell align="right" sx={{color:"#fff"}}>Actions</TableCell>
          </TableRow>
        </TableHead>
        {expenseData.length > 0 ? (
          <TableBody>
            {expenseData.map((row, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {formatDate(row.date)}
                </TableCell>
                <TableCell align="right">{row.expenseType}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.paymentMethod}</TableCell>
                <TableCell align="right">
                  <EditIcon
                    sx={{ color: "blue", cursor: "pointer", marginRight: 1 }}
                    onClick={() => handleEdit(index)}
                  />
                  <DeleteIcon sx={{ color: "red", cursor: "pointer" }} onClick={() => handleDeleteModalOpen(index)} />
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <span>No Data Available</span>
        )}
      </Table>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Expense</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={editData.date}
            onChange={(e) => setEditData({ ...editData, date: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Expense Type"
            fullWidth
            value={editData.expenseType}
            onChange={(e) => setEditData({ ...editData, expenseType: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Payment Method"
            fullWidth
            value={editData.paymentMethod}
            onChange={(e) => setEditData({ ...editData, paymentMethod: e.target.value })}
            margin="dense"
          />
          <Button onClick={handleUpdate} variant="contained" sx={{ marginTop: 2 }}>
            Update
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle> Are you sure you want to delete ?</DialogTitle>
        <DialogActions>
          <Button onClick={()=>setDeleteConfirm(false)}>cancel</Button>
          <Button onClick={handleDelete} autoFocus color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ExpenseTable;