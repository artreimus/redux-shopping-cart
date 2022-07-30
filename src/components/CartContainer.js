import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../features/modal/modalSlice";

export default function CartContainer() {
  const dispatch = useDispatch();

  const { cartItems, total, amount } = useSelector((store) => store.cart);

  const cartItemsElements = cartItems.map((item) => {
    return <CartItem key={item.id} {...item} />;
  });

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      {/* <h3></h3> */}
      <header>
        <h2>Your bag</h2>
      </header>
      <div>{cartItemsElements}</div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total: <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          // onClick={() => {
          //   dispatch(clearCart());
          // }}
          onClick={() => dispatch(toggleModal({ type: "open" }))}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
}
