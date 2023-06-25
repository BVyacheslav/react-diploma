import { Routes, Route } from "react-router-dom";
import './App.css';
import { Footer, Header, Banner } from './components';
import { AboutPage, CartPage, CatalogPage, ContactsPage, HomePage, ItemPage, Page404 } from "./pages";

function App() {

  return (
    <div className="App">
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Routes>
              <Route path="/" exact element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/catalog/:itemId" element={<ItemPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
