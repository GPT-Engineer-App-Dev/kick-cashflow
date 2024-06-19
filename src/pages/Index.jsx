import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast, useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-10-01', amount: 200, type: 'income', category: 'Nike' },
    { id: 2, date: '2023-10-02', amount: 150, type: 'expense', category: 'Adidas' },
  ]);
  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', type: '', category: '' });
  const [editTransaction, setEditTransaction] = useState(null);
  const { toast } = useToast();

  const handleAddTransaction = () => {
    if (!newTransaction.date || !newTransaction.amount || !newTransaction.type || !newTransaction.category) {
      toast({ title: 'Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    setTransactions([...transactions, { ...newTransaction, id: transactions.length + 1 }]);
    setNewTransaction({ date: '', amount: '', type: '', category: '' });
    toast({ title: 'Success', description: 'Transaction added successfully' });
  };

  const handleEditTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setEditTransaction(transaction);
  };

  const handleUpdateTransaction = () => {
    if (!editTransaction.date || !editTransaction.amount || !editTransaction.type || !editTransaction.category) {
      toast({ title: 'Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    setTransactions(transactions.map((t) => (t.id === editTransaction.id ? editTransaction : t)));
    setEditTransaction(null);
    toast({ title: 'Success', description: 'Transaction updated successfully' });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast({ title: 'Success', description: 'Transaction deleted successfully' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sneaker Accounting App</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Add New Transaction</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="date"
            placeholder="Date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          />
          <Select
            value={newTransaction.type}
            onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newTransaction.category}
            onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nike">Nike</SelectItem>
              <SelectItem value="Adidas">Adidas</SelectItem>
              <SelectItem value="Puma">Puma</SelectItem>
              <SelectItem value="Reebok">Reebok</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="mt-4" onClick={handleAddTransaction}>Add Transaction</Button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleEditTransaction(transaction.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {editTransaction && (
        <Dialog open={!!editTransaction} onOpenChange={() => setEditTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
              <DialogDescription>Update the details of your transaction.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                type="date"
                placeholder="Date"
                value={editTransaction.date}
                onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Amount"
                value={editTransaction.amount}
                onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })}
              />
              <Select
                value={editTransaction.type}
                onValueChange={(value) => setEditTransaction({ ...editTransaction, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={editTransaction.category}
                onValueChange={(value) => setEditTransaction({ ...editTransaction, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nike">Nike</SelectItem>
                  <SelectItem value="Adidas">Adidas</SelectItem>
                  <SelectItem value="Puma">Puma</SelectItem>
                  <SelectItem value="Reebok">Reebok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditTransaction(null)}>Cancel</Button>
              <Button onClick={handleUpdateTransaction}>Update Transaction</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;