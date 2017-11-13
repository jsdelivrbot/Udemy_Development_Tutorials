export function selectBook(book) {
    // selectBook is an ActionCreator, it needs to return an action, an object with a type property.
    // return {
    //   type: "BOOK_SELECTED",
    //   payload: book
    // };
    console.log('A book has bee selected:', book.title);
}