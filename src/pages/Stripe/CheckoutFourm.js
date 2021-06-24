import React, { useState } from "react";
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import { connect } from "react-redux";
import decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { Spinner } from "@chakra-ui/react"
import "./style.css";
import * as CarteAction from "../../store/actions/index";


const CheckoutForm = ({ item, price, history,ClearItems}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading,setLoading]=useState(false)

  const { userId } = decode(localStorage.getItem("token"));
  const totalpts = item.reduce((curNumber, item) => {
    return Number(curNumber) + Number(item.totalpoint);
  }, 0);


 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {

        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:5000/stripe/charge",
          {
            amount: price * 100,
            id: id,
            userId: userId,
            point: totalpts,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
       
        if (response.data.success) {
          localStorage.removeItem("token");
          localStorage.setItem("token", response.data.token);
          console.log("CheckoutForm.js 25 | payment successful!");
          setLoading(false)
          ClearItems()
          history.push("/Aucciel");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
        setLoading(false)
      }
    } else {
      console.log(error.message);
      setLoading(false)
    }
  };

 

  const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        iconColor: "rgb(240, 57, 122)",
        color: "rgb(240, 57, 122)",
        fontSize: "16px",
        fontFamily: '"Open Sans", sans-serif',
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "#CFD7DF"
        }
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238"
        }
      }
    }
  };

  return (

      <div className="CardDemo">
        <div class="product-info">
          <h3 className="product-title">{totalpts} Point </h3>
          <h4 className="product-price">Price :{price} dt</h4>
        </div>
     <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <button className="btn-pay" >Pay</button>
      {(loading&&<Spinner color="red.500" size="xl"  thickness="4px" speed="0.65s" ml='43%'/>)}
    </form>
    </div>
  
 
    
  );
};
const mapStateToProps = (state) => {
  return {
    item: state.carte.items,
    price: state.carte.totalAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ClearItems: () => dispatch(CarteAction.onClearIteam()),
    
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(CheckoutForm));
