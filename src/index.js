import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleGetMissionByShopId } from "./controllers/mission.controller.js";
import { handleGetOngoingMissions } from "./controllers/mission.controller.js";
import { handleGetReviewsByUserId } from "./controllers/user.controller.js";

// dotenv 라이브러리는 -> .env 파일로부터 환경 변수 읽기 & process.env. 객체를 통해 접근 가능하도록 함
dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 구글 로그인 (Passport 사용)
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

//* 네이버 로그인 라우터
router.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

//? 위에서 네이버 서버 로그인이 되면, 네이버 redirect url 설정에 따라 이쪽 라우터로 오게 됨
router.get(
  '/naver/callback',
   //? 그리고 passport 로그인 전략에 의해 naverStrategy로 가서 카카오계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  passport.authenticate('naver', { failureRedirect: '/' }),
  (req, res) => {
      res.redirect('/');
  },
);


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

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원가입
app.post("/api/users/signup", handleUserSignUp);

// 내가 작성한 리뷰 목록
app.get("/api/reviews/user/:userId",handleGetReviewsByUserId);

// 특정 가게의 미션 목록 조회
app.get("/api/shops/:shopId/missions", handleGetMissionByShopId);

// 진행 중인 미션 목록 조회
app.get("/api/mission/ongoing", handleGetOngoingMissions);


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