import { useState } from "react";
import "../Portfolio/Portfolio.css";
import axios from "axios";
function AddToPortfolio(props) {
  const setAddCryptoToPortfolio = props.setAddCryptoToPortfolio;
  const coinInfo = props.coinInfo;
  const userEmail = props.userEmail;
  const [quanity, setQuanity] = useState(1);
  const handleSaveToPortfolio = async () => {
    const totalPrice = coinInfo.market_data.current_price.usd * quanity;
    const id = Math.floor(100000 + Math.random() * 900000);
    try {
      await axios.post("http://localhost:8000/portfolioRoutes/portfolio", {
        name: coinInfo.name,
        image: coinInfo.image.large,
        price: totalPrice.toString(),
        userEmail: userEmail,
        quanity: quanity,
        id: id,
      });
      setAddCryptoToPortfolio(false);
    } catch (error) {
      console.error(error);
    }
  };

  function quanityInput(e) {
    setQuanity(e.target.value);
  }
  return (
    <div className="AddToPortfolio-div">
      <p
        className="exit"
        onClick={() => setAddCryptoToPortfolio(false)}
        style={{ cursor: "pointer" }}
      >
        X
      </p>
      <h2 className="add-port-header">Add Transaction</h2>
      <h2 className="port-crypto-name">{coinInfo.name}</h2>
      <div className="input-labels">
        <p className="port-crypto-quanity">Quanity</p>
        <p className="port-crypto-price">Price per coin</p>
      </div>
      <div className="port-inputs">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full max-w-xs"
          style={{ borderColor: "black" }}
          onChange={quanityInput}
          value={quanity}
        />
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-secondary w-full max-w-xs"
          style={{ borderColor: "black" }}
          value={coinInfo.market_data.current_price.usd}
        />
      </div>
      <button class="button-58" role="button" onClick={handleSaveToPortfolio}>
        add to portfolio!
      </button>
    </div>
  );
}

export default AddToPortfolio;
