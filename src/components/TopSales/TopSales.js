import { Link } from "react-router-dom";
import { useGetTopSalesQuery } from "../../store";

export function TopSales() {
  const { data: topSalesProducts = [], isLoading } = useGetTopSalesQuery();

  return (
    <>
      {topSalesProducts.length > 0 &&
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          {isLoading ?
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
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
                      <Link to="/products/1.html" className="btn btn-outline-primary">Заказать</Link>
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
