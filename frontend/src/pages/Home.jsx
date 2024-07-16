import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { AiOutlineShopping } from "react-icons/ai";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {/* {isError?.data.message || isError.error} */}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              <AiOutlineShopping size={26} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-[2rem] mx-[2rem]">
            {data.products.map((product) => (
              <div key={product._id} className="flex justify-center">
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}

      <footer className="bg-gray-800 text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p className="text-lg">Hotline: 1800-123-456</p>
          <p className="text-sm mt-2">
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
      </footer>

    </>
  );
};

export default Home;
