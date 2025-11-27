import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Catalogue.css";

function Catalogue() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchBooks();
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addToCart = (book) => {
    const existingItem = cart.find((item) => item._id === book._id);
    let newCart;

    if (existingItem) {
      newCart = cart.map((item) =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...book, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));

    // Show toast notification
    setToastMessage(`${book.title} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const removeFromCart = (bookId) => {
    const newCart = cart.filter((item) => item._id !== bookId);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    const newCart = cart.map((item) =>
      item._id === bookId ? { ...item, quantity: newQuantity } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setToastMessage("Your cart is empty!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setShowCheckoutModal(true);
  };

  const confirmCheckout = () => {
    // Clear cart after checkout
    setCart([]);
    localStorage.removeItem("cart");
    setShowCheckoutModal(false);
    setShowCart(false);
    setToastMessage("Order placed successfully! Thank you for your purchase.");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="catalogue-container">
      {showToast && <div className="toast-notification">{toastMessage}</div>}

      {showCheckoutModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCheckoutModal(false)}
        >
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Summary</h2>
              <button
                className="modal-close"
                onClick={() => setShowCheckoutModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="order-items">
                {cart.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="order-item-info">
                      <h4>{item.title}</h4>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="order-item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <h3>Total: ₹{getTotalPrice()}</h3>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowCheckoutModal(false)}
              >
                Cancel
              </button>
              <button className="btn-confirm" onClick={confirmCheckout}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="catalogue-header">
        <h1>Book Catalogue</h1>
        <button
          className="cart-toggle-btn"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Cart ({getTotalItems()})
        </button>
      </div>

      {showCart && (
        <div className="cart-panel">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="close-cart" onClick={() => setShowCart(false)}>
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item._id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.title}</h4>
                      <p>₹{item.price}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total: ₹{getTotalPrice()}</h3>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <img
              src={
                book.image ||
                "https://via.placeholder.com/200x300?text=" +
                  encodeURIComponent(book.title)
              }
              alt={book.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/200x300/667eea/ffffff?text=" +
                  encodeURIComponent(book.title);
              }}
            />
            <h3>{book.title}</h3>
            <p className="author">{book.author}</p>
            <p className="price">₹{book.price}</p>
            <button className="add-to-cart-btn" onClick={() => addToCart(book)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogue;
