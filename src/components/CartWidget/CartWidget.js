import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function CartWidget() {
  const cartItems = useSelector((state) => state.catalog.cartItems);

  return (
    <Link to={`/cart`}>
      <div className="header-controls-pic header-controls-cart">
        {cartItems.length > 0 && <div className="header-controls-cart-full">{cartItems.length}</div>}
        <div className="header-controls-cart-menu"></div>
      </div>
    </Link>
  );
}
