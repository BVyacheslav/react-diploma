import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { deleteItemFromCart, setTotalCost, setClearCart } from "../../store/catalogSlice";
import { usePostOrderMutation } from "../../store";
import { Loader } from "../../components";

export const CartPage = () => {

  const cartItems = useSelector((state) => state.catalog.cartItems);
  const totalCost = useSelector((state) => state.catalog.totalCost);

  const [postOrder, { isLoading, isError, isSuccess }] = usePostOrderMutation();

  const [phoneValue, setPhoneValue] = useState('');
  const [addressValue, setAddressValue] = useState('');

  const dispath = useDispatch();

  useEffect(() => { isSuccess && dispath(setClearCart()) }, [isSuccess]);

  const handleDeleteFromCart = (item) => () => {
    const { id, price, itemCount, selectedSize } = item;
    dispath(deleteItemFromCart({ id, selectedSize }));
    dispath(setTotalCost(-price * itemCount))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = cartItems.map(({ id, price, itemCount }) => ({ id, price, count: itemCount }));
    postOrder({
      owner: {
        phone: phoneValue,
        address: addressValue
      },
      items
    })
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
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }} >
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input className="form-control" id="phone" placeholder="Ваш телефон" value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input className="form-control" id="address" placeholder="Адрес доставки" value={addressValue} onChange={(e) => setAddressValue(e.target.value)} />
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="agreement" />
            <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
          </div>
          <button type="submit" className="btn btn-outline-secondary" disabled={isLoading}>{isLoading ? 'Оформление...' : 'Оформить'}</button>
          {isLoading &&
            <Loader />
          }
          {isSuccess && <div style={{ color: 'green' }}>Заказ оформлен успешно</div>}
          {isError && <div style={{ color: 'red' }}>Ошибка при оформлении заказа</div>}
        </form>
      </div>
    </section>
  </>
}