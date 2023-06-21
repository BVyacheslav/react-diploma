// export function Catalog() {
//   return (
//     <section className="catalog">
//       <h2 className="text-center">Каталог</h2>
//       <div className="preloader">
//         <span></span>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../../store";

export function Catalog() {
  const { data: items = [], isLoading } = useGetItemsQuery();

  return (
        <section className="catalog">
          <h2 className="text-center">Каталог</h2>
          {isLoading ?
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            :
            <div className="row">
              {items.map(product => (
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
  );
}
