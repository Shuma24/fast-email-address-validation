# Email validation

You can use this library to do email validation. It does not handle smpt ping, only regular expressions are used.

## Installation

You need [Node.js](https://nodejs.org/) to run.

```sh
npm install fast-email-address-validation
yarn add fast-email-address-validation
```

## Function Props

| PROPS | INFO |
| ------ | ------ |
| inputEmail | Incoming email for validation |
| emailType | We can validate both all services and selected ones available for validation:  1) all - all services (all valid emails) 2) google - only google mail 3) outlook - only outlook mail 4) yahoo - only yahoo mail 5) custom - only you input service |
| customEmail (optional) | If emailType: custom is selected, you must enter the service that needs to be validated. it fits as follows: youemail.com, testemail.it written without "@"! |
| customAccountLength (optional) | the length of the username in the email, that is, everything before "@". Default: 64|
| customDomainLength (optional) | the length of the email service, that is, everything after "@". Default: 24 |

## How to use

```sh
import { validateEmail } from 'fast-email-address-validation';
//OR
const {validateEmail} = require('fast-email-address-validation')

const res = validateEmail({ inputEmail: 'myemail@myservice.com', emailType: 'all' })
console.log(res)
// res = { isValidEmail: true, userName: 'myemail', domain: 'myservice.com' }
```

## Props types info

```sh
type emailTypes = 'google' | 'yahoo' | 'custom' | 'outlook' | 'all';

export interface IProps {
  inputEmail: string;
  emailType: emailTypes;
  customEmail?: string;
  customAccountLength?: number;
  customDomainLength?: number;
}
```
