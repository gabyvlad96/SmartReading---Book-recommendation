import React from "react";
import { Input, Button, Form, FormGroup, Label, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

interface Props {
    login(email: string, pass: string): void;
    signup(email: string, pass: string): void;
}

interface State {
    email: string;
    password: string;
    newUser: boolean;
}

class LoginForm extends React.Component<Props, State>{

    state: State = {
      email: '',
      password: '',
      newUser: false
    };
  
    login = (e: any) => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    signup = (e: any) => {
        e.preventDefault();
        this.props.signup(this.state.email, this.state.password);
    }

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ email: value });
    }

    handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ password: value });
    }

    toggleNewUser = () => {
        this.setState(prevState => ({ newUser: !prevState.newUser }));
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className={'mainDiv'}>
                <Label className={'mainLabel'}>
                { !this.state.newUser?
                 'LOG IN TO YOUR ACCOUNT': 'SIGN UP USING EMAIL AND PASSWORD'
                }</Label>
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={12}>
                            <Input
                                style={{ marginBottom: 24 }}
                                required
                                type={"email"}
                                value={email}
                                onChange={this.handleEmailChange}
                            />       
                        </Col>
                    </FormGroup>
                    <FormGroup row className={'secondFormGroup'}>
                        <Label for="exampleEmail" sm={2}>Password</Label>
                        <Col sm={12}>
                            <Input
                                style={{ marginBottom: 24 }}
                                required
                                type={"password"}
                                value={password}
                                onChange={this.handlePassChange}
                            />     
                        </Col>
                    </FormGroup>
                    <Col sm={12}>
                        { !this.state.newUser? (
                            <Button
                                onClick={this.login}
                                className={'loginButton'}
                                type={"submit"}
                            >
                                Login
                            </Button>
                            ) : (
                            <Button
                                onClick={this.signup}
                                className={'signinButton'}
                                type={"submit"}
                            >
                                Sign up
                            </Button>
                        )
                        }
                    </Col>
                    <Label check className={'radio'}>
                            <Input onClick={this.toggleNewUser} type="checkbox" id="checkbox2" />{' '}
                                New user? Sign Up!
                        </Label>
                </Form>
            </div>
        );
    }
    }

export default LoginForm;
