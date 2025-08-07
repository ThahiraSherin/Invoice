import { useContext } from "react"
import UserContext from "../context/UserContext"

const TotalSummary = () => {
    const {state} = useContext(UserContext);

    const items = Array.isArray(state.items) ? state.items : [];

    const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    return sum + qty * rate;
  }, 0);
    
    const tax = subtotal * 0.18;
    const total = subtotal + tax;

  return (
    <div className="text-right mt-4 space-y-1 font-bold">
      <p>Subtotal : ₹ {subtotal.toFixed(2)}</p>
      <p>Tax (18%): ₹ {tax.toFixed(2)}</p>
      <p className="text-lg font-bold">Total: ₹ {total.toFixed(2)}</p>
    </div>
  )
}

export default TotalSummary
