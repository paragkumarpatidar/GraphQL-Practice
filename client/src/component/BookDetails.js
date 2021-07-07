import { graphql } from "react-apollo";
import { getSingleBookQuery } from "../queries/queries"

function BookDetails(props) {
    console.log(props);
    function displayBookDetails() {
        const { getBook } = props.data;
        if (getBook) {
            return (
                <div>
                    <h2>{getBook.name}</h2>
                    <p>{getBook.genre}</p>
                    <p>{getBook.author.name}</p>
                    <p>All Books by this Author</p>
                    <ul className="other-books">
                        {getBook.author.books.map(item => {
                            return <li key={item.id}>{item.name}</li>
                        })}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No Book selected</div>
            )
        }
    }
    return (
        <div id="book-details">
            <p>Output book details here</p>
            {displayBookDetails()}
        </div>
    );
}


export default graphql(getSingleBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
