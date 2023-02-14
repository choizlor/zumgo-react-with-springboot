import React, { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import LiveBtn from "./LiveBtn";
import zImg from "../../assets/images/z.png";
import DetailModal from "./DetailModal";
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
import { useLocation } from "react-router";

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
  const [isMine, setIsMine] = useState(true);
  const [chats, setChats] = useState([]);
  const [status,setStatus] = useState(product.status);
  const date = new Date(product.reserve);
  var month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
  var day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
  var hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
  var minute = ("0" + date.getMinutes()).slice(-2);                                                                                                                                                                                                    
  useEffect(() => {
    // 상품 정보 axios
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

        if (userId !== res.data.userCode) {
          setIsMine(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeStatus = (e) => {

    if (e.target.value === 'SOLDOUT') { // 거래완료 버튼을 눌렀을 때
      setStatus(e.target.value);
      // 채팅중인 사용자 불러오기
      axios
      .get(`https://i8c110.p.ssafy.io/api/v1/socket/${userId}/all`)
      .then((res) => {
        ///soldout 이면 modal open 해주기
        setChats(res.data);
        setModalOpen(true);
        /// 아니면 status 업데이트
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else {
      setStatus(e.target.value);
      console.log(status,'.👻👻👻👻👻');
    }
    
    // 수정하기 api 요청
    axios
      .put(`https://i8c110.p.ssafy.io/api/v1/product/${product.id}`, {
        ...product,
        status: e.target?.value,
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
        // .post("https://i8c110.p.ssafy.io/api/v1/socket/room", {
        buyerCode: userId,
        sellerCode: product?.userCode,
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/chatroom/${res.data.chatRoomId}`, {
          state: {
            chats: res.data.chatList,
            seller: res.data.seller,
            buyer: res.data.buyer,
            type: "",
            title: product.title,
            productId: productId,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 찜 추가하기
  const addwish = () => {
    if (userId == 0) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    // wishcheck가 true라면 post 요청
    if (wishCheck === false) {
      axios
        .post(
          `https://i8c110.p.ssafy.io/api/v1/wish?userCode=${userId}&productId=${productId}`
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
          `https://i8c110.p.ssafy.io/api/v1/wish?userCode=${userId}&productId=${productId}`
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
        `https://i8c110.p.ssafy.io/api/v1/liveRequest?userCode=${userId}&productId=${productId}`
      )
      .then((res) => {
        setliveReqSize(res.data.liveRequestCnt);
      })
      .catch((err) => {
        console.log(err);
      });

    // 채팅방으로 메시지 보내기
    axios
      .post("https://i8c110.p.ssafy.io/api/v1/socket/room", {
        buyerCode: userId,
        sellerCode: product?.userCode,
      })
      .then((res) => {
        navigate(`/chatroom/${res.data.chatRoomId}`, {
          state: {
            chats: res.data.chatList,
            seller: res.data.seller,
            buyer: res.data.buyer,
            type: "live",
            title: product.title,
            productId: productId,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  상품 삭제하기
  const deleteproduct = async() => {
    await axios
      .delete(`https://i8c110.p.ssafy.io/api/v1/product/${productId}`)
      .then((res) => {
        navigate(`/selllist/${userId}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div className={styles.body}>
      {/* 상품 이미지 배너 */}
      <div className={styles.swiperbox}>
        <ChevronLeftIcon
          className={styles.goback}
          onClick={() => {
            navigate("/");
          }}
        />
        <Swiper
          autoHeight={true}
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
        {/* 라이브가 null이 아닐 때 라이브 예약 알림  */}
        {product.reserve !== null ? (
          <div className={styles.livealert}>
            <span>
              {month}/{day}
            </span>
            <span>
              {hour}:{minute} LIVE 예정
            </span>
          </div>
        ) : null}
      </div>

      {/* 상품 정보 container */}
      <div className={styles.container}>
        <div className={styles.seller}>
          <div className={styles.sellerImgBox}>
            <img src={product.kakaoProfileImg} className={styles.sellerImg} />
          </div>
          <div
            className={styles.sellerName}
            onClick={() => {
              navigate(`/userinfo/${product.userCode}`);
            }}
          >
            {product.kakaoNickname}
          </div>
        </div>
        <div className={styles.selectbox}>
          {/* 드롭다운 */}
          <select
            className={styles.dropdown}
            onChange={changeStatus}
            value={status}
            disabled={!isMine}
          >
            <option value="ONSALE">판매 중</option>
            <option value="BOOKING">예약 중</option>
            <option value="SOLDOUT">거래완료</option>
          </select>
          {isMine && (
            <div className={styles.delete} onClick= {() => {
              deleteproduct();
              navigate(`/selllist/${userId}`);

            }}>
              삭제하기
            </div>
          )}
        </div>
        {/*  판매자에게만 수정하기 버튼이 보임*/}
        {userId !== 0 && isMine ? (
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
          <span className={styles.timeTitle}>Live 가능 시간대</span>
          <div className={styles.timeContent}>
            <span className={styles.time}>{product.availableTime}</span>
          </div>
        </div>
        {userId !== 0 && !isMine ? (
          <LiveBtn
            handleAddRequest={handleAddRequest}
            requestChat={requestChat}
          />
        ) : null}
      </div>
      {/* 누구와 거래하셨나요 모달 */}
      {modalOpen ? (
        <DetailModal
          setModalOpen={setModalOpen}
          chats={chats}
          productId={productId}
        />
      ) : null}
    </div>
  );
}
