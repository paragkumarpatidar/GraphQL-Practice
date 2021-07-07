import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { getAllAuthorsQuery, addBookMutation, getAllBooksQuery } from "../queries/queries"
import { useState } from "react";


function AddBook(props) {

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    function displayAuthors() {
        var data = props.getAllAuthorsQuery;
        if (data.loading) {
            return (<option>Loading Authors...</option>);
        } else {
            return data.allAuthors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                );
            })
        }
    }

    function submitForm(e) {
        e.preventDefault();
        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getAllBooksQuery }]
        });
    }

    return (
        <form id="addBook" onSubmit={submitForm.bind()}>
            <div className="field">
                <label>Book name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Authors</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>

            <button>+</button>
        </form>
    );
}

export default compose(
    graphql(getAllAuthorsQuery, { name: "getAllAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);