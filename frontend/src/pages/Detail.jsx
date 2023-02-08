import React, { useEffect, useState } from "react";
import styles from "./styles/Detail.module.css";
import LiveBtn from "../components/Detail/LiveBtn";
import zImg from "../assets/images/z.png";
import DetailModal from "../components/Detail/DetailModal";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
// heroicons
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ChevronLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
// swiper - 이미지 슬라이더
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";
import { useSelector } from "react-redux";

export default function Detail() {
  const userId = useSelector((state) => {
    return state.user.userCode;
  });
  const params = useParams();
  const user = useSelector((state) => {
    return state.user;
  });
  const productId = params.productId;
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [wishCheck, setwishcheck] = useState(product.wishCheck);
  const [wishCnt, setwishCnt] = useState(product.wishSize);
  const [liveReqSize, setliveReqSize] = useState(product.liveReqSize);
  const [productImgs, setproductImgs] = useState([]);
  // useEffect(() => {
  //   // 상품 정보를 가져오는 GET 요청
  //   axios
  //     .get(`http://i8c110.p.ssafy.io:8080/product/detail/${params.productId}`)
  //     .then((res) => {
  //       console.log(res);
  //       setProduct(res.data);
  //       setwishcheck(res.data.wishCheck)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${productId}?userCode=2`)
      .then((res) => {
        setProduct(res.data);
        setwishCnt(res.data.wishSize);
        setwishcheck(res.data.wishCheck);
        setliveReqSize(res.data.liveReqSize);
        console.log(res.data, "🎇");
        setproductImgs(res.data.imgUrlList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // 수정하기 api 요청
  const changeStatus = (e) => {
    if (e.target.value === "SOLDOUT") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }

    console.log(e.target.value);

    axios
      .put(`http://i8c110.p.ssafy.io:8080/product/${product.id}`, {
        ...product,
        status: e.target.value,
      })
      .then(() => {
        navigate(`/detail/${product.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 일반채팅하기
  const requestChat = () => {
    // 판매자 정보, 구매자 정보 보내주기
    axios
      .post("http://localhost:8080/socket/room", {
        buyerCode: 3,
        sellerCode: 6,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/chatroom/${res.data}`);
      });
  };

  // 라이브 요청하기
  const requestLive = () => {
    // 2 포인트 빼기,,,
    // 판매자 정보, 구매자 정보 보내주기
    axios
      .post("http://localhost:8080/socket/room", {
        buyerCode: userId,
        sellerCode: 6,
      })
      .then((res) => {
        navigate(`/chatroom/${res.data}`, { state: "live" });
      });
  };
  // post 요청하기
  //   axios
  //     .post(
  //       `http://i8c110.p.ssafy.io:8080/liveRequest?userCode=${user.userCode}&productId=${productId}`,
  //     )
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // 찜 추가하기
  const addwish = () => {
    //wishcheck가 true라면 post 요청
    if (wishCheck === false) {
      axios
        .post(`http://localhost:8080/wish?userCode=2&productId=${productId}`)
        .then((res) => {
          console.log(res, "🎉");
          console.log(res.data.wishCheck, "🎈");
          setwishcheck(res.data.wishCheck);
          console.log(res.data.wishCnt, "🎆");
          setwishCnt(res.data.wishCnt);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //wishcheck가 true라면 delete요청
    else {
      axios
        .delete(`http://localhost:8080/wish?userCode=2&productId=${productId}`)
        .then((res) => {
          console.log(res, "🎃");
          setwishcheck(res.data.wishCheck);
          setwishCnt(res.data.wishCnt);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //라이브 요청
  const handleAddRequest = () => {
    alert("2 point가 차감되었습니다.");

    axios
      .post("http://localhost:8080/liveRequest?userCode=6&productId=10")
      .then((res) => {
        console.log(res, "🧨");
        // console.log(res.data.liveRequestCnt)
        setliveReqSize(res.data.liveRequestCnt);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles.body}>
      {/* 상품 이미지 배너 */}
      <div className={styles.swiperbox}>
        {/* <ChevronLeftIcon className="w-6 h-6 text-gray-100" /> */}
        <Swiper
          className={styles.swiper}
          navigation={true}
          pagination={true}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {productImgs?.map((productImg,idx) => {
            return (
              <SwiperSlide key={idx} className={styles.swiperimg}>
                <img src={productImg} alt="productimg" />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* 라이브 예약 알림 */}
        <div className={styles.livealert}>
          <span>1/24 16시</span>
          <span>LIVE 예정</span>
        </div>
      </div>
      {/* 상품 정보 container */}
      <div className={styles.container}>
        <div className={styles.seller}>
          <div className={styles.sellerImgBox}>
            <img
              src="https://sitem.ssgcdn.com/18/83/93/item/2097000938318_i1_1200.jpg"
              className={styles.sellerImg}
            />
          </div>
          <div className={styles.sellerName}>딸기우유 서녕</div>
        </div>
        {/* 드롭다운 */}
        <select className={styles.dropdown} onChange={changeStatus}>
          <option value="ONSALE">판매 중</option>
          <option value="BOOKING">예약 중</option>
          <option value="SOLDOUT">거래완료</option>
        </select>
        {/*  판매자에게만 수정하기 버튼이 보임*/}
        {true ? (
          <div className={styles.canedit}>
            <div className={styles.title}>{product.title}</div>
            <PencilSquareIcon
              className={styles.editbtn}
              onClick={() => {
                navigate(`/update/${productId}`, {
                  state: product,
                });
              }}
            />
          </div>
        ) : (
          <div className={styles.title}>{product.title}</div>
        )}

        <div className={styles.price}>{product.price}원</div>
        <div className={styles.desc}>{product.description}</div>
        <div className={styles.icons}>
          <div className={styles.icon} onClick={addwish}>
            {wishCheck ? <HeartIcon class="fill-black" /> : <HeartIcon />}
            {/* <HeartIcon onClick={addwish}/> */}
            <div className={styles.count}>{String(wishCnt)}</div>
          </div>
          <div className={styles.icon}>
            <div className={styles.zimg}>
              <img src={zImg} alt="" />
            </div>
            <div className={styles.zcount}>{liveReqSize}</div>
          </div>
        </div>
        <div className={styles.timeBox}>
          <span className={styles.timeTitle}>Live 가능 시간대 :</span>
          <div className={styles.timeContent}>
            <span>{product.reservation}</span>
          </div>
        </div>
        <LiveBtn handleAddRequest={handleAddRequest} />
        {/* <LiveBtn requestChat={requestChat} /> */}
      </div>
      {modalOpen ? <DetailModal setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
