import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { handleUserSignUp } from "./controllers/user.controller.js";


// dotenv 라이브러리는 -> .env 파일로부터 환경 변수 읽기 & process.env. 객체를 통해 접근 가능하도록 함
dotenv.config();

const app = express();
const port = process.env.PORT;

// 공통 응답 사용 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

const myLogger = (req, res, next) => {
  console.log("LOGGED");
  next();
}

app.use(myLogger);

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석하도록 함 (JSON 형태의 요청 body를 파싱하기 위해)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원가입
app.post("/api/users/signup", handleUserSignUp);

// 내가 작성한 리뷰 목록
app.get("/api/reviews/user/:userId","handleGetReviewsByUserId");

// 특정 가게의 미션 목록 조회
app.get("/api/shops/:shopId/missions", handleGetMissionByShopId);

// 진행 중인 미션 목록 조회
app.get(/api/mission/ongoing, handleGetOngoingMissions);


// 전역 오류를 처리하기 위한 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});