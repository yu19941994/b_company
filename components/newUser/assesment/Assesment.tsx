const Assesment = () => {
  return (
    <div className="flex flex-col space-y-4">
      Math
      <div className="bg-gray-200 w-335 h-20 flex items-center">
        <div className="bg-purple-600 h-full w-1/3"></div>
      </div>
      Reading
      <div className="bg-gray-200 w-335 h-20 flex items-center">
        <div className="bg-gray-400 h-full w-2/3"></div>
      </div>
      Writing
      <div className="bg-gray-200 w-335 h-20 flex items-center">
        <div className="bg-purple-600 h-full w-1/2"></div>
      </div>
    </div>
  )
}

export default Assesment