# Quiz
A small demo for quiz using the firebase database.

### Clone
```https://github.com/NirmalsinhRathod/CreoleQuiz.git```

#### Firebase Auth
We have used firebase authentication using the phone number. Also we have integrated the real-time database for the quiz.

#### installation
```sh
npm install --save react-native-firebase
```
##### Phone Authentication setup 
- Firebase setup you can check this link https://rnfirebase.io/docs/v5.x.x/installation/initial-setup
- Phone Auth enable the option
Go to firebase console -> your project -> Authentication -> select signin-method tab -> enable the phone option 

![Screenshot 2019-12-04 at 3.23.38 PM.png](https://www.dropbox.com/s/22pgn5y7w7w6grp/Screenshot%202019-12-04%20at%203.23.38%20PM.png?dl=0&raw=1)

##### signInWithPhoneNumber
 signInWithPhoneNumber will sign the user in automatically once the user had confirmed their phone number
 1. Trigger phone auth
     ```sh
     firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => // save confirm result to use with the manual verification code)
      .catch(error => /error);
     ```
 
 2. Confirm verification code
    ```sh
    confirmResult.confirm(verificationCode)
      .then(user => // User is logged in){
      .catch(error => // Error with verification code);
    ```
3. [Android] Handle Auto Verification
For the Auto verification you need to listen the onAuthStateChanged():
    ```sh
    firebase.auth().onAuthStateChanged((user) => {
      if (user) // user is verified and logged in
    });
    ```