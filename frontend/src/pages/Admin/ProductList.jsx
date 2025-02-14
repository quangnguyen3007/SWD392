import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");  
  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

        // Kiểm tra các trường dữ liệu đầu vào
        if (!name || !description || !price || !category || !quantity || !brand) {
          toast.error("Please fill in all fields.");
          return;
        }
    
        // Thêm kiểm tra để đảm bảo price và quantity lớn hơn 0
        if (parseFloat(price) <= 0 || parseFloat(quantity) <= 0) {
          toast.error("Price and Quantity must be greater than 0.");
          return;
        }


    const productData = new FormData();
    productData.append("image", image);
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("brand", brand);  // Thêm brand vào form data

    try {
      const response = await createProduct(productData).unwrap();

      if (response.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${response.name} is created`);
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try Again.");
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto w-full h-[40%]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="text-white py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Image URL"}
              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="text-white"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="w-full md:w-1/2">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-full md:w-[35rem] border rounded-lg bg-white text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                    min="0.01"
                    step="0.01"
                  className="p-4 mb-3 w-full md:w-[35rem] border rounded-lg bg-white text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="w-full md:w-1/2">
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                   min="1"
                   step="1"
                  className="p-4 mb-3 w-full md:w-[35rem] border rounded-lg bg-white text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="brand">Brand</label> <br /> {/* Thêm trường brand */}
                <input
                  type="text"
                  className="p-4 mb-3 w-full md:w-[35rem] border rounded-lg bg-white text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <div className="w-full md:w-1/2">
                <label htmlFor="description">Description</label> <br />
                <textarea
                  type="text"
                  className="p-4 mb-3 w-full md:w-[35rem] border rounded-lg bg-white text-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="category">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-full md:w-[35rem] border rounded-lg bg-white text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
