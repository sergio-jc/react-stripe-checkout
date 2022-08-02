import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './components/CheckoutForm'

const stripePromise = loadStripe("pk_test_51LLETdJuZ0ixQt8FSw1coo7cIsQ8dD1J2rYfTVEgYLVDpu40jEg0EUmU5x4HTYbGINWi3fSZAYjufgqWkct5xnko00xWUdVZxp")

function App() {


  return (
   <Elements stripe={stripePromise}>
    <CheckoutForm/>
   </Elements>
  )
}

export default App
