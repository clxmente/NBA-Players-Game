export default function GuessedPlayerBox(props) {
  return (
    <div className="relative">
      {/* background blur div */}
      <div className="absolute inset-0 bg-green-400 rounded-lg blur-sm"></div>

      <div className="relative rounded-lg border border-white bg-white px-6 py-5 shadow-sm flex items-center space-x-3">
        <div className="flex-1 min-w-0">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{props.person}</p>
        </div>
      </div>
    </div>
  )
}
