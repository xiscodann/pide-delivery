import React from 'react';

const Categories = ({
  categoryId,
  categoryName,
  changeTab,
  tabSelected,
  categoryImage,
}) => {
  const isSelected = tabSelected === categoryId;
  return (
    <div className='categories my-4 mx-2'>
      <button
        type='button'
        className={`btn d-flex mx-1 categories__button${
          isSelected ? '--active' : ''
        }`}
        onClick={() => changeTab(categoryId)}
      >
        <img
          className='categories__img'
          src={`/assets/img/products/${
            categoryImage !== '' ? categoryImage : categoryName
          }.svg`}
          alt=''
        />
        {categoryName}
      </button>
    </div>
  );
};

export default Categories;
