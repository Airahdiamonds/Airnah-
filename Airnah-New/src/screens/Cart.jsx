import { useEffect } from 'react'
import { useUser, SignInButton } from '@clerk/clerk-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserCartItems, removeFromCart } from '../redux/favoritesCartSlice'
import { convertPrice } from '../utils/helpers'
import { setCustomization } from '../redux/ringCustomizationSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
	const { user, isSignedIn } = useUser()
	const { currency, country, INR_rate, GBP_rate } = useSelector(
		(state) => state.localization
	)
	const dbId = user?.publicMetadata?.dbId
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { cartItems, loading } = useSelector((state) => state.favoritesCart)

	useEffect(() => {
		if (isSignedIn && dbId) {
			dispatch(fetchUserCartItems(dbId))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleRemove = (productId) => {
		dispatch(
			removeFromCart({
				userId: dbId,
				productId,
			})
		)
		dispatch(fetchUserCartItems(dbId))
	}

	const handleView = (item) => {
		dispatch(
			setCustomization({
				diamond: {
					product_id: item.diamond_id,
					diamond_price: item.diamond_price,
				},
				ring: {
					product_id: item.ring_style_id,
					ring_price: item.ring_style_price,
				},
				total_cost: +item.diamond_price + +item.ring_style_price,
			})
		)
		navigate('/customize')
	}

	if (!isSignedIn) {
		return (
			<div className="h-80 flex flex-col items-center justify-center bg-gray-50">
				<h2 className="text-2xl font-semibold text-gray-700 mb-4">
					Please log in to view your cart
				</h2>
				<SignInButton mode="modal">
					<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
						Log In
					</button>
				</SignInButton>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<h1 className="text-3xl font-bold text-gray-800 mb-8">
				My Cart (
				{cartItems.length === 1
					? `${cartItems.length} Item`
					: `${cartItems.length} Items`}
				)
			</h1>

			{loading ? (
				<p>Loading Cart...</p>
			) : cartItems?.length === 0 ? (
				<p className="text-gray-600">Your Cart is empty.</p>
			) : (
				<div className="grid grid-cols-1 gap-8">
					{cartItems?.map((item) =>
						item.product_id !== null ? (
							<div
								key={item.product_id}
								className="bg-white w-1/3 ms-16 shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
							>
								<div className="p-4 bg-gray-100 border-b">
									<img
										src={item.product_image}
										alt="Product"
										className="w-full h-40 object-cover rounded-md mb-2"
									/>
									<h2 className="text-lg font-semibold text-gray-800">
										{item.product_name}
									</h2>
								</div>
								<div className="p-4 border-b">
									<p className="text-gray-600 text-sm">Total</p>
									<p className="text-xl font-bold text-blue-600">
										{currency}
										{convertPrice(
											item.product_price,
											country,
											INR_rate,
											GBP_rate
										)}
									</p>
									<div className="flex justify-center">
										<button
											onClick={() => handleView(item)}
											className="mt-4 w-1/2 mx-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
										>
											View
										</button>
										<button
											onClick={() => handleRemove(item.cart_id)}
											className="mt-4 w-1/2 mx-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
										>
											Remove from Cart
										</button>
									</div>
								</div>
							</div>
						) : (
							<div
								key={item.cart_id}
								className="bg-white w-1/3 ms-16 shadow-md rounded-lg overflow-hidden transition hover:shadow-lg"
							>
								{/* Upper Part - Diamond */}
								<div className="p-4 bg-gray-100 border-b">
									<img
										src={item.diamond_image}
										alt="Diamond"
										className="w-full h-40 object-cover rounded-md mb-2"
									/>
									<h2 className="text-lg font-semibold text-gray-800">
										{item.diamond_name}
									</h2>
									<p className="text-xl font-bold text-blue-600">
										{currency}
										{convertPrice(
											item.diamond_price,
											country,
											INR_rate,
											GBP_rate
										)}
									</p>
								</div>
								{/* Lower Part - Ring */}
								<div className="p-4 border-b">
									<img
										src={item.ring_image}
										alt="Ring Style"
										className="w-full h-40 object-cover rounded-md mb-2"
									/>
									<h2 className="text-lg font-semibold text-gray-800">
										{item.ring_style_name}
									</h2>
									<p className="text-gray-600 text-sm">
										{item.ring_description}
									</p>
									<p className="text-xl font-bold text-blue-600">
										{currency}
										{convertPrice(
											item.ring_style_price,
											country,
											INR_rate,
											GBP_rate
										)}
									</p>
								</div>
								<div className="p-4 border-b">
									<p className="text-gray-600 text-sm">Total</p>
									<p className="text-xl font-bold text-blue-600">
										{currency}
										{convertPrice(
											+item.ring_style_price + +item.diamond_price,
											country,
											INR_rate,
											GBP_rate
										)}
									</p>
									<div className="flex justify-center">
										<button
											onClick={() => handleView(item)}
											className="mt-4 w-1/2 mx-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
										>
											View
										</button>
										<button
											onClick={() => handleRemove(item.cart_id)}
											className="mt-4 w-1/2 mx-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
										>
											Remove from Cart
										</button>
									</div>
								</div>
							</div>
						)
					)}
				</div>
			)}
		</div>
	)
}

// eslint-disable-next-line no-lone-blocks
{
	/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		{cartItems?.map((item) => (
			<div
				key={item.id}
				className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
			>
				<img
					src={item.image}
					alt={item.name}
					className="w-full h-40 object-cover rounded-lg mb-4"
				/>
				<h2 className="text-lg font-semibold text-gray-800">
					{item.product_name}
				</h2>
				<p className="text-gray-600 mb-2">{item.description}</p>
				<p className="text-xl font-bold text-blue-600">${item.price}</p>
				<button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
					Remove from Cart
				</button>
			</div>
		))}
	</div> */
}

export default Cart
