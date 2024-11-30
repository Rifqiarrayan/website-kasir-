import React, { Component } from "react";
import { Col } from "react-bootstrap"; // Hapus ListGroup
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, categoriYangDipilih } = this.props;
    return (
      <Col md={12} className="mt-3">
        <h4>
          <strong>Daftar Kategori</strong>
        </h4>
        <hr />
        <div className="d-flex justify-content-center flex-wrap gap-3">
          {categories &&
            categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${
                  categoriYangDipilih === category.nama ? "category-aktif" : ""
                }`}
                onClick={() => changeCategory(category.nama)}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ff5722",
                  borderRadius: "10px",
                  minWidth: "120px",
                  backgroundColor:
                    categoriYangDipilih === category.nama ? "#ff784e" : "white",
                }}
              >
                <Icon nama={category.nama} />
                <h6 style={{ margin: "10px 0" }}>{category.nama}</h6>
              </div>
            ))}
        </div>
      </Col>
    );
  }
}
