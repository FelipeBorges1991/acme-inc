import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import api from "../apis/index";
import { verbs, adjectives, criarUnico } from "../apis/globalVariables";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get(`/v2/list?limit=30`);

        console.log(response.data);

        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container-fluid p-0 text-center">
      <Navbar />
      <div className="">
        <Carousel />
      </div>

      <h1 className="text-center mb-2 p-4 pb-2" style={{ color: "#1FB995" }}>
        Produtos Acme
      </h1>
      <hr></hr>
      <div className="row d-flex m-0 align-items-center">
        {products.map((list) => {
          return (
            <div className="col-12 col-sm-4 col-md-3 align-items">
              <div
                className="card m-2 border border-dark"
                style={{ width: "18rem", backgroundColor: "#193C40" }}
              >
                <Link
                  className="bloco"
                  key={list.id}
                  to={`/productdetail/${list.id}`}
                >
                  <img
                    src={list.download_url}
                    className="card-img-top"
                    style={{ height: "18rem" }}
                    alt="Game poster"
                  />
                </Link>

                <div
                  className="card-body"
                  style={{ backgroundColor: "#F28705" }}
                >
                  <p className="card-text text-center">
                    <strong>
                      {verbs[Math.floor(Math.random() * 50)]}&nbsp;
                    </strong>
                    <strong>
                      {adjectives[Math.floor(Math.random() * 50)]}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default ProductsList;
