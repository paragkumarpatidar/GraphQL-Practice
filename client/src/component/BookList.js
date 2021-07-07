import { useState } from "react";
import { graphql } from "react-apollo";
import { getAllBooksQuery } from "../queries/queries"
import BookDetails from "./BookDetails";

function BookList(props) {

    const [selected, setSelected] = useState(null);

    function displayBooks() {
        var data = props.data;
        if (data.loading) {
            return (<div>Loading Books...</div>);
        } else {
            return data.allBooks.map(book => {
                return (
                    <li key={book.id} onClick={(e) => {setSelected(book.id)}}>{book.name}</li>
                );
            })
        }
    }

    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId={selected}/>
        </div>
    );
}


export default graphql(getAllBooksQuery)(BookList);
