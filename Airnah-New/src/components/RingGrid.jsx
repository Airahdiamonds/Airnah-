import { useEffect, useState } from "react";
import diamondImage from "../assets/ring2.jpg";
import diamondHoverImage from "../assets/Wedding-rings.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllStyles } from "../utils/api";
import {
  setShowRing,
  updateRingDetails,
} from "../redux/ringCustomizationSlice";
import { convertPrice } from "../utils/helpers";

function RingGrid() {
  const dispatch = useDispatch();
  const { currency, country, INR_rate, GBP_rate } = useSelector(
    (state) => state.localization
  );
  const [rings, setRings] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    getAllStyles().then((res) => {
      setRings(res.data);
    });
  }, []);

  const handleClick = (product_id) => {
    dispatch(updateRingDetails({ product_id: product_id }));
    dispatch(setShowRing(true));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center">
        <main className="flex-1 w-full  p-8">
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
  {rings.map((product, index) => (
    <button
      onClick={() => handleClick(product.ring_style_id)}
      key={product.ring_style_id}
      className="bg-white shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl border border-[#be9080] w-96 h-128 rounded-lg overflow-hidden"
    >
      <img
        src={hoveredImage === index ? diamondHoverImage : diamondImage}
        alt={product.name}
        className="w-full h-96 object-cover border-b border-[#be9080] transition duration-1000 ease-in-out"
        onMouseEnter={() => setHoveredImage(index)}
        onMouseLeave={() => setHoveredImage(null)}
      />
      <div className="flex flex-col items-center">
        <div className="w-full pt-2">
          <h2 className="text-lg font-light text-[#be9080]">
            {product.name}
          </h2>
        </div>
        <div className="w-full pt-2">
          <p className="text-[#be9080] text-xl font-light mb-2">
            {currency}
            {convertPrice(
              Number(product.head_style_price) +
                Number(product.head_metal_price) +
                Number(product.shank_style_price) +
                Number(product.shank_metal_price),
              country,
              INR_rate,
              GBP_rate
            )}
          </p>
        </div>
      </div>
    </button>
  ))}
</div>
        </main>
      </div>
    </>
  );
}

export default RingGrid;
