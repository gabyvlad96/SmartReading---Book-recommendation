import React from "react";
import { BrowserRouter, Switch, Route, Link, RouteProps, Redirect } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import LoginForm from "./Login/Login";
import About from './About/About';
import fire from "./Config/Fire";
import 'App.css'


const Wrapper = (props: any) => (
  <div style={{ maxWidth: 400, padding: 16, margin: "auto" }} {...props} />
)

class ProtectedRoute extends React.Component<RouteProps & {enable: boolean}, {}> {
    render () {
        if (this.props.enable)
            return <Route {...this.props}/>;
        return <Redirect to='/' />;
    }
}

interface State {
    user: any;
}

class App extends React.Component<{}, State> {
   
    state: State = {
        user: fire.currentUser
    };

    componentDidMount() {
        fire.onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid)
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });
    }

    getUserID = async () => {
        let token: string = '1'
        if(fire.currentUser){
            token = await fire.currentUser.getIdToken();
        }
        return token;
    }

    handleLogIn = (history: any) => (email: any, password: any) => {
        return fire.signInWithEmailAndPassword(email, password).then(() => {
            return history.push("/profile");
        });
    };

    handleSignUp = (history: any) => (email: any, password: any) => {
        fire.createUserWithEmailAndPassword(email, password).then((u)=>{
            return history.push("/profile");
        }).then((u)=>{console.log(u)})
        .catch((error) => {
            console.log(error);
        })
    }

    logout = () => {
        fire.signOut();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact render={() => (
                        <Wrapper className={'wrapper'}>
                            <div className={'nav'}>
                                <Link to="/" className={'logo'}>SmartReading</Link>
                                <Link to="/" style={{ marginRight: 16 }}>Home</Link>
                                { this.state.user!=null?
                                    (<div>
                                        <Link to="/profile" style={{ marginRight: 16 }}>Profile</Link>
                                        <Link to="/about" style={{ marginRight: 16 }}>About</Link>
                                    </div>)
                                    :
                                    (<div>
                                        <Link to="/about" style={{ marginRight: 16 }}>About</Link>
                                        <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
                                    </div>)
                                }
                            </div>
                            <Home isUserLogged={this.state.user}/>
                        </Wrapper>
                        )}
                    />
                    <Route path="/login" exact render={({ history }) => (
                        <Wrapper className={'loginWrapper'}>
                            <div className={'nav'} style={{border: 'none'}}>
                                <Link className={'logoFromLogin'} to="/">SmartReading</Link>
                            </div>
                            <LoginForm login={this.handleLogIn(history)} signup={this.handleSignUp(history)} />
                        </Wrapper>
                        )}
                    />
                    <ProtectedRoute exact path="/profile" enable={this.state.user!=null} render={() => (
                        <Wrapper className={'wrapper'}>
                            <div className={'nav'}>
                                <Link to="/" className={'logo'}>SmartReading</Link>
                                <Link to="/" style={{ marginRight: 16 }}>Home</Link>
                                <Link to="/profile" style={{ marginRight: 16 }}>Profile</Link>
                                <Link to="/about" style={{ marginRight: 16 }}>About</Link>
                                <Link to="/" className={'logout'} onClick={this.logout}>Logout</Link>
                            </div>
                            <Profile userId={this.state.user.uid}/>
                        </Wrapper>
                        )} 
                    />
                    <Route path="/about" exact render={() => (
                        <Wrapper className={'wrapper'}>
                           <div className={'nav'}>
                                <Link to="/" className={'logo'}>SmartReading</Link>
                                <Link to="/" style={{ marginRight: 16 }}>Home</Link>
                                { this.state.user!=null?
                                    (<div>
                                        <Link to="/profile" style={{ marginRight: 16 }}>Profile</Link>
                                        <Link to="/about" style={{ marginRight: 16 }}>About</Link>
                                    </div>)
                                    :
                                    (<div>
                                        <Link to="/about" style={{ marginRight: 16 }}>About</Link>
                                        <Link to="/login" style={{ marginRight: 16 }}>Login</Link>
                                    </div>)
                                }
                            </div>
                            <About/>
                        </Wrapper>
                        )}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
