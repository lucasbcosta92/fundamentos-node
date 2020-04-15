import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface CreateTransation {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, item) => sum + item.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, item) => sum + item.value, 0);

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }

  public create({ title, value, type }: CreateTransation): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
