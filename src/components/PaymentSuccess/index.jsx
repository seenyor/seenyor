import PaymentImg from "./PaymentImg"
import PaymentMsg from "./PaymentMsg"

function index() {
  return (
    <div className='flex w-full flex-col gap-[1.63rem] bg-gradient-to-b from-white to-blue-50'>
        <PaymentImg />
        <PaymentMsg />
    </div>
  )
}

export default index