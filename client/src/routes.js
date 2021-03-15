import React from 'react';
import { Route, Switch } from 'react-router';
import App from './App';
import signup from './components/signup';
import SignupClient from './components/SignupClient';
import login from './components/login';
import signupSuccess from './components/signupSuccess';
import signupClientSuccess from './components/signupClientSuccess';
import HomeClient from './components/HomeClient';
import HomePartner from './components/HomePartner';
import contractSuccess from './components/contractSuccess';
import About from './components/about';
import Contact from './components/contact';


const Routes = () => {
    return (
        <App>
            <Switch>
                <Route exact path="/signup" component={signup} />
                <Route exact path="/SignupClient" component={SignupClient} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signupSuccess" component={signupSuccess} />
                <Route exact path="/signupClientSuccess" component={signupClientSuccess} />
                <Route exact path="/HomeClient" component={HomeClient} />
                <Route exact path="/HomePartner" component={HomePartner} />
                <Route exact path="/contractSuccess" component={contractSuccess} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route path="/" component={login} />
            </Switch>
        </App>
    )
};

export default Routes;