import { useState } from 'react';
function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li key={i} className={value === i ? 'active' : ''} onClick={() => onClickCategory(i)}>
              {categoryName}
            </li>
          );
        })}
        <li className="active">Все</li>
      </ul>
    </div>
  );
}

export default Categories;
