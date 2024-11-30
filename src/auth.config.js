import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

const passport = require('passport');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');

const User = require('../models/user');

module.exports = () => {
  passport.use(
      new NaverStrategy(
        {
            clientID: process.env.NAVER_ID,
            clientSecret: process.env.NAVER_SECRET,
            callbackURL: '/auth/naver/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('naver profile : ', profile);
            try {
              const exUser = await User.findOne({
                  // 네이버 플랫폼에서 로그인 했고 & snsId필드에 네이버 아이디가 일치할경우
                  where: { snsId: profile.id, provider: 'naver' },
              });
               // 이미 가입된 네이버 프로필이면 성공
              if (exUser) {
                  done(null, exUser);
              } else {
                  // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                  const newUser = await User.create({
                    email: profile.email,
                    nick: profile.name,
                    snsId: profile.id,
                    provider: 'naver',
                  });
                  done(null, newUser);
              }
            } catch (error) {
              console.error(error);
              done(error);
            }
        },
      ),
  );
};
