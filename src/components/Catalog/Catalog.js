import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetCategoriesQuery, useGetItemsQuery } from "../../store";

export function Catalog() {
  const { data: items = [], isLoading } = useGetItemsQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.text)
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <Link
            className={selectedCategory === 'Все' ? "nav-link active" : "nav-link"}
            onClick={handleChangeCategory}
          >Все</Link>
        </li>
        {categories.map(category =>
          <li className="nav-item" key={category.id}>
            <Link
              className={selectedCategory === category.title ? "nav-link active" : "nav-link"}
              onClick={handleChangeCategory}
            >{category.title}</Link>
          </li>
        )}
      </ul>
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
