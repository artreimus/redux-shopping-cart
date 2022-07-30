import React from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function Modal() {
  const dispatch = useDispatch();

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all your items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(toggleModal({ type: "close" }));
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(toggleModal({ type: "close" }))}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}
