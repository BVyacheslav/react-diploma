import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setSelectedItemId } from "../../store/catalogSlice";
import { useGetTopSalesQuery } from "../../store";
import { Loader } from "../../components";

export function TopSales() {
  const { data: topSalesProducts = [], isLoading } = useGetTopSalesQuery();
  const dispath = useDispatch();

  return (
    <>
      {topSalesProducts.length > 0 &&
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {isLoading ?
            <Loader />
            :
            <div className="row">
              {topSalesProducts.map(product => (
                <div key={product.id} className="col-4">
                  <div className="card">
                    <img src={product.images[0]}
                      className="card-img-top img-fluid" alt={product.title} />
                    <div className="card-body">
                      <p className="card-text">{product.title}</p>
                      <p className="card-text">{product.price} руб.</p>
                      <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary" onClick={() => dispath(setSelectedItemId(product.id))}>Заказать</Link>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
          }
        </section>
      }
    </>
  );
}
