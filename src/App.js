import { Routes, Route } from "react-router-dom";
import './App.css';
import { Header } from './components';
import { AboutPage, CartPage, CatalogPage, ContactsPage, HomePage, Page404 } from "./pages";

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
