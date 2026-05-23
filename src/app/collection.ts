export class Collection<T> {
  private items: T[] = [];

  constructor(collection: T[] = []) {
    this.items = collection;
  }

  getAll(): T[] {
    return this.items;
  }
  getByIndex(index: number): T | undefined {
    return this.items[index];
  }
  removeAll(): void {
    this.items = [];
  }
  remove(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }
  replace(oldItem: T, newItem: T): void {
    const index = this.items.indexOf(oldItem);
    if (index !== -1) {
      this.items[index] = newItem;
    }
  }
}

const users = new Collection<IUser>([
  {
    name: 'Максим',
    surname: 'Иванов',
    email: '',
    country: 'Россия',
    city: 'Москва',
    maritalStatus: 'Single',
  },
  {
    name: 'Анна',
    surname: 'Петрова',
    email: '',
    country: 'Россия',
    city: 'Санкт-Петербург',
    maritalStatus: 'Married',
  },
  {
    name: 'Федор',
    surname: 'Сидоров',
    email: '',
    country: 'Россия',
    city: 'Новосибирск',
    maritalStatus: 'Divorced',
  },
]);

users.remove(1);
users.replace(users.getByIndex(0)!, {
  name: 'Максим',
  surname: 'Иванов',
  email: '',
  country: 'Россия',
  city: 'Москва',
  maritalStatus: 'Married',
});
console.log(`Users:`, users.getAll());

const numbers = new Collection<number>([1, 2, 3, 4, 5]);
numbers.remove(2);
numbers.replace(0, 10);
console.log(`Numbers:`, numbers.getAll());
