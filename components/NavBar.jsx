import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import {
  GlobeIcon,
  EmojiHappyIcon,
  FireIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const diff_colors = {
  0: "text-green-400",
  1: "text-orange-500",
  2: "text-red-500"
}

const game_diffs = [
  {
    name: 'Easy Mode',
    description: 'See Player Images, Jersey Numbers, and Positions when playing.',
    href: '/easy',
    icon: EmojiHappyIcon,
  },
  {
    name: 'Normal Mode',
    description: 'Only Jersey Numbers and Positions will be shown when playing. NO Player Images.',
    href: '/',
    icon: FireIcon,
  },
  { name: 'Hard Mode', description: "NO Images, Positions, or Jersey Numbers.", href: '/hard', icon: FireIcon },
]

const leaderboard_items = [
  {
    name: 'Global Rankings: Easy Mode',
    description: 'View all the scores for easy mode.',
    href: '/leaderboards/easy',
    icon: GlobeIcon,
  },
  {
    name: 'Global Rankings: Normal Mode',
    description: 'View all the scores for normal mode.',
    href: '/leaderboards/normal',
    icon: GlobeIcon,
  },
  {
    name: 'Global Rankings: Hard Mode',
    description: 'View all the scores for hard mode.',
    href: 'leaderboards/hard',
    icon: GlobeIcon,
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <Popover className="relative bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-700 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={"/"} passHref>
              <a>
                <span className="sr-only">Home</span>
                {/* <HomeIcon className="h-8 w-auto sm:h-10 text-gray-300" /> */}
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://cdn-icons-png.flaticon.com/512/889/889442.png"
                  alt="Basketball Icon"
                />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-indigo-500' : 'text-white',
                      'group bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-400 focus:outline-none focus:ring-none'
                    )}
                  >
                    <span>Games</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-indigo-500' : 'text-white',
                        'ml-2 h-5 w-5 group-hover:text-gray-400'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-gray-700 px-5 py-6 sm:gap-8 sm:p-8">
                          {game_diffs.map((item, index) => (
                            <Link key={item.name} href={item.href} passHref >
                              <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-800">
                                <item.icon className={`flex-shrink-0 h-6 w-6 ${diff_colors[index]}`} aria-hidden="true" />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-200">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-400">{item.description} { index != 1 ? <span className="italic text-indigo-400 text-sm">Work In Progress.</span> : ""} </p>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>


            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-indigo-500' : 'text-white',
                      'group bg-gray-900 rounded-md inline-flex items-center text-base font-medium hover:text-gray-400 focus:outline-none focus:ring-none'
                    )}
                  >
                    <span>Leaderboards</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-indigo-500' : 'text-white',
                        'ml-2 h-5 w-5 group-hover:text-gray-400'
                      )}
                      aria-hidden="true"
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-gray-700 px-5 py-6 sm:gap-8 sm:p-8">
                          {leaderboard_items.map((item, index) => (
                            <Link key={item.name} href={item.href} passHref >
                              <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-800">
                                <item.icon className={`flex-shrink-0 h-6 w-6 ${diff_colors[index]}`} aria-hidden="true" />
                                <div className="ml-4">
                                  <p className="text-base font-medium text-gray-200">{item.name}</p>
                                  <p className="mt-1 text-sm text-gray-400">{item.description}</p>
                                </div>
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            <Link href={"https://solorio.dev/"} passHref>
              <a className="text-base font-medium text-gray-500 hover:text-gray-600">
                About the developer
              </a>
            </Link>
          </Popover.Group>
        </div>
      </div>
      {/*//! ------------------------------------------------------------------------------------------------------------ Mobile Menu ------------------------------------------------------------------------------------------------------------ */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 z-10 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-700 divide-y-2 divide-gray-600">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                    <img
                      className="h-8 w-auto"
                      src="https://cdn-icons-png.flaticon.com/512/889/889442.png"
                      alt="Basketball Icon"
                    />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-gray-700 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {game_diffs.map((item, index) => (
                    <Link key={item.name} href={item.href} passHref>
                      <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                        <item.icon className={`flex-shrink-0 h-6 w-6 ${diff_colors[index]}`} aria-hidden="true" />
                        <span className="ml-3 text-base font-medium text-gray-200">{item.name}</span>
                      </a>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {leaderboard_items.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <a className="text-base font-medium text-gray-200 hover:text-gray-400">
                      {item.name}
                    </a>
                  </Link>
                ))}
                <Link href={"https://solorio.dev/"} passHref>
                  <a className="text-base font-medium text-gray-200 hover:text-gray-400">
                    About the developer
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
