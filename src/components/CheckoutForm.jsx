import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "bootswatch/dist/lux/bootstrap.min.css";
import { useState } from "react";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: 10000,
          }
        );

        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <form onSubmit={handleSubmit} className="card card-body">
            <img
              src="https://mesajilgamer.com/wp-content/uploads/sites/7/2021/04/023215-1-1.png"
              alt="teclado"
              className="img-fluid"
            />
            <h3 className="text-center">Price : 100 $</h3>
            <div className="form-group">
              <CardElement className="form-control" />
            </div>
            <button className="btn btn-success" disabled={!stripe}>
              {loading ? (
                <div class="spinner-border text-light" role="status" />
              ) : (
                "Buy"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
