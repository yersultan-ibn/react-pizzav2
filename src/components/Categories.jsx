import { useState } from 'react';
function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onClickCategory = () => {
    setActiveIndex(3);
  };

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => {
          return <li key={i} className="active">{value}</li>;
        })}
        <li className="active">Все</li>
      </ul>
    </div>
  );
}

export default Categories;
