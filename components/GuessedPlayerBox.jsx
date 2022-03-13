export default function GuessedPlayerBox(props) {
  return (
    <div className="relative">
      {/* background blur div */}
      {/* <div className="absolute inset-0 bg-white rounded-lg blur-sm"></div> */}

      <div className="relative rounded-lg border border-gray-700 bg-gray-800 px-5 py-4 shadow-sm flex items-center space-x-3">
        <div className="flex-1 min-w-0">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-white">{props.person}</p>
        </div>
      </div>
    </div>
  )
}
