import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { setSearchValue, setSearchQuery } from "../../store/catalogSlice";

export function SearchWidget() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchValue } = useSelector((state) => state.catalog);

  const { pathname } = useLocation();

  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/catalog') {
      setIsSearchOpen(false);
    }
  }, [pathname])

  const handleChange = (e) => {
    dispath(setSearchValue(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSearchOpen && searchValue) {
      dispath(setSearchQuery(searchValue));
      navigate('/catalog');
      setIsSearchOpen(false);
    } else if (pathname !== '/catalog') {
      setIsSearchOpen(isSearchOpen ? false : true);
    }
  }

  return (
    <>
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={handleSubmit}>
      </div>
      <form
        data-id="search-form"
        className={`header-controls-search-form form-inline ${!isSearchOpen && 'invisible'}`}
        onSubmit={handleSubmit}>
        <input className="form-control" placeholder="Поиск" value={searchValue} onChange={handleChange} />
      </form>
    </>
  );
}
