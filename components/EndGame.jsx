import { Fragment, useRef, useState, createRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ThumbUpIcon } from '@heroicons/react/outline'
import ReCAPTCHA from 'react-google-recaptcha';

export default function EndGame(props) {
  const [username, setUsername] = useState("");
  const recaptchaRef = useRef();

  const cancelButtonRef = useRef(null);

  const executeCaptcha = () => {
    recaptchaRef.current.execute();
  }

  const onReCAPTCHAChange = async (captchaCode) => {
    var time_setting = "";
    if (props.timer === 1200000) {
      time_setting = "20m";
    } else if (props.timer === 750000) {
      time_setting = "12m30s";
    } else if (props.timer === 450000) {
      time_setting = "7m30s";
    }

    const obj = {
      "username": username,
      "score": props.score,
      "time_setting": time_setting,
      "captcha": captchaCode
    }

    if (!captchaCode) { return; } // reCAPTCHA expired?
    try {
      const response = await fetch("/api/submitscore", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        const msg = await response.json();
        alert(msg.message);
        props.setOpen(false);
      } else {
        // throw the error the api returned
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) { alert(error?.message || "Something went wrong") }
    finally {
      // reset the reCAPTCHA
      recaptchaRef.current.reset();
      setUsername("");
    }
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={props.setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-gray-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <ThumbUpIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-white">
                    Congrats on your score!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      You finished with a score of {props.score}!
                    </p>
                    <div className='mt-3'>
                      <input
                        type={"text"}
                        name={"username"}
                        id={"username"}
                        className={"shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-3/4 sm:text-sm border-gray-700 bg-gray-800 rounded-md text-white"}
                        placeholder={"username"}
                        autoComplete={"off"}
                        value={username}
                        onInput={e => setUsername(e.target.value)}
                        maxLength={15}
                        />
                      <p className="mt-2 text-sm text-gray-500" id="username-description">
                        This will appear on the leaderboards!
                      </p>
                    </div>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                      onChange={onReCAPTCHAChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => { executeCaptcha(); }}
                >
                  Submit Score
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
