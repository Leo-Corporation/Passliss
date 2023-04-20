# Contribution

## Summary

- [Knowledge](#knowledge)
- [Tools](#tools)
- [Writing code](#writing-code)

## Knowledge

To contribute to this project, you will need to have some prerequisites:

- A basic knowledge of React and Next.js
- A basic knowledge of TypeScript, JSX/TSX
- A basic knowledge of Visual Studio Code

## Tools

You will also need to have the following tools:

- Microsoft Visual Studio Code
- Node.js and `npm`.
- Git

_Note: You will need to install the `npm` dependencies as well._

## Writing code

Make sure you follow the following guidelines:

1. Use a consistent coding style and formatting throughout the codebase:

```ts
// Use consistent indentation and whitespace
function calculateSum(numbers: number[]): number {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}

// Use consistent naming conventions
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

function getUserFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}
```

2. Use descriptive names for variables, functions, classes, and other entities:

```ts
// Use descriptive names for variables
const shoppingCartItems: string[] = ["apples", "bananas", "oranges"];

// Use descriptive names for functions
function calculateTotalPrice(items: number[], taxRate: number): number {
  const subtotal = items.reduce((acc, cur) => acc + cur);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}

// Use descriptive names for classes
class User {
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string
  ) {}

  public getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

3. Use camelCase for naming variables and functions, and PascalCase for naming classes and components:

```ts
const firstName: string = "John";
const lastName: string = "Doe";

function calculateSum(numbers: number[]): number {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
  }
  return sum;
}

interface Props {
  firstName: string;
  lastName: string;
}

function FullName({ firstName, lastName }: Props) {
  return <h1>{`${firstName} ${lastName}`}</h1>;
}
```

4. Use interfaces to define the shape of objects and data types used in the application:

```ts
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ShoppingCartItem {
  product: Product;
  quantity: number;
}
```

5. Use enums to define a set of related constants:

```ts
enum PaymentMethod {
  CreditCard = "credit-card",
  PayPal = "paypal",
  Venmo = "venmo",
}

const paymentMethod: PaymentMethod = PaymentMethod.CreditCard;
```

6. Use type aliases to define custom types that are used throughout the application:

```ts
type UserId = number;
type Email = string;

interface User {
  id: UserId;
  firstName: string;
  lastName: string;
  email: Email;
}
```

7. Use generics to write reusable functions and classes:

```ts
function toArray<T>(value: T): T[] {
  return [value];
}

class Stack<T> {
  private items: T[] = [];

  public push(item: T): void {
    this.items.push(item);
  }

  public pop(): T | undefined {
    return this.items.pop();
  }
}
```

8. Avoid using any as much as possible, and instead use specific types that accurately describe the data:

```ts
// Bad example: using any
function calculateTotalPrice(items: any[], taxRate: any): any {
  const subtotal = items.reduce((acc, cur) => acc + cur);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}

// Good example: using specific types
function calculateTotalPrice(items: number[], taxRate: number): number {
  const subtotal = items.reduce((acc, cur) => acc + cur);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}
```

9. Use comments to provide context and explain complex or non-obvious code:

```ts
interface User {
  id: number; // Unique identifier for the user
  firstName: string; // First name of the user
  lastName: string; // Last name of the user
  email: string; // Email address of the user
}

function calculateTotalPrice(items: number[], taxRate: number): number {
  const subtotal = items.reduce((acc, cur) => acc + cur);
  const tax = subtotal * taxRate;
  return subtotal + tax; // Return the total price including tax
}
```
