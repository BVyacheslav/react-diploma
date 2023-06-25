import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteItemFromCart, setTotalCost } from "../../store/catalogSlice";
import { Order } from "../../components";

export const CartPage = () => {

  const cartItems = useSelector((state) => state.catalog.cartItems);
  const totalCost = useSelector((state) => state.catalog.totalCost);

  const dispath = useDispatch();

  const handleDeleteFromCart = (item) => () => {
    const { id, price, itemCount, selectedSize } = item;
    dispath(deleteItemFromCart({ id, selectedSize }));
    dispath(setTotalCost(-price * itemCount))
  }

  return <>
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, i) => (
            <tr key={item.id + item.selectedSize}>
              <td scope="row">{i + 1}</td>
              <td><Link to={`/catalog/${item.id}`}>{item.title}</Link></td>
              <td>{item.selectedSize}</td>
              <td>{item.itemCount}</td>
              <td>{item.price}</td>
              <td>{item.price * item.itemCount}</td>
              <td><button className="btn btn-outline-danger btn-sm" onClick={handleDeleteFromCart(item)}>Удалить</button></td>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{totalCost} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <Order />
  </>
}