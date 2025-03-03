import { useDispatch, useSelector } from 'react-redux'
import {
	updateCustomization,
	setStep,
} from '../../redux/ringCustomizationSlice'
import Image from '../../assets/ring4.jpg'

const StepOne = () => {
	const dispatch = useDispatch()
	const metal = useSelector((state) => state.ringCustomization.metal)

	const productImages = {
		gold: 'https://via.placeholder.com/300x300?text=Gold+Ring',
		silver: 'https://via.placeholder.com/300x300?text=Silver+Ring',
		platinum: 'https://via.placeholder.com/300x300?text=Platinum+Ring',
	}

	return (
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
				<h2 className="text-2xl font-semibold">Solitaire Engagement Ring</h2>
				<p className="text-gray-600">
					Embellished With a Four Prong Signature Head
				</p>
				<div className="flex items-center space-x-1 text-yellow-500 text-lg">
					<span>☆</span> <span>☆</span> <span>☆</span> <span>☆</span>{' '}
					<span>☆</span>
					<span className="text-gray-600 ml-2">(123)</span>
				</div>
				<div className="text-xl font-bold text-gray-900">$870</div>
				<div className="text-lg text-red-500 font-semibold">$435</div>
				<p className="text-sm text-gray-500">(Setting Price)</p>
				<div className="border-t pt-4 space-y-2 text-gray-700">
					<p>
						<strong>Flexible Payment Options:</strong> Buy now pay later with{' '}
						<span className="text-blue-500 cursor-pointer">Klarna</span>{' '}
						<span className="text-sm text-gray-500">Learn More</span>
					</p>
					<button
						onClick={() => dispatch(setStep(2))}
						className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
					>
						Select This Setting
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
	)
}

export default StepOne
