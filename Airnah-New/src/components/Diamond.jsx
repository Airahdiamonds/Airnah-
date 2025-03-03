import { useDispatch, useSelector } from "react-redux";
import { setStep, updateDiamondDetails } from "../redux/ringCustomizationSlice";
import Image from "../assets/ring4.jpg";
import Image2 from "../assets/Wedding-rings.jpg";

import { useEffect, useState } from "react";
import { getDiamond } from "../utils/api";
import { convertPrice } from "../utils/helpers";

function Diamond() {
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.ringCustomization);
  const { currency, country, INR_rate, GBP_rate } = useSelector(
    (state) => state.localization
  );

  const [product, setProduct] = useState(null);

  useEffect(() => {
    getDiamond(productDetails[0].diamond?.product_id).then((res) => {
      setProduct(res.data[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    dispatch(
      updateDiamondDetails({
        diamond_price: +product.price,
      })
    );
    dispatch(setStep(2));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 h-screen overflow-hidden w-full">
      {/* Left Side - Image Grid */}
      <div className="w-full md:w-3/5 flex-grow overflow-y-auto h-full ">
        <div className="grid grid-cols-2 gap-4 ">
          <img src={Image} alt="Ring 1" className="w-full h-100 shadow-md" />
          <img src={Image2} alt="Ring 2" className="w-full h-100 shadow-md" />
          <img src={Image2} alt="Ring 3" className="w-full h-100 shadow-md" />
          <img src={Image} alt="Ring 4" className="w-full h-100 shadow-md" />
          <img src={Image} alt="Ring 3" className="w-full h-100 shadow-md" />
          <img src={Image2} alt="Ring 4" className="w-full h-100 shadow-md" />
          {/* Add more images as needed */}
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-2/5 border border-[#bf927f] p-8 space-y-4 bg-white flex flex-col max-h-fit">
        <h2 className="text-4xl special">{product?.name}</h2>
        <p className="text-gray-600">{product?.description}</p>
        <div className="text-2xl font-light text-green-900">
          {currency}
          {convertPrice(product?.price, country, INR_rate, GBP_rate)}
        </div>
        <div className="space-y-4 text-gray-700">
          <div className="bg-gray-100 p-4">
            <div className="text-base text-gray-700">
              Flexible Payment Options:
            </div>
            <div className="text-base text-gray-700">
              3 Interest-Free Payments of $600
            </div>
            <div className="text-sm text-blue-500 cursor-pointer">
              Learn More
            </div>
          </div>

          <button
            onClick={handleClick}
            className="px-6 py-2 text-lg w-full h-16 bg-[#c9a992] text-white rounded-sm shadow-md hover:bg-[#bf927f] active:bg-[#a8826c]"
          >
            Select This Diamond
          </button>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            <strong>Ships by:</strong> Friday, February 28
          </p>
        </div>

        <div className="text-sm text-gray-900 space-y-2">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l7 4v6c0 5-4 9-7 10-3-1-7-5-7-10V6l7-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span>Risk-Free Retail</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 16v-8h13v8" />
              <path d="M16 16h2.5l3.5-3.5v-4.5h-6" />
              <circle cx="6.5" cy="16.5" r="2.5" />
              <circle cx="16.5" cy="16.5" r="2.5" />
            </svg>
            <span className="underline">
              Free Overnight Shipping, Hassle-Free Returns
            </span>
          </div>
        </div>

        {/* Advertisement / Customization Box */}
        <div className="w-full h-32 bg-gray-200 flex items-center justify-center mt-6 border border-gray-300">
          <p className="text-gray-600 text-center">
            Your Ad / Customization Box
          </p>
        </div>
      </div>
    </div>
  );
}

export default Diamond;
