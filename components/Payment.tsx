"use client"; // Runs this component in the browser because Stripe Elements needs browser APIs.

import { type FormEvent, useState } from "react"; // Imports the form event type and React state.
import { loadStripe } from "@stripe/stripe-js"; // Loads Stripe.js with your publishable key.
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"; // Imports Stripe React components and hooks.

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!); // Creates one Stripe instance for the whole app.

type PaymentProps = { // Describes the props that Payment receives.
    clientSecret: string; // Stores the PaymentIntent client secret from your server action.
}; // Ends the Payment props type.

export default function Payment({ clientSecret }: PaymentProps) { // Renders Stripe Elements using the server-created client secret.
    return ( // Starts the JSX returned by this component.
        <Elements stripe={stripePromise} options={{ clientSecret }}> {/* Gives Stripe Elements the Stripe instance and client secret. */}
            <PaymentForm /> {/* Renders the actual payment form inside Stripe Elements. */}
        </Elements> // Ends the Stripe Elements provider.
    ); // Ends the returned JSX.
} // Ends the Payment component.

function PaymentForm() { // Defines the inner form that can use Stripe hooks.
    const stripe = useStripe(); // Gets the Stripe object from the Elements provider.
    const elements = useElements(); // Gets the mounted Stripe Elements from the provider.
    const [message, setMessage] = useState(""); // Stores a small payment error message for the customer.
    const [isPaying, setIsPaying] = useState(false); // Tracks whether Stripe is currently confirming the payment.

    async function handleSubmit(event: FormEvent<HTMLFormElement>) { // Runs when the customer submits the payment form.
        event.preventDefault(); // Stops the browser from reloading the page.

        if (!stripe || !elements) { // Checks that Stripe has finished loading.
            return; // Stops early until Stripe is ready.
        } // Ends the Stripe-ready check.

        setIsPaying(true); // Disables the button while Stripe processes the payment.
        setMessage(""); // Clears any old payment message.

        const { error } = await stripe.confirmPayment({ // Asks Stripe to confirm the payment with the entered details.
            elements, // Sends the PaymentElement data to Stripe.
            confirmParams: { // Sets extra confirmation options.
                return_url: window.location.origin + '/checkout/status', // Sends the customer back to the status page.
            }, // Ends the confirmation options.
        }); // Ends the Stripe confirmation call.

        if (error) { // Checks whether Stripe returned an immediate error.
            setMessage(error.message ?? "Payment failed. Please try again."); // Shows Stripe's message or a simple fallback.
            setIsPaying(false); // Re-enables the button after the failed payment.
        } // Ends the error handling.
    } // Ends the submit handler.

    return ( // Starts the payment form UI.
        <form onSubmit={handleSubmit} className="space-y-5"> {/* Submits card/payment details through Stripe. */}
            <PaymentElement /> {/* Renders Stripe's ready-made payment inputs. */}

            {message && ( // Shows an error message only when one exists.
                <p className="rounded-2xl bg-[#f21137]/10 px-4 py-3 text-sm font-bold text-[#f21137]"> {/* Styles the payment message. */}
                    {message} {/* Prints the payment message. */}
                </p> // Ends the payment message.
            )} {/* Ends the conditional message block. */}

            <button // Starts the payment button.
                type="submit" // Makes this button submit the form.
                disabled={!stripe || isPaying} // Disables the button until Stripe is ready or while paying.
                className="w-full rounded-full bg-[#6B403C] px-6 py-4 font-bold text-[#ADEBB3] shadow-lg shadow-[#6B403C]/20 transition hover:shadow-xl disabled:cursor-wait disabled:bg-[#6B403C]/55 disabled:shadow-none" // Matches the checkout button style.
            > {/* Opens the payment button content. */}
                {isPaying ? "Paying..." : "Pay now"} {/* Shows button text based on loading state. */}
            </button> {/* Ends the payment button. */}
        </form> // Ends the payment form.
    ); // Ends the returned form JSX.
} // Ends the PaymentForm component.
