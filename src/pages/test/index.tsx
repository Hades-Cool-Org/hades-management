import React from "react";

export default function ProductList() {
  return (
    <>
      <div className="menu">
        <div className="menu-button">
          <i className="fas fa-bars"></i>
        </div>
      </div>

      <h1>Listagem de Produtos</h1>
      <ul className="product-list">
        <li className="product-item">
          <div className="product-info">
            <div className="product-name">Produto 1</div>
            <div className="product-unit">Unidade de Medida: kg</div>
            <div className="product-quantity">Unidades: 10</div>
          </div>
          <div className="actions">
            <button className="edit-button">
              <i className="fas fa-edit" style={{ color: "#2980b9" }}></i>
            </button>
            <button className="delete-button">
              <i className="fas fa-trash" style={{ color: "#E43027" }}></i>
            </button>
          </div>
        </li>
        <li className="product-item">
          <div className="product-info">
            <div className="product-name">Produto 2</div>
            <div className="product-unit">Unidade de Medida: un</div>
            <div className="product-quantity">Unidades: 5</div>
          </div>
          <div className="actions">
            <button className="edit-button">
              <i className="fas fa-edit" style={{ color: "#2980b9" }}></i>
            </button>
            <button className="delete-button">
              <i className="fas fa-trash" style={{ color: "#E43027" }}></i>
            </button>
          </div>
        </li>
        <li className="product-item">
          <div className="product-info">
            <div className="product-name">Produto 3</div>
            <div className="product-unit">Unidade de Medida: m</div>
            <div className="product-quantity">Unidades: 20</div>
          </div>
          <div className="actions">
            <button className="edit-button">
              <i className="fas fa-edit" style={{ color: "#2980b9" }}></i>
            </button>
            <button className="delete-button">
              <i className="fas fa-trash" style={{ color: "#E43027" }}></i>
            </button>
          </div>
        </li>
        {/* Adicione mais itens conforme necessÃ¡rio */}
      </ul>

      <button className="add-button">
        <i className="fas fa-plus"></i> Adicionar Novo Produto
      </button>
    </>
  );
}
