import React, { useEffect, useRef } from "react";

export default function PayPal({ total }) {
  const paypal = useRef();

  useEffect(() => {
    let myButton = window.paypal.Buttons({
      createOrder: (data, actions, err) => {
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              description: "Cool looking table",
              amount: {
                currency_code: "USD",
                value: total,
              },
            },
          ],
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
      },
      onError: (err) => {
        console.log(err);
      },
    });

    myButton.render(paypal.current);
  }, []);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
