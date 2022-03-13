import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

const items = [
  { name: '20 Minutes', ms: 1200000 },
  { name: '12.5 Minutes', ms: 750000 },
  { name: '7.5 Minutes', ms: 450000 },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function msToMinutes(ms) {
  // Credit to https://stackoverflow.com/a/21294619 for this function
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return (
    seconds == 60 ?
    (minutes + 1) + ":00" :
    minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  );
}

export default function TimeSelect(props) {
  return (
    <span className="relative z-0 inline-flex rounded-md ml-8">
      <button
        type="button"
        className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 disabled:hover:cursor-not-allowed hover:cursor-default"
        disabled={props.disabledState}
        onClick={() => {console.log(`Clicked btn with time: ${props.timeState}`)}}
      >
        {msToMinutes(props.timeState)}
      </button>
      <Menu as="span" className="-ml-px relative block">
        <Menu.Button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none disabled:hover:cursor-not-allowed"
          disabled={props.disabledState}>
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {items.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      onClick={(e) => {e.preventDefault(); props.setFunc(item.ms)} }
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </span>
  )
}
