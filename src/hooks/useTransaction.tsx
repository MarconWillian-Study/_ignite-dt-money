import { createContext, ReactNode, useContext, useEffect, useState }  from 'react'
import { v4 } from 'uuid';

import api from '../services/api';


interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createAt: Date;
}

type  TransactionInput = Omit<Transaction, 'id' | 'createAt'>

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionsProvider({children}: TransactionProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("@ignite/dt-money") || "[]")

    setTransactions(transactions)
    // api.get('transactions')
    //   .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput){
    // const response = await api.post('/transactions', {
    //   ...transactionInput,
    //   createAt: new Date()
    // });
    // const { transaction } = response.data;

    const transaction = {
      id: v4(),
      ...transactionInput,
      createAt: new Date()
    }

    localStorage.setItem('@ignite/dt-money', JSON.stringify([...transactions, transaction]))
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )


}

export function useTransactions(){
  const context = useContext(TransactionContext);

  return context;
} 