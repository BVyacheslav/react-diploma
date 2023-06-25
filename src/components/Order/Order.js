import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { setClearCart } from "../../store/catalogSlice";
import { usePostOrderMutation } from "../../store";

import { Loader } from "../Loader";

export function Order() {

  const cartItems = useSelector((state) => state.catalog.cartItems);

  const [postOrder, { isLoading, isError, isSuccess }] = usePostOrderMutation();

  const [phoneValue, setPhoneValue] = useState('');
  const [addressValue, setAddressValue] = useState('');

  const dispath = useDispatch();

  useEffect(() => { isSuccess && dispath(setClearCart()) }, [isSuccess]);

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

  return (
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
  );
}
