
import React from "react";
import "./App.css";
import { Route } from 'react-router-dom';
import NavBar from "./components/navBar/navBar";
import HomePage from "./components/homepage/homepage";
import Shop from "./components/shop/shop";
import About from "./components/about/about"
import Account from "./components/accounts/accounts"
import Profile from "./components/profile/profile"
import CreateAccount from "./components/createAccount/createAccount";
import { auth, userProfileDocument } from './firebase/firebase';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  leaveAuth = null;

  componentDidMount() {
    this.leaveAuth = auth.onAuthStateChanged(async theUser => {
      if (theUser) {
        const userId = await userProfileDocument(theUser);

        userId.onSnapshot(getId => {
          this.setState({
            user: {
              id: getId.id,
              ...getId.data()
            }
          })
        })
      }
      this.setState({ user: theUser });
    });
  }

  componentWillUnmount() {
    this.leaveAuth();
  }

  render() {
    return (
      <div className="App">
        <Route exact={false} path='/'>
          <NavBar currentUser={this.state.user} />
        </Route>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/about' component={About} />
        <Route exact path='/signin' component={Account} />
        <Route exact path='/createaccount' component={CreateAccount} />
        <Route exact path='/profile' >
          <Profile currentUser={this.state.user} />
        </Route>
      </div>
    );
  }
}

export default App;