import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";


import { addItemToCart, setTotalCost } from "../../store/catalogSlice";
import { useGetItemByIdQuery } from "../../store";

export const ItemPage = () => {

  const selectedItemId = useSelector((state) => state.catalog.selectedItemId);
  const { data: item = {}, isLoading } = useGetItemByIdQuery(selectedItemId);

  const dispath = useDispatch();

  const [selectedSize, setSelectedSize] = useState('');
  const [itemCount, setItemCount] = useState(1);

  const handleChangeSelectedSize = (e) => {
    setSelectedSize(e.target.id);
  }

  const handleAddItemToCart = (item) => () => {
    const { id, color, title, price } = item;
    dispath(addItemToCart({ id, title, color, price, selectedSize, itemCount }));
    dispath(setTotalCost(price * itemCount))
  }

  return (
    <>
      {isLoading ?
        <div className="preloader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        :
        <section className="catalog-item">
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item.images[0]}
                className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item.id}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              {item.sizes.some((size) => size.available === true) &&
                <>
                  <div className="text-center">
                    <p>Размеры в наличии:
                      {item.sizes.map((size) => size.available &&
                        <span
                          className={selectedSize === size.size ? "catalog-item-size selected" : "catalog-item-size"}
                          id={size.size}
                          key={size.size}
                          onClick={handleChangeSelectedSize}>
                          {size.size}
                        </span>)}
                    </p>
                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={() => itemCount > 1 && setItemCount(itemCount - 1)}>-</button>
                      <span className="btn btn-outline-primary">{itemCount}</span>
                      <button className="btn btn-secondary" onClick={() => itemCount < 10 && setItemCount(itemCount + 1)}>+</button>
                    </span>
                    </p>
                  </div>
                  <Link to="/cart">
                    <button
                      className="btn btn-danger btn-block btn-lg"
                      disabled={!selectedSize}
                      onClick={handleAddItemToCart(item)}>
                      В корзину
                    </button>
                  </Link>
                </>
              }
            </div>
          </div>
        </section>
      }
    </>
  )
}