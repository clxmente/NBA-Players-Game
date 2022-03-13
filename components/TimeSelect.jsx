export default function TimeSelect(props) {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      <button
        type="button"
        className={props.timestate === 1200000 ? "-ml-px time-selection-active rounded-l-md" : "-ml-px time-selection-default rounded-l-md"}
        onClick={() => {props.setTime(1200000)} } // 20m in milliseconds = 1200000
        disabled={props.disabledState}
      >
        20m
      </button>
      <button
        type="button"
        className={props.timestate === 750000 ?  "-ml-px time-selection-active" : "-ml-px time-selection-default"}
        onClick={() => {props.setTime(750000)} } // 12m30s in milliseconds = 750000
        disabled={props.disabledState}
      >
        12m30s
      </button>
      <button
        type="button"
        className={props.timestate === 450000 ?  "-ml-px time-selection-active rounded-r-md" : "-ml-px time-selection-default rounded-r-md"}
        onClick={() => {props.setTime(450000)} } // 7m30s in milliseconds = 450000
        disabled={props.disabledState}
      >
        7m30s
      </button>
    </span>
  )
}
