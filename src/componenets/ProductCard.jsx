import { useContext } from "react";
import { CartContext } from "../context/cart/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const isInCart = cartItems?.find((item) => item.id === product.id);

  return (
    <div className="flex gap-4 flex-col border border-gray-200 dark:border-gray-700 p-6">
      <img
        src={product.image}
        alt={product.name}
        className="max-h-[200px] object-contain"
      />
      <div>
        <p className="text-lg dark:text-green-500">{product.name}</p>
        <p className="text-2xl font-semibold dark:text-green-400">
          ${product.price}
        </p>
      </div>
      <div className="text-right">
        {!isInCart ? (
          <button
            className="p-2 w-[150px] border-[2px] border-black bg-transparent hover:bg-gray-100 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-white dark:hover:font-extrabold transition-all duration-500 text-lg"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        ) : (
          <button
            className="p-2 w-[150px] border-[2px] border-black bg-gray-300 0 text-lg cursor-not-allowed dark:bg-green-500 dark:text-white dark:font-extrabold dark:border-green-400"
            onClick={() => addToCart(product)}
          >
            Added
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
