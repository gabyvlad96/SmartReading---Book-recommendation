import React, { Component } from 'react';
import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import './profile.css'

interface Props {
    setValue(value: string): void;
}

interface State {
    bookName: string;
    bookFound: boolean;
    partialSearch: [];
    showSuggestions: boolean;
    showIcon: boolean;
}

class SuggestionInput extends Component<Props, State> {
    state: State = { 
        bookName: '',
        bookFound: false,
        partialSearch: [],
        showSuggestions: false,
        showIcon: false
    };

    handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({ bookName: value});
        if(value.length >= 4){
            try {
                const response = await fetch(`http://127.0.0.1:5002/bookSugg/${this.state.bookName}`)
                const data = await response.json();
                console.log(data);
                console.log(data.results);
                if(data.success)
                    this.setState({ partialSearch: data.results, showSuggestions: true })
                else
                    this.setState({ showSuggestions: false })
            } catch (error) {
                console.log(error.message);
            }
            this.checkForBook();
        }
    }

    sendValue = () => {
        if (this.state.bookFound)
            this.props.setValue(this.state.bookName)
        console.log('book SENT')
    }

    handleBlur = () => {
        this.setState({ showSuggestions: false, showIcon: true })
        this.checkForBook();
        this.sendValue();
    }

    checkForBook = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5002/checkBook/${this.state.bookName}`)
            const data = await response.json();
            console.log(data);
            this.setState({ bookFound: data })
        } catch (error) {
            console.log(error.message);
        }
        console.log("book cheked")

    }

    bookClicked = (book: string, e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(book);
        this.setState({bookName: book, bookFound: true, showSuggestions: false, showIcon: true}, () => {
            this.sendValue();
        })
    }

    render() {
        return (
            <div>
                <div className={'form'}>
                    <Input
                        className={'input'}
                        required
                        type={"text"}
                        value={this.state.bookName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                    />
                    {!this.state.showSuggestions && this.state.showIcon?
                    (this.state.bookFound? 
                        (
                            <FontAwesomeIcon className={'icon'} icon={faCheck} color='green' />
                        ) : (
                            <FontAwesomeIcon className={'icon'} icon={faTimes} color='red'/>
                        )
                    ):(
                        <div className={'emptySquare'}></div>
                    )
                }
                </div>
                { this.state.showSuggestions &&
                    <div className={'suggestionsContainer'}>
                        {this.state.partialSearch.map((book: string, i: number) => (
                            <p key={i} className={'bookRow'} onMouseDown={(event) => this.bookClicked(book, event)}>{book}</p>
                        ))
                        }
                    </div>
                }
            </div>
        );

    }

}

export default SuggestionInput;
