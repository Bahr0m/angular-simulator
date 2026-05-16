interface IUser {
  name: string;
  surname: string;
  email: string;
  age?: number;
  country: string;
  city: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
}

interface IPerson extends IUser {
  profession: string;
  weight?: number;
  height?: number;
}

let isStatus: 'loading' | 'success' | 'error' = 'loading';
let textFormat: 'uppercase' | 'lowercase' | 'capitalize' = 'capitalize';
const users: IUser[] = [
  {
    name: 'John',
    surname: 'Doe',
    email: 'john.doe@example.com',
    country: 'USA',
    city: 'New York',
    maritalStatus: 'Single',
  },
  {
    name: 'Jane',
    surname: 'Smith',
    email: 'jane.smith@example.com',
    country: 'Canada',
    city: 'Toronto',
    maritalStatus: 'Married',
  },
  {
    name: 'Alice',
    surname: 'Johnson',
    email: 'alice.johnson@example.com',
    country: 'UK',
    city: 'London',
    maritalStatus: 'Divorced',
  },
  {
    name: 'Bob',
    surname: 'Brown',
    email: 'bob.brown@example.com',
    country: 'Australia',
    city: 'Sydney',
    maritalStatus: 'Widowed',
  }
];

const singleUsers: IUser[] = users.filter((user: IUser) => user.maritalStatus === 'Single');


function sum(a: number, b: number): number {
  return a + b;
}

function showCityTemp(city: string, temp: number): void {
  console.log(`Сейчас в ${city} температура - ${temp} градусов по Цельсию`);
}

function removeChar(word: string, char: string): string {
  return word.replaceAll(char, '');
}

console.log(sum(5, 10));
showCityTemp('New York', 25);
console.log(removeChar('Hello World', 'o'));
