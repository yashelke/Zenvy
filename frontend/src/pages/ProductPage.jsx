import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CartData } from "@/context/CartContext";
import { ProductData } from "@/context/ProductContext.jsx";
import { UserData } from "@/context/UserContext.jsx";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { fetchProduct, product, relatedProduct, loading } = ProductData();

  const { addToCart } = CartData();

  const { isAuth} = UserData();

  const { id } = useParams();

  console.log(product);
  console.log(relatedProduct);


  const addToCartHandler = () => {
    // add to cart function
    addToCart(product);
  };

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return (
    <>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="container mx-auto px-4 py-8 ">
            {product && (
              <div className="flex flex-col lg:flex-row items-start gap-14">
                <div className="w-full sm:w-[400px] md:w-[650px] relative">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.images &&
                        product.images.map((image, index) => {
                          return (
                            <CarouselItem key={index}>
                              <img
                                src={image.url}
                                alt="image"
                                className="w-full rounded-md"
                              />
                            </CarouselItem>
                          );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />    
                  </Carousel>
                </div>

                <div className="w-full lg:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold">{product.title}</h1>
                <p className="text-lg">{product.about}</p>
                <p className="text-xl font-semibold">₹ {product.price}</p>
                {

                    isAuth ?  <>
                    {product.stock <= 0 ? <p className="text-red-600 text-2xl bg-red-100 w-full text-center py-2">Out of Stock !</p>
                    : (
                        <Button onClick={addToCartHandler} className="rounded-2xl bg-blue-500 hover:bg-blue-600  dark:text-white font-semibold">Add to Cart</Button>
                    )}
                    
                    </>: <p className="text-blue-500">Please Login to Add to Cart </p>
                }

                
                </div>
              </div>
            )}{" "}
          </div>
        )}

        {/* to display related products */}

        {relatedProduct ?.length>0 && <div className="mt-12">
            <h2 className="text-xl font-bold">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {relatedProduct.map((e) =>{
                    return <ProductCard key={e._id} product={e} />;
                })}
            </div>
            </div>}


      </div>
    </>
  );
};

export default ProductPage;
