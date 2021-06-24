import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import  CheckoutForm  from "./CheckoutFourm";
import "./style.css"
import payimage from "../../assets/images/payimage.png"
const PUBLIC_KEY = "pk_test_51IO6fDH5zvaLv3PtYD3nvdrs9TcoD9etcU9jLtQfu2TBY2DHcgFwb7RrdiZXZBykWAZ3V6Uluvnz8GYaHwPxfyv700dPzm6dxT";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {


  return (
    <div className="App">
      <div className="product">
        <img
          src={payimage}
          alt="laptop"
          style={{ width: "100%", height: "auto" }}
        />
        <div>
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
    </div>
    </div>
    </div>
  );
};

export default Stripe;