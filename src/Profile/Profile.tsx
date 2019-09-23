import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SuggestionImput from './suggestionInput'
import './profile.css'

interface State {
    data: [];
    error: string;
    madeApiCall: boolean;
    booksName: string[];
}

let state: State = { 
    data: [], 
    error: '' ,
    madeApiCall: false,
    booksName: ['']
}

class Profile extends Component<{userId: string}, State> {

    constructor(props: any) {
        super(props);
        // Retrieve the last state
        this.state = state;
    }

    componentWillUnmount() {
        // Remember state for the next mount
        state = this.state;
    }
    
    getBooks = async () => {
        const options = {
            
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                books: this.state.booksName
              })      
          };
          
        try {
            const response = await fetch(`http://127.0.0.1:5002/getUserRec`, options)
            const data = await response.json();
            console.log(data);
            
            this.setState({ data: data, madeApiCall: true});
    
        } catch (error) {
            console.log(error.message);
            this.setState({ error: error.message, madeApiCall: true });
        }
    }

    renderBooks = () => {
        const { data, error } = this.state;
        if (!this.state.madeApiCall) 
            return null;

        if (error) 
          return <div>{error}</div>;
        console.log(data);
        try {
        return data.map((book: any, i: number) =>  (
            <div className={'book'} key={i}>
                <img className={'image'} src={`http://covers.openlibrary.org/b/isbn/${book.ISBN}-L.jpg`} alt='img'/>
                <p className={'bookTitle'}>{book.bookTitle}</p>
                <p className={'bookAuthor'}>Author: {book.bookAuthor}</p>
            </div>
        ));
        } catch(error) {
            console.log(error);
            return <div>Book not found</div> 
        }
    }

    setBookValue = (value: string, index: number) => {
        console.log('book value set')
        let item = this.state.booksName
        item[index] = value;
        this.setState({ booksName: item })
    }

    addField = () => {
        let item = this.state.booksName;
        item.push('');
        this.setState({ booksName: item })
    }

    deleteField = () => {
        let item = this.state.booksName;
        item.pop();
        this.setState({ booksName: item })
    }

    render() {
        return (
            <div>
                <h1>Welcome to Profile</h1>
                {this.state.booksName.map((item: string, index: number) => (
                    <div className={'field'} key={index}>
                        <SuggestionImput setValue={(value) => this.setBookValue(value, index)}/>
                        {index==0 && 
                        <div className={'fieldButtons'}>
                            {this.state.booksName.length<8 &&
                                <Button className={'addBtn'} onClick={this.addField}>Add new input</Button>
                            }
                            {this.state.booksName.length!=1 &&
                                <Button className={'deletBtn'} onClick={this.deleteField}>Delete input</Button>
                            }
                        </div>
                        }
                    </div>
                ))}
                
                <Button 
                    className={'recommendBtn'} 
                    onClick={this.getBooks}
                    disabled={this.state.booksName[0]==''}
                >
                    Recommend
                </Button>
                
                <div className={'profileContent'}>
                    {this.renderBooks()}
                </div>
            </div>
        );

    }

}

export default Profile;
