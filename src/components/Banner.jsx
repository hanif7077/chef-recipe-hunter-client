function Banner() {
  return (
    <div className="mx-auto max-w-3xl py-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Discover Delicious Recipes for Every Occasion</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">Whether you're a seasoned cook or a beginner in the kitchen, our recipe website has something for everyone. Browse our extensive collection of easy-to-follow recipes.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#recipies" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Explore Recipes</a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  )
}

export default Banner;