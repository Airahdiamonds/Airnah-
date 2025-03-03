import React, { useEffect, useState } from 'react'
import diamondImage from '../assets/ring2.jpg'
import diamondHoverImage from '../assets/Wedding-rings.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/userProductsSlice'
import { convertPrice } from '../utils/helpers'
import { StarRating } from '../components/StarRating'
import { useNavigate } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useUser } from '@clerk/clerk-react'
import {
	addToFavorites,
	fetchUserFavorites,
	removeFromFavorites,
} from '../redux/favoritesCartSlice'

const filterOptions = [
	{ label: 'Diamond Type', options: ['All', 'Natural', 'Lab Grown'] },
	{ label: 'Budget', options: ['All Budgets'] },
	{ label: 'Style', options: ['All Ring Styles'] },
	{ label: 'Shape', options: ['All Diamond Shapes'] },
	{ label: 'Metal', options: ['All Metal Types'] },
	{ label: 'Total Carat', options: ['View All'] },
]

export default function ProductGrid() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { products } = useSelector((state) => state.userProducts)
	const { currency, country, INR_rate, GBP_rate } = useSelector(
		(state) => state.localization
	)
	const { user } = useUser()
	const dbId = user?.publicMetadata?.dbId
	const [hoveredImage, setHoveredImage] = useState(null)
	const [favoriteStatus, setFavoriteStatus] = useState({})

	useEffect(() => {
		if (dbId) {
			dispatch(fetchProducts(dbId))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbId, dispatch])

	useEffect(() => {
		const favStatus = {}
		products.forEach((product) => {
			favStatus[product.product_id] = product.favorite_id !== null
		})
		console.log(products)
		console.log(favStatus)
		setFavoriteStatus(favStatus)
	}, [products])

	const handleClick = (product_id) => {
		navigate('/products/' + product_id)
	}

	const handleFavorite = (e, product_id, favorite_id) => {
		e.stopPropagation()

		const isCurrentlyFavorite = favoriteStatus[product_id]

		if (isCurrentlyFavorite) {
			dispatch(
				removeFromFavorites({ userId: dbId, productId: favorite_id })
			).then(() => {
				dispatch(fetchProducts(dbId)) // ✅ Re-fetch products after updating favorites
				dispatch(fetchUserFavorites(dbId))
			})
		} else {
			dispatch(addToFavorites({ dbId, product_id })).then(() => {
				dispatch(fetchProducts(dbId)) // ✅ Re-fetch products after adding to favorites
			})
		}
	}

	// const handleFavorite = (e, product_id, favorite_id) => {
	// 	e.stopPropagation()

	// 	const isCurrentlyFavorite = favoriteStatus[product_id]

	// 	if (isCurrentlyFavorite) {
	// 		dispatch(removeFromFavorites({ userId: dbId, productId: favorite_id }))
	// 		dispatch(fetchUserFavorites(dbId))
	// 	} else {
	// 		dispatch(addToFavorites({ dbId, product_id }))
	// 	}

	// 	// Toggle favorite status locally
	// 	setFavoriteStatus((prev) => ({
	// 		...prev,
	// 		[product_id]: !isCurrentlyFavorite,
	// 	}))
	// }

	return (
		<div className="min-h-screen bg-white flex flex-col items-center">
			<h1 className="text-3xl font-bold text-black">
				READY TO SHIP DIAMOND ENGAGEMENT RINGS
			</h1>
			<p className="text-lg text-black mb-6">
				Browse our collection of ready to ship diamond engagement rings.
			</p>

			<div className="flex flex-wrap justify-center gap-4 mb-6">
				{filterOptions.map((option, index) => (
					<select
						key={index}
						className="p-2 border rounded-lg bg-white text-[#be9080] border-[#be9080]"
					>
						<option>{option.label}</option>
						{option.options.map((opt, idx) => (
							<option key={idx}>{opt}</option>
						))}
					</select>
				))}
			</div>

			<main className="flex-1 w-full  p-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
					{products.map((product, index) => (
						<button
							onClick={() => handleClick(product.product_id)}
							key={product.product_id}
							className="bg-white shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-xl border border-[#be9080]"
						>
							<div
								className="absolute bottom-28 right-4 text-2xl cursor-pointer text-[#be9080]"
								onClick={(e) =>
									handleFavorite(e, product.product_id, product.favorite_id)
								}
							>
								{favoriteStatus[product.product_id] ? (
									<FaHeart className="text-red-500" />
								) : (
									<FaRegHeart />
								)}
							</div>
							<img
								src={hoveredImage === index ? diamondHoverImage : diamondImage}
								alt={product.name}
								className="w-full h-72 object-cover border-b border-[#be9080] transition duration-1000 ease-in-out"
								onMouseEnter={() => setHoveredImage(index)}
								onMouseLeave={() => setHoveredImage(null)}
							/>
							<div className="p-4">
								<h2 className="text-xl font-light mb-2 text-[#be9080]">
									{product.name}
								</h2>
								<p className="text-[#be9080] mb-4 text-lg font-light">
									{currency}
									{convertPrice(
										product.total_cost,
										country,
										INR_rate,
										GBP_rate
									)}
								</p>
								<p className="text-[#be9080] mb-4 text-sm font-light">
									<div className="flex justify-center">
										<StarRating rating={product.average_rating || 0} /> (
										{product.review_count})
									</div>
								</p>
							</div>
						</button>
					))}
				</div>
			</main>

			<footer className="w-full bg-white text-[#be9080] text-center py-6 mt-8">
				<p className="text-black">
					Diamond Engagement Rings - Viewable In 360° HD
				</p>
				<p className="text-black">
					Looking for engagement ring inspiration? Let our customers’ custom
					creations spur your imagination. Browse a huge selection of diamond
					engagement rings for women in every shape, style, and metal
					imaginable. And to top it all off, set the ring of your dreams with a
					sparkling natural or lab grown diamond.
				</p>
				<p className="text-black">Start designing your own engagement ring.</p>
			</footer>
		</div>
	)
}
