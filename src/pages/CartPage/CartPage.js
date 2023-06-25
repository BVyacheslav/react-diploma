import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCart, setTotalCost } from "../../store/catalogSlice";

export const CartPage = () => {

  const cartItems = useSelector((state) => state.catalog.cartItems);
  const totalCost = useSelector((state) => state.catalog.totalCost);

  const dispath = useDispatch();

  const handleDeleteFromCart = (item) => () => {
    const { id, price, itemCount } = item;
    dispath(deleteItemFromCart(id));
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
            <tr key={item.id}>
              <td scope="row">{i + 1}</td>
              <td><a href="/products/1.html">{item.title}</a></td>
              <td>{item.selectedSize}</td>
              <td>{item.itemCount}</td>
              <td>{item.price}</td>
              <td>{item.price}</td>
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
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }} >
        <form className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone" placeholder="Ваш телефон" />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки" />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">Оформить</button>
        </form>
      </div>
    </section>
  </>
}