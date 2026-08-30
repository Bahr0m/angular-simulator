export {};
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
type formatTypes = 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE';
type statusTypes = 'LOADING' | 'SUCCESS' | 'ERROR';

let status: statusTypes;
let textFormat: formatTypes = 'UPPERCASE';

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

function formatText(text: string, format: formatTypes): string {
  switch (format) {
    case 'UPPERCASE':
      return text.toUpperCase();
    case 'LOWERCASE':
      return text.toLowerCase();
    case 'CAPITALIZE':
      return text[0].toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
}

function removeChar(word: string, char: string): string {
  return word.replaceAll(char, '');
}

console.log(sum(5, 10));
console.log(formatText('hello world', textFormat));
console.log(removeChar('Hello World', 'o'));
