import Button from "../../components/Button"

const addBook = () => {
    return (
        <div className="book-add-container">
            <span className="book-add-container-text">Read a good book, or do you have a book that colleagues can borrow?</span>
            <Button text="Click here" type="link" to="/books/add" />
        </div>
    )
}

export default addBook
