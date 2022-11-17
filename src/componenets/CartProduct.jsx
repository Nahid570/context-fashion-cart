import { FiPlusCircle, FiMinusCircle, FiTrash2 } from "react-icons/fi";
import { useContext } from "react";
import { CartContext } from "../context/cart/CartContext";

const CartProduct = ({ product }) => {
  const { increseCart, decreseCart, removeItemFromCart } =
    useContext(CartContext);
  return (
    <div key={product.id}>
      <div className="bg-gray-300 dark:bg-gray-700 h-[0.5px] w-[100%]"></div>
      <div className="flex justify-between p-1 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-[100px] h-[100px] flex-[2] object-contain"
        />
        <div className="flex-[2] text-center">
          <p className="text-xl font-semibold dark:text-green-500">{product.name}</p>
          <p className="text-xl font-bold dark:text-green-400">${product.price}</p>
        </div>
        <div className={`flex items-center gap-5 flex-[2] justify-center`}>
          <FiPlusCircle
            size="1.5rem"
            className="cursor-pointer dark:text-white"
            onClick={() => increseCart(product)}
          />
          <p className="text-2xl font-semibold dark:text-green-400">{product?.newQuantity}</p>
          <FiMinusCircle
            size="1.5rem"
            className="cursor-pointer dark:text-white"
            onClick={() => decreseCart(product)}
          />
        </div>
        <FiTrash2
          size="1.5rem"
          className="cursor-pointer flex-1 dark:text-white"
          onClick={() => removeItemFromCart(product)}
        />
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 h-[0.5px] w-[100%]"></div>
    </div>
  );
};

export default CartProduct;
