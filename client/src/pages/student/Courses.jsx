const Courses = () => {
  const isLoading = false;
  return (
    <div>
      {isLoading ? (
       <div className="flex flex-wrap -m-2 gap-5">
       {Array.from({ length: 8 }).map((_, index) => (
         <div
           key={index}
           className="lg:w-[calc(25%-20px)] md:w-[calc(50%-20px)] p-2 w-full border rounded-lg animate-pulse"
         >
           <div className="block relative h-48 rounded overflow-hidden bg-gray-300"></div>
           <div className="mt-4">
             <div className="h-4 bg-gray-300 rounded w-1/4 mb-1"></div>
             <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
             <div className="h-4 bg-gray-300 rounded w-1/2"></div>
           </div>
         </div>
       ))}
     </div>
      ) : (
        <section className="text-gray-600 body-font ">
          <h1 className="text-3xl font-bold text-center">Our Courses</h1>
          <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap -m-2 gap-5">
  {Array.from({ length: 6 }).map((_, index) => (
    <div
      key={index}
      className="lg:w-[calc(25%-20px)] md:w-[calc(50%-20px)] p-2 w-full border rounded-lg transition-transform transform hover:scale-105"
    >
      <a className="block relative h-48 rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="object-cover object-center w-full h-full block"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVOXYdhkq4Cxw3Zp6M79c-TfvMPTlWdGnIw&s"
        />
      </a>
      <div className="mt-4">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
          CATEGORY
        </h3>
        <h2 className="text-gray-900 title-font text-lg font-medium">
          The 400 Blows
        </h2>
        <p className="mt-1">$18.40</p>
      </div>
    </div>
  ))}
</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Courses;
