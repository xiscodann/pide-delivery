import React from 'react';

const Categories = ({ categoryId, categoryName, changeTab }) => {
  return (
    <>
      <button type='button' onClick={() => changeTab(categoryId)}>
        {categoryName}
      </button>
    </>
  );
};

export default Categories;
