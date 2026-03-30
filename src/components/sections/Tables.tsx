import React from 'react';

const Tables: React.FC = () => {
  return (
    <section id="tables">
      <h2>Столы</h2>
      <div className="product-grid">
        <div className="product-card">
          <h3>СКОГСТА МИНИ</h3>
          <p>Компактный стол 90x170 см. 4-6 персон.</p>
        </div>
        <div className="product-card">
          <h3>СКОГСТА МИДИ</h3>
          <p>Стандартный стол 100x228 см. 6-8 персон.</p>
        </div>
        <div className="product-card">
          <h3>СКОГСТА МАКСИ</h3>
          <p>Большой стол 100x280 см. 8-10 персон.</p>
        </div>
      </div>
    </section>
  );
};

export default Tables;
