import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';

import { App } from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server){

    const transactions = JSON.parse(localStorage.getItem("@ignite/dt-money") || "[]")

    server.db.loadData({
      transactions: transactions
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', (schema) => {
      return this.schema.all('transaction');
    });
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      const newTransaction = schema.create('transaction', data);

      const transactions = JSON.parse(localStorage.getItem("@ignite/dt-money") || "[]")
      localStorage.setItem('@ignite/dt-money', JSON.stringify([...transactions, newTransaction]))

      return newTransaction;
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

