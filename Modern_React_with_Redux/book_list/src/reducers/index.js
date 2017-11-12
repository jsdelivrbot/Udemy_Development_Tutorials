// import { combineReducers } from "redux";
// import BooksReducer from "./reducer_books";
// import ActiveBook from "./reducer_active_book";
//
// const rootReducer = combineReducers({
//     books: BooksReducer,
//     activeBook: ActiveBook
// });
//
// export default rootReducer;

import { combineReducers } from "redux";
import BooksReducer from "./reducer_books";

const rootReducer = combineReducers({
    books: BooksReducer
});

export default rootReducer;
