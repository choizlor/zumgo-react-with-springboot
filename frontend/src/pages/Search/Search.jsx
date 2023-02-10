import React, { useEffect, useState } from "react";
import SearchItems from "./SearchItems";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "./Search.module.css";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import ProductItem from "../../components/Product/ProductItem";

export default function Search() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [recentOpen, setRecentOpen] = useState(true);
  const [ref, inView] = useInView();
  const loadedRecents = localStorage.getItem("recents")
    ? JSON.parse(window.localStorage.getItem("recents"))
    : window.localStorage.setItem("recents", JSON.stringify([]));
  const [recents, setRecents] = useState(loadedRecents);

  const handleSearchWord = (e) => {
    setSearchName(e.target.value);
  };

  // 무한 스크롤 요청
  const searchProducts = (searchWord) => {
    axios
      .post("https://i8c110.p.ssafy.io/api/v1/product/search", {
        searchName: searchWord,
      })
      .then((res) => {
        console.log(res.data);
        setProducts([...res.data]);

        // 현재 불러온 데이터가 존재하면 다음 페이지로 이동
        if (res.data) {
          setPage(() => page + 1);
          setRecentOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 검색하기 함수
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    if (!searchName) {
      alert("검색어를 입력해주세요!");
      setRecentOpen(true);
      return;
    }

    searchProducts(searchName);

    // 배열로 다시 바꿔서 recents에 저장하기
    setRecents(JSON.parse(window.localStorage.getItem("recents")));
    setRecents([searchName, ...recents]);

    // 문자열로 다시 바꿔서 recents에 저장하기
    window.localStorage.setItem("recents", JSON.stringify(recents));

    setSearchName("");
  };

  const handleClickProduct = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <ChevronLeftIcon
          onClick={() => {
            navigate(-1);
          }}
        />
        <form className={styles.input} onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            onInput={handleSearchWord}
            onFocus={() => setRecentOpen(true)}
            value={searchName}
          />
          <MagnifyingGlassIcon onClick={handleSubmitSearch} />
        </form>
      </div>
      {/* 최근 검색어 & 검색된 내용 리스트*/}
      {recentOpen ? (
        <SearchItems recents={recents} searchProducts={searchProducts}/>
      ) : (
        <div className={styles.searchlist}>
          {products.length > 0 ? (
            products?.map((product) => (
              <ProductItem
                key={product.productId}
                product={product}
                clickProduct={handleClickProduct}
              />
            ))
          ) : (
            <div className={styles.noresults}>검색 결과가 없습니다.</div>
          )}
          <div className={styles.ref} ref={ref}></div>
        </div>
      )}
    </div>
  );
}
