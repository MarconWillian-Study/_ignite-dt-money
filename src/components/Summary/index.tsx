import { useTransactions } from "../../hooks/useTransaction";

import { Container } from "./styles";

import incomeIcon from '../../assets/income.svg';
import outcomeIcon from '../../assets/outcome.svg';
import totalIcon from '../../assets/total.svg';

export function Summary(){
  const {transactions} = useTransactions();

  const summary = transactions.reduce((accumulator, transaction) => {
    if(transaction.type==='deposit'){
      accumulator.deposit += transaction.amount;
      accumulator.total += transaction.amount;

      return accumulator
    } else {
      accumulator.withdraw -= transaction.amount;
      accumulator.total -= transaction.amount;

      return accumulator
    }
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIcon} alt="Income"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.deposit)
          }
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIcon} alt="Income"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.withdraw)
          }
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="Total"/>
        </header>
        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(summary.total)
          }
        </strong>
      </div>
    </Container>
  )
}