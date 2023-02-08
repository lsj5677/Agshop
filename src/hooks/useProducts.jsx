import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getProducts as fetchProducts,
  addProduct,
  updateProduct,
  removeProduct,
} from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const getProducts = useQuery(["products"], fetchProducts, {
    staleTime: 1000 * 60,
  });

  const addNewProduct = useMutation(
    ({ product, url }) => addProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );

  const updatedProduct = useMutation(
    ({ product, url }) => updateProduct(product, url),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );

  const removedProduct = useMutation((id) => removeProduct(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return { getProducts, addNewProduct, updatedProduct, removedProduct };
}
