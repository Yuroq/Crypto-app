import { useEffect, useState } from "react";
import "../Portfolio/Portfolio.css";
import PortfolioAssetsList from "./PortolioAssestsList";
import axios from "axios";
import { NavLink } from "react-router-dom";
function Portfolio({ auth }) {
  const [coins, setCoins] = useState([]);
  const [portfolioCoins, setPortfolioCoins] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [allCryptoNames, setAllCryptoNames] = useState([]);
  const [allCryptosInApi, setAllCryptosInApi] = useState([]);
  const [cryptoProfit, setCryptoProfit] = useState(0);
  const [totalProft, setTotalProfit] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    setUserLoggedIn(auth.isAuthenticated());
  }, [auth]);
  useEffect(() => {
    loadUserProfile();
  }, [userLoggedIn]);
  const loadUserProfile = () => {
    userLoggedIn
      ? auth.getProfile((profile, error) => setProfile({ profile, error }))
      : "";
  };

  useEffect(() => {
    setProfileEmail(profile.profile ? profile.profile.email : "");
  }, [profile]);

  useEffect(() => {
    function fetchAllCryptos() {
      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
      )
        .then((response) => response.json())
        .then((data) => setAllCryptosInApi(data))
        .catch((error) => console.error(error));
    }
    fetchAllCryptos();
  }, []);
  useEffect(() => {
    async function fetchLikedCoins() {
      try {
        const response = await axios.get(
          `http://localhost:8000/portfolioRoutes/portfoliolist/${profileEmail}`
        );
        setCoins(response.data);
      } catch (err) {
        console.error("Error fetching liked coins:", err);
      }
    }

    fetchLikedCoins();
  }, [profileEmail]);

  useEffect(() => {
    const nameArr = [];
    for (let i = 0; i < coins.length; i++) {
      nameArr.push(coins[i].name);
    }
    setAllCryptoNames(nameArr);
  }, [coins]);

  let total = 0;
  let quanity = 1;
  useEffect(() => {
    allCryptoNames.map((crypto) => {
      for (let i = 0; i < allCryptosInApi.length; i++) {
        if (allCryptosInApi[i].name === crypto) {
          coins.map((coin) => {
            if (coin.name === allCryptosInApi[i].name) quanity = coin.quanity;
          });
          total += +allCryptosInApi[i].current_price * quanity;
        }
      }
    });
    setCryptoProfit(total);
  }, [allCryptoNames]);

  useEffect(() => {
    setTotalProfit(cryptoProfit - totalInvestment);
  }, [cryptoProfit]);
  function compareByPrice(a, b) {
    return +b.price - +a.price;
  }

  const sort = coins.sort(compareByPrice);

  useEffect(() => {
    let addToTotal = 0;
    coins.map((coin) => {
      coin.price ? (addToTotal += +coin.price) : "";
    });
    setTotalInvestment(addToTotal);
  }, [coins]);

  return (
    <div className="portfolio-div">
      <div style={{ display: "flex" }}>
        <h2 className="portfolio-total">${totalInvestment}</h2>
        <NavLink to="/dashboard">
          <button className="button-6" role="button">
            + Add new
          </button>
        </NavLink>
      </div>
      <p className="profit-label">
        + ${coins[coins.length - 1] ? coins[coins.length - 1].price : ""}
      </p>
      <div className="portfolio-stats">
        <div className="all-time-profit">
          <h5 className="all-time-profit-label">All time profit</h5>
          <h2 className="all-time-profit-stat">
            {totalProft > 0 ? <span>+</span> : ""} ${Math.trunc(totalProft)}
          </h2>
        </div>
        <div className="top-performer">
          <h5 className="top-performer-label">Top performer</h5>
          <div className="top-performer-stats">
            <img
              src={sort[0] ? sort[0].image : ""}
              className="top-performer-img"
            />
            <h2 className="top-performer-name">
              {sort[0] ? sort[0].name : ""}
            </h2>
          </div>
          <h2 className="top-performer-stat">
            + $ {sort[0] ? sort[0].price : 0}
          </h2>
        </div>
        <div className="top-performer">
          <h5 className="top-performer-label">Worst performer</h5>
          <div className="top-performer-stats">
            <img
              src={sort[sort.length - 1] ? sort[sort.length - 1].image : ""}
              className="top-performer-img"
            />
            <h2 className="top-performer-name">
              {sort[sort.length - 1] ? sort[sort.length - 1].name : ""}
            </h2>
          </div>
          <h2 className="worst-performer-stat">
            + $ {sort[sort.length - 1] ? sort[sort.length - 1].price : 0}
          </h2>
        </div>
        <PortfolioAssetsList coins={coins} setCoins={setCoins} />
      </div>
    </div>
  );
}

export default Portfolio;
