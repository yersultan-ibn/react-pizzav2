import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = ({ searchValue }) => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category:${categoryId}` : "";
    const search = searchValue > 0 ? `&search=${searchValue}` : "";

    fetch(
      `https://6374c18b08104a9c5f882c60.mockapi.io/items?limit=4&page=${currentPage}${category}&sortBy=${sortBy}&order=${order})}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * itemsPerPage) % items.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
};
export default Home;
