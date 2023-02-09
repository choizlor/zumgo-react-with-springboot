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
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  
  // 로그인된 유저 아이디
  const userId = useSelector((state) => {
    return state.user.userCode;
  });

  // 상품 ID
  const params = useParams();
  const productId = params.productId;
  // 상품 정보
  const [product, setProduct] = useState({});
  const [wishCheck, setwishcheck] = useState(product.wishCheck);
  const [wishCnt, setwishCnt] = useState(product.wishSize);
  const [liveReqSize, setliveReqSize] = useState(product.liveReqSize);
  const [productImgs, setproductImgs] = useState([]);
  const [isMine, setIsMine] = useState(false);
  const [chatters, setChatters] = useState([]);
 

  useEffect(() => {     // 상품 정보 axios
    axios
      .get(
        `https://i8c110.p.ssafy.io/api/v1/product/${productId}?userCode=${userId}`
      )
      .then((res) => {
        setProduct(res.data);
        setwishCnt(res.data.wishSize);
        setwishcheck(res.data.wishCheck);
        setliveReqSize(res.data.liveReqSize);
        setproductImgs(res.data.imgUrlList);
         // 같으면 판매자, 다르면 구매자
         if (userId === product.userCode) {
          setIsMine(true)
          // console.log(isMine)
        }
        else {
          setIsMine(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });


      axios   // 채팅목록 불러오기
      .get(`https://i8c110.p.ssafy.io/api/v1/socket/${user.userCode}/all`)
      .then((res) => {
        setChatters(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, []);

  const changeStatus = (e) => {
    // 수정하기 api 요청
    if (e.target.value === "SOLDOUT") {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }

    axios
      .put(`https://i8c110.p.ssafy.io/api/v1/product/${product.id}`, {
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
      .post("https://i8c110.p.ssafy.io/api/v1/socket/room", {
        buyerCode: userId,
        sellerCode: product.userCode,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/chatroom/${res.data}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // // 라이브 요청하기
  // const requestLive = () => {
  //   // 2 포인트 빼기,,,
  //   // 판매자 정보, 구매자 정보 보내주기
  //   axios
  //     .post("https://i8c110.p.ssafy.io/api/v1/socket/room", {
  //       buyerCode: userId,
  //       sellerCode: product.userCode,
  //     })
  //     .then((res) => {
  //       navigate(`/chatroom/${res.data}`, { state: "live" });
  //     });
  // };

  // 찜 추가하기
  const addwish = () => {
    // wishcheck가 true라면 post 요청
    if (wishCheck === false) {
      axios
        .post(
          `https://i8c110.p.ssafy.io/api/v1/wish?userCode=2&productId=${productId}`
        )
        .then((res) => {
          setwishcheck(res.data.wishCheck);
          setwishCnt(res.data.wishCnt);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //wishcheck가 true라면 delete요청
    else {
      axios
        .delete(
          `https://i8c110.p.ssafy.io/api/v1/wish?userCode=2&productId=${productId}`
        )
        .then((res) => {
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
      .post(
        "https://i8c110.p.ssafy.io/api/v1/liveRequest?userCode=6&productId=10"
      )
      .then((res) => {
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
        <ChevronLeftIcon className="w-6 h-6 text-gray-100" onClick={()=>{navigate(-1)}}/>
        <Swiper
          className={styles.swiper}
          navigation={true}
          pagination={true}
          loop={true}
          modules={[Navigation, Pagination]}
        >
          {productImgs?.map((productImg, idx) => {
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
        <select
          className={styles.dropdown}
          onChange={changeStatus}
          value={product.status}
        >
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
        {isMine && <LiveBtn handleAddRequest={handleAddRequest} requestChat={requestChat}/> }
      </div>
      {modalOpen ? <DetailModal setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
