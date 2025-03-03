import { useDispatch, useSelector } from 'react-redux'
import Image from '../assets/ring4.jpg'
import { useEffect, useState } from 'react'
import { getProduct } from '../utils/api'
import { convertPrice } from '../utils/helpers'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { addToCart } from '../redux/favoritesCartSlice'

function Product() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const { user } = useUser()
	const dbId = user?.publicMetadata?.dbId
	const { currency, country, INR_rate, GBP_rate } = useSelector(
		(state) => state.localization
	)
	const [product, setProduct] = useState(null)

	useEffect(() => {
		getProduct(id).then((res) => {
			setProduct(res.data[0])
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleClick = () => {
		dispatch(
			addToCart({
				userId: dbId,
				productId: product.product_id,
				diamondId: null,
				ringStyleId: null,
				quantity: 1,
			})
		)
		navigate('/cart')
	}

	return (
		<>
			<button
				className="justify-start w-full flex ms-20"
				onClick={() => navigate('/product')}
			>
				{'< '}
				Go back to Products
			</button>
			<div className="flex flex-col md:flex-row items-center gap-8">
				{/* Left Side - Image Grid */}
				<div className="w-full md:w-3/5 grid grid-cols-2 gap-4">
					<img
						src={Image}
						alt="Ring 1"
						className="w-full h-auto rounded-lg shadow-md"
					/>
					<img
						src={Image}
						alt="Ring 2"
						className="w-full h-auto rounded-lg shadow-md"
					/>
					<img
						src={Image}
						alt="Ring 3"
						className="w-full h-auto rounded-lg shadow-md"
					/>
					<img
						src={Image}
						alt="Ring 4"
						className="w-full h-auto rounded-lg shadow-md"
					/>
				</div>

				{/* Right Side - Content */}
				<div className="w-full md:w-2/5 space-y-4">
					<h2 className="text-2xl font-semibold">{product?.name}</h2>
					<p className="text-gray-600">{product?.description}</p>
					<div className="text-xl font-bold text-gray-900">
						{currency}
						{convertPrice(product?.total_cost, country, INR_rate, GBP_rate)}
					</div>
					{/* <div className="text-lg text-red-500 font-semibold">$435</div> */}
					<p className="text-sm text-gray-500">(Setting Price)</p>
					<div className="border-t pt-4 space-y-2 text-gray-700">
						<p>
							<strong>Flexible Payment Options:</strong> Buy now pay later with{' '}
							<span className="text-blue-500 cursor-pointer">Klarna</span>{' '}
							<span className="text-sm text-gray-500">Learn More</span>
						</p>
						<button
							onClick={handleClick}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
						>
							Add to Cart
						</button>
					</div>
					<div className="text-sm text-gray-600">
						<p>
							<strong>Real-Time Ring Inspection</strong>
						</p>
						<p>
							<strong>Ships by:</strong> Friday, February 28
						</p>
					</div>
					<div className="text-sm text-gray-700 border-t pt-4">
						<p className="font-semibold">Risk-Free Retail</p>
						<p>✔ Free 2-Day Shipping, Hassle-Free Returns</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Product
