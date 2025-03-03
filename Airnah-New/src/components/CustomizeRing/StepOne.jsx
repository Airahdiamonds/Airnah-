import { useDispatch, useSelector } from 'react-redux'
import { setShowDiamond } from '../../redux/ringCustomizationSlice'
import DiamondGrid from '../DiamondGrid'
import Diamond from '../Diamond'

const StepOne = () => {
	const dispatch = useDispatch()
	const { showDiamond } = useSelector((state) => state.ringCustomization)

	return (
		<div className="flex flex-col items-center gap-2 p-2 min-h-screen text-black">
			{showDiamond ? (
				<>
					<button
						className="justify-start w-full flex ms-20"
						onClick={() => dispatch(setShowDiamond(false))}
					>
						{'< '}
						Go back to diamonds
					</button>
					<Diamond />
				</>
			) : (
				<>
					<DiamondGrid />
				</>
			)}
		</div>
	)
}

export default StepOne
