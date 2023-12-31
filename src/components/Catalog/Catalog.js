import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { setSelectedItemId, setSearchValue, setSearchQuery } from "../../store/catalogSlice";
import { useGetCategoriesQuery, useGetItemsQuery } from "../../store";
import { Loader } from "../../components";

export function Catalog({ searchPanel = false }) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);

  const { searchValue, searchQuery } = useSelector((state) => state.catalog);

  const { pathname } = useLocation();

  const dispath = useDispatch();

  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: currentItems = [], isFetching: isFetching, isSuccess } = useGetItemsQuery(`items?categoryId=${selectedCategory}&offset=${offset}&q=${searchQuery}`);
  const { data: nextItems = [], isFetching: isFetchingNextItems } = useGetItemsQuery(`items?categoryId=${selectedCategory}&offset=${offset + 6}&q=${searchQuery}`);

  useEffect(() => {
    if (pathname === '/') {
      dispath(setSearchValue(''));
      dispath(setSearchQuery(''));
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      let newItems = [];
      if (items.length === 0) {
        newItems = [...currentItems];
      } else {
        newItems = [...items, ...nextItems];
      }
      setItems(newItems);
    }
  }, [currentItems]);

  useEffect(() => {
    nextItems.length === 0 ? setIsLoadMore(false) : setIsLoadMore(true);
  }, [nextItems]);

  useEffect(() => {
    if (searchValue === '' && searchQuery) {
      setItems([]);
      setOffset(0);
      setIsLoadMore(false);
      if (items.length === 0) {
        dispath(setSearchQuery(''));
      }
    }
  }, [searchValue, items]);

  const handleChangeCategory = (e) => {
    setItems([]);
    setOffset(0);
    setSelectedCategory(Number(e.target.id));
  }

  const handleLoadMore = () => {
    setOffset(offset + 6);
    setIsLoadMore(false);
  }

  const handleChange = (e) => {
    dispath(setSearchValue(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue && searchValue !== searchQuery) {
      setItems([]);
      setOffset(0);
      setIsLoadMore(false);
      dispath(setSearchQuery(searchValue));
    }
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {searchPanel && <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Поиск" value={searchValue} onChange={handleChange} />
      </form>}
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <Link
            id="0"
            className={selectedCategory === 0 ? "nav-link active" : "nav-link"}
            onClick={handleChangeCategory}>
            Все
          </Link>
        </li>
        {categories.map(category =>
          <li className="nav-item" key={category.id}>
            <Link
              id={category.id}
              className={selectedCategory === category.id ? "nav-link active" : "nav-link"}
              onClick={handleChangeCategory}>
              {category.title}
            </Link>
          </li>
        )}
      </ul>
      {isFetching && offset === 0 ?
        <Loader />
        :
        <>
          <div className="row">
            {items?.map(item => (
              <div key={item.id} className="col-4">
                <div className="card">
                  <img src={item.images[0]}
                    className="card-img-top img-fluid" alt={item.title} />
                  <div className="card-body">
                    <div>
                      <p className="card-text">{item.title}</p>
                      <p className="card-text">{item.price} руб.</p>
                    </div>
                    <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary" onClick={() => dispath(setSelectedItemId(item.id))}>Заказать</Link>
                  </div>
                </div>
              </div>
            ))
            }
          </div>
          {isFetchingNextItems ?
            <Loader />
            : isLoadMore &&
            <div className="text-center">
              <button className="btn btn-outline-primary" onClick={handleLoadMore}>Загрузить ещё</button>
            </div>
          }
        </>
      }
    </section>
  );
}