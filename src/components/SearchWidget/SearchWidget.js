import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setSearchValue, setSearchQuery } from "../../store/catalogSlice";

export function SearchWidget() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchValue } = useSelector((state) => state.catalog);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispath(setSearchValue(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(setSearchQuery(searchValue));
    navigate('/catalog');
  }

  const handleClick = () => {
    if (isSearchOpen && searchValue) {
      dispath(setSearchQuery(searchValue));
      navigate('/catalog');
    } else {
      setIsSearchOpen(isSearchOpen ? false : true);
    }
  }

  return (
    <>
      <div
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        onClick={handleClick}>
      </div>
      <form
        data-id="search-form"
        class={`header-controls-search-form form-inline ${!isSearchOpen && 'invisible'}`}
        onSubmit={handleSubmit}>
        <input class="form-control" placeholder="Поиск" value={searchValue} onChange={handleChange} />
      </form>
    </>
  );
}
