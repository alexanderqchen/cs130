# Juvenile System Project

## Overview of this project
This repository holds the code for the `Juvenile Justice System Educational Platform` project.
This project was created as part of UCLA's CS130 (Software Engineering) course.

A high level overview of the problem that this project aims to solve:
- Convicted youths in the LA court system are under-educated about the trial process
- The goal of the project is to create an educational platform for convicted youths
- The platform will be an iOS application
- The textual content of the iOS application must be editable by the admins
- The admins of the project are the clients we worked with


A high level overview of how we tackled the problem:
- The project is implemented as two primary components
  - A user-facing iOS application, which includes the following
    - A diagram of a standard courtroom, with the key players of the court
      - Roles for each of the key players are provided
    - A glossary page for common courtroom terms
    - A references page containing links to additional information
  - An admin-facing dashboard, which includes the following
    - A courtroom page, where admins can edit the definitions of courtroom terms
    - A glossary page, where admins can:
      - Edit term names, or term definitions
      - Delete terms
      - Add new terms
    - A settings page, where admins can:
      - Enable or disable other admins
      - Invite new admins to the system
- Data is stored in a Firebase Realtime Database
  - The iOS application reads from this database
  - The admin-facing dashboard performs creates, reads, updates, and deletes to this database

This repository contains code for the following aspects:
- The admin-facing dashboard, which accesses and modifies the Firebase Realtime Database
  - The user interface is implemented in ReactJS
  - We use Prettier and Eslint to maintain code readability and styling
- The Swift wrapper that the iOS application calls to fetch data from the Firebase Realtime Database

Our team was also responsible for setting up and managing the Firebase Realtime Database, and the accounts for the system

Another collaborating team will handle the following aspects:
- The user-facing iOS app that calls our Swift wrapper (which reads from the Firebase Realtime Database), to obtain textual data

## Setting up your dev environment

1. Install the prettier plugin to your text editor.
2. In the settings of your text editor, turn on the "format on save" setting.

## Start a local instance of the app, for development

Install yarn if needed, using your desired package manager (e.g. sudo apt-get).

Then install dependencies:

```
yarn
```

Now start the local dev server:

```
yarn start
```

## Adding your changes

1. Assign yourself to an issue or create one if it does not yet exist.
2. Make a new branch with `git checkout -b <your_name>/<feature>`.
3. Write your code, `git add`, `git commit`, `git push`.
4. Make a pull request.
5. Wait for your code to be reviewed.
6. Once your code is approved, merge it into master.

## General tips

- Keep your pull requests small and functional.
- Pull from master often.
- Let people know what you're working on.

## Delivered product
The final iteration of our product has been successfully delivered to the clients.
We have also given a live demonstration to the class.

The product is deployed publicly at:
https://juvenilejustice-d5aea.firebaseapp.com
<br>
Use your administrator account to log into the dashboard.
If you do not have an administrator account, contact the clients or the developers, so they can invite you.

## Testing

#### Unit testing
We have included basic unit tests using for the components of the admin dashboard.
The tests use `jest` and `enzyme` as testing frameworks.
To run all unit tests, use the following:
```
yarn test
```

#### Testing the deployed product
It is also important to test the delivered version of the product.
<br>
Access the delivered product at the public deployment: 
https://juvenilejustice-d5aea.firebaseapp.com
<br>
The key features to test are:
- Try logging in with an invalid email/password combination (just use some arbitrary credentials)
  - Do so by pressing the "Log In" button at the top right of the landing page, and entering your credentials in the login page
  - Notice that you will not be authorized
- Log in with your real admin account
  - Do so by pressing the "Log In" button at the top right of the landing page, and entering your credentials in the login page
- Verify that you are redirected to the `Courtroom` page after logging in
- Notice that this page shows courtroom terms and definitions
- Edit the definition of a courtroom term
  - Do so by pressing the "pencil" icon for the term, and making updates to the "definition" textbox
  - Notice that the name of the coutroom terms are not editable
  - Please undo the edits you have made
- Navigate to the `Glossary` page using the navbar at the top of the page
- Edit the definition of an existing glossary term
  - Do so by pressing the "pencil" icon for the term, and making updates to the "definition" textbox
  - Please undo the edits you have made
- Create a new glossary term
  - Do so by pressing the "plus" icon that floats at the bottom right of your screen, and filling out the term name and definition
- Notice that the names of all glossary terms are editable
  - Edit the name of your new glossary term
    - Do so by pressing the "pencil" icon for the term, and making updates to the "term" textbox
- Delete the new glossary term you made
  - Do so by pressing the "x" icon for the term
- Navigate to the `Settings` page using the navbar at the top of the page
- Enable or disable an admin account by toggling the switch next to their email
  - Notice that the confirmation dialog for enabling or disabling an admin is tailored to the specific action you are attempting to perform
  - Please undo the change you made
- Log out
  - Do so by pressing the "Log Out" button at the top right of the page
- Use the "Forgot password" feature
  - Press the Login button, and choose "Forgot Password" in the login page
  - Enter your email address to obtain a password reset email
  - Follow the instructions in the email, to reset your password
  - Log back in to our dashboard, using your new password
- Log out again
- Attempt to log in with a disabled admin account
  - The email address `test.disabled.admin@gmail.com` is disabled. Use any password when testing this. The enabled check comes before authentication, so the password is irrelevant.

