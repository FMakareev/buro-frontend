

export const otherHelp = [
  {
    title: 'How to log in?',
    description: 'On the main page, enter your username and password and click “Sign in”.'
  }, {
    title: 'I forgot my password, what should I do?',
    description: 'On the login page, click “Forgot your password?”. After the transition, enter the email address to which your account is registered. A letter will come to your mail, with an indication of the link, clicking on which you will be required to enter a new password with repetition.'
  },
];


export const clientHelp = [
  {
    title: 'How to create a client account?',
    description: `To register a user account, you need to click “Create an account” on the login page. Next you need to enter all your data (full name, date of birth, email address, password and master password) specifying the role “Client”. Please note that the password and master password must consist of Latin letters and numbers. After entering all the data you need to click “Get started”.`
  }, {
    title: 'I have changed personal data (name, email address, etc.), how do I make changes?',
    description: 'On your profile page you can make all necessary changes.'
  }, {
    title: 'Where does my credit history come from?',
    description: 'Your Credit History is loaded with the Credit History Bureau, taking into account all your loans and borrowings. History is constantly updated.'
  }, {
    title: 'Which banks will be able to see my credit history?',
    description: 'Only those banks to whom you have granted access will see your credit history.'
  },{
    title: 'How can I give the bank access to my credit history?',
    description: 'First of all, the bank must send you a request for access to credit history. You can provide him with a link to your credit history. The link is in your profile in the “You are a token for a bank” window. Further in the notification section, you confirm the request of the bank, thereby giving it access to your credit history.\n' +
    'Attention! If your credit history is updated after you have granted access to the bank, it will already have an old (irrelevant) version of credit history. To provide an updated (current) version of credit history, the bank must repeat the request.'
  },{
    title: 'What happens if my credit history is updated?',
    description: 'If your credit history has been updated, then all banks to which you have granted access will have the old (irrelevant) version of your credit history. To provide an updated (specified) version of credit history, the bank must repeat the request.'
  },
];
export const bankHelp = [
  {
    title: 'How do I get a bank account?',
    description: 'In order to register a bank account, you need to click “Create an account” on the login page. Next, you need to enter all the necessary data (name of the bank, e-mail address) indicating the role “Bank”. Please note that the password and master password must consist of Latin letters and numbers. After entering all the data you need to click “Get started”.'
  },  {
    title: 'How do I get access to user`s credit history?',
    description: 'First of all, you need to get a request to access to user`s credit history. After the user`s request approval, you need to check your e-mail and follow the link in it. Furthermore, you need to enter the code from e-mail in a field. The client can get access only to his own credit history.'
  }, {
    title: 'Customer credit history has been updated. How do I find out about this?',
    description: 'Changes to the user\'s credit history will be displayed in the "Documents" tab. They will be marked with the status "need updated."'
  },
];

export default {bankHelp, clientHelp};
