import React from 'react';

const Placeholder = ({ pageTitle = "Coming Soon" }) => {
  return (
    <section className="placeholder">
      <div className="placeholder__inner">
        <h1>{pageTitle}</h1>
        <p>
          This page is a placeholder. Use the navigation links in the header or footer to explore
          other sections of the Amazon clone.
        </p>
      </div>
    </section>
  );
};

export default Placeholder;
