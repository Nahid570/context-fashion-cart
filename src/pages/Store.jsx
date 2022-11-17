import { useContext } from "react";
import ProductCard from "../componenets/ProductCard";
import { CartContext } from "../context/cart/CartContext";
import { products } from "../data";

const Store = () => {
  const { search } = useContext(CartContext);
  return (
    <main className="px-12 py-5 mt-[64px] dark:bg-slate-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold dark:text-green-500">Browse the Store!</h1>
        <p className="text-xl dark:text-green-400">
          New Arrivals for you! Check out our selection of products.
        </p>
      </div>
      <div className="mt-5 grid grid-cols-16 gap-7 min-h-[calc(100vh-64px)]">
        {products.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        ).length ? (
          products
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <div className="mt-5 flex justify-start">
            <p className="text-3xl font-extrabold dark:text-green-500">Oops, No Product Found!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Store;
