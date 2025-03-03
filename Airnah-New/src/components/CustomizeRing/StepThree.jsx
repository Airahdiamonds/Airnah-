import { useDispatch, useSelector } from 'react-redux'
import {
	resetCustomization,
	updateTotalCost,
} from '../../redux/ringCustomizationSlice'
import Image from '../../assets/ring4.jpg'
import { useEffect } from 'react'
import { SignedIn, SignedOut, SignInButton, useUser } from '@clerk/clerk-react'
import { addToCart } from '../../redux/favoritesCartSlice'
import { useNavigate } from 'react-router-dom'

const StepThree = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { productDetails } = useSelector((state) => state.ringCustomization)
	const { user } = useUser()
	const dbId = user?.publicMetadata?.dbId

	console.log(productDetails[0].diamond.product_id)

	useEffect(() => {
		dispatch(
			updateTotalCost({
				total_cost:
					+productDetails[0].ring?.ring_price +
					+productDetails[0].diamond?.diamond_price,
			})
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleClick = () => {
		dispatch(
			addToCart({
				userId: dbId,
				productId: null,
				diamondId: productDetails[0].diamond?.product_id,
				ringStyleId: productDetails[0].ring?.product_id,
				quantity: 1,
			})
		)
		dispatch(resetCustomization())
		navigate('/cart')
	}

	return (
		<div className="flex flex-col md:flex-row items-center gap-8">
			{/* Left Side - Image Grid */}
			<div className="w-full md:w-3/5 grid grid-cols-2 gap-4">
				<img
					src={Image}
					alt="Ring Size 6"
					className="w-full h-auto rounded-lg shadow-md"
				/>
				<img
					src={Image}
					alt="Ring Size 7"
					className="w-full h-auto rounded-lg shadow-md"
				/>
				<img
					src={Image}
					alt="Ring Size 8"
					className="w-full h-auto rounded-lg shadow-md"
				/>
				<img
					src={Image}
					alt="Ring Size Preview"
					className="w-full h-auto rounded-lg shadow-md"
				/>
			</div>

			{/* Right Side - Content */}
			<div className="w-full md:w-2/5 space-y-4">
				<h2 className="text-2xl font-semibold">Finalize</h2>
				<p className="text-gray-600">
					Ensure a perfect fit for your engagement ring.
				</p>
				<div className="border-t pt-4 space-y-2 text-gray-700">
					<SignedIn>
						<button
							onClick={handleClick}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
						>
							Add To Cart
						</button>
					</SignedIn>
					<SignedOut>
						<SignInButton>
							<button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
								Add To Cart
							</button>
						</SignInButton>
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default StepThree
