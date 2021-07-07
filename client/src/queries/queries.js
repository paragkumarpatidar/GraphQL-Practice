import { gql } from "apollo-boost";

const getAllAuthorsQuery = gql`
    {
        allAuthors{
            name
            id
        }
    }
`

const getAllBooksQuery = gql`
    {
        allBooks{
            name
            id
        }
    }
`

const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            id
        }
    }
`

const getSingleBookQuery = gql`
   query($id:ID!) {
        getBook(id:$id){
            id
            name
            genre
            author {
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`

export { 
    getAllAuthorsQuery, 
    getAllBooksQuery, 
    addBookMutation,
    getSingleBookQuery
};