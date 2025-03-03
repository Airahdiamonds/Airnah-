import React from 'react'
import heroImage from '../../src/assets/j.jpeg' // Import the hero image
import diamondImage from '../../src/assets/d.jpeg' // Import the diamond image
import engagementRingImage from '../../src/assets/d.jpeg' // Import the engagement ring image
import weddingRingImage from '../../src/assets/d.jpeg' // Import the wedding ring image
import jewelryImage from '../../src/assets/d.jpeg' // Import the jewelry image
import gemstoneImage from '../../src/assets/d.jpeg' // Import the gemstone image

const HeroSection = () => {
	return (
		<section className="relative overflow-hidden">
			<div className="container w-full max-w-full">
				<div className="relative">
					{/* Full-width Image */}
					<img
						src={heroImage} // Use the imported hero image
						alt="Jewelry Education"
						className="w-full h-auto"
					/>
					{/* Overlay Text on the Left */}
					<div className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center text-black">
						<h1 className="text-4xl md:text-5xl font-bold text-center">
							BECOME AN EXPERT WITH OUR JEWELRY EDUCATION
						</h1>
					</div>
				</div>
			</div>
		</section>
	)
}

const EducationSection = () => {
	return (
		<section className="relative overflow-hidden  md:py-24 lg:py-32 ">
			<div className="container  w-full max-w-full p-12">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-2">
					{/* Diamond Education Box */}
					<div className="relative">
						<img
							src={diamondImage}
							alt="Diamond Education"
							className="w-full h-auto"
						/>
						<div className="absolute top-0 left-0 w-full h-full flex items-start justify-start p-4  text-black">
							<p className="text-2xl font-bold">DIAMONDS</p>
						</div>
					</div>
					{/* Engagement Ring Guide Box */}
					<div className="relative">
						<img
							src={engagementRingImage}
							alt="Engagement Ring Guide"
							className="w-full h-auto"
						/>
						<div className="absolute top-0 left-0 w-full h-full flex items-start justify-start p-4  text-black">
							<p className="text-2xl font-bold">ENGAGEMENT RINGS</p>
						</div>
					</div>
					{/* Wedding Rings Guide Box */}
					<div className="relative">
						<img
							src={weddingRingImage}
							alt="Wedding Rings Guide"
							className="w-full h-auto"
						/>
						<div className="absolute top-0 left-0 w-full h-full flex items-start justify-start p-4  text-black">
							<p className="text-2xl font-bold">WEDDING RINGS</p>
						</div>
					</div>
					{/* Jewelry Guide Box */}
					<div className="relative">
						<img
							src={jewelryImage}
							alt="Jewelry Guide"
							className="w-full h-auto"
						/>
						<div className="absolute top-0 left-0 w-full h-full flex items-start justify-start p-4  text-black">
							<p className="text-2xl font-bold">FINE JEWELRY</p>
						</div>
					</div>
					{/* Gemstone Education Box */}
					<div className="relative">
						<img
							src={gemstoneImage}
							alt="Gemstone Education"
							className="w-full h-auto"
						/>
						<div className="absolute top-0 left-0 w-full h-full flex items-start justify-start p-4  text-black">
							<p className="text-2xl font-bold">GEMSTONES</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default function EducationPage() {
	return (
		<>
			<HeroSection />
			<EducationSection />
		</>
	)
}
