
export const Alert = ({alert}) => {
  return (
    <div className={`${alert.error? 'bg-red-800 text-white text-lg rounded-md text-center w-96 ml-20 mt-10':'bg-lime-600 text-neutral-50 text-lg rounded-md h-8 text-center w-96 mt-10 ml-20'}  ${alert.isVisible? 'block':'hidden'}`}>
        {alert.msg}</div>
  )
}
