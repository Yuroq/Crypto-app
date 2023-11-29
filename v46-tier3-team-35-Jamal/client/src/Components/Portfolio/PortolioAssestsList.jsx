import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function PortfolioAssetsList(props) {
  const coins = props.coins;
  const setCoins = props.setCoins;
  const [savedCoins, setSavedCoins] = useState([]);
  useEffect(() => {
    setSavedCoins(coins);
  }, [coins]);
  const handleDelete = async (index) => {
    try {
      await axios.delete("http://localhost:8000/portfolioRoutes/remove", {
        data: {
          id: savedCoins[index].id,
        },
      });
      setSavedCoins((prevCoins) =>
        prevCoins.filter((coin) => coin.id !== savedCoins[index].id)
      );
      setCoins((prevCoins) =>
        prevCoins.filter((coin) => coin.id !== savedCoins[index].id)
      );
    } catch (error) {
      console.error("Error disliking the coin:", error);
    }
  };
  return (
    <div className="portfolio-chart">
      <div className="overflow-x-auto">
        <h2>Assets</h2>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Quanity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {savedCoins.map((coin, index) => {
              return (
                <tr key={index}>
                  <th>
                    <label
                      onClick={() => handleDelete(index)}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={coin.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{coin.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>{coin.price}</td>
                  <td>{coin.quanity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PortfolioAssetsList;
