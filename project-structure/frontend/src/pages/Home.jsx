import React, { useState } from "react";
import { fetchAllBooks } from "../services/bookService";
import { toast } from "react-toastify";

const Home = () => {
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    try {
      const result = await fetchAllBooks();
      debugger;
      if (result.status === "success") {
        setBooks(result.data);
      }
      toast.success("books fetched successfully...");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="btn btn-outline-info "
          onClick={handleFetchBooks}
        >
          Fetch All Books
        </button>
      </div>

      {books.length > 0 && (
        <div className="d-flex justify-content-center mt-5">
          <table className="w-75 table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => {
                return (
                  <tr>
                    <td>{book.book_id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.price}</td>
                    <td>{book.stock}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Home;
