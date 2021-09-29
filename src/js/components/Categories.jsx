import React from 'react';

const Categories = ({ categoryId, categoryName, changeTab, tabSelected }) => {
  const isSelected = tabSelected === categoryId;
  return (
    <div className='categories my-4'>
      <button
        type='button'
        className={`btn mx-1 categories__button${isSelected ? '--active' : ''}`}
        onClick={() => changeTab(categoryId)}
      >
        {categoryName}
      </button>
    </div>
  );
};

export default Categories;
