// import JSEncrypt from "jsencrypt/bin/jsencrypt.min";
import { JSEncrypt } from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArhURhjqNmjMd/bhof3bSB4QlQc6dCV3jSf02OAkP1MOYzthGnrhQ7kM8hjGISDbiFRoGRs1vMQnf9Ac8zEtnjU5V2wpwq3kiIHNrpDr9LKTyWGCWaAfoJ2PTKCSYUscmA79CMpco9ONvZrxCzmV7Zr+b15dxyuyOeZOekjaa3qqoFI3y19Q+Gere5LzgcOPj/QsVHUw1XOddoE78uJEHxhzjsgPtgh5woBSmdsf1w6pm6ZicOQ9QCjgxEa/RE7GBd0snfet2ItxcLO6Uv4xrz+NEnYr/5Aj0cf/GzY+UjCcimL2T0U3HuAGX9TfjUN21T6UcP+vcjG6OV8QpwyxMAwIDAQAB';

const privateKey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuFRGGOo2aMx39uGh/dtIHhCVBzp0JXeNJ/TY4CQ/Uw5jO2EaeuFDuQzyGMYhINuIVGgZGzW8xCd/0BzzMS2eNTlXbCnCreSIgc2ukOv0spPJYYJZoB+gnY9MoJJhSxyYDv0Iylyj0429mvELOZXtmv5vXl3HK7I55k56SNpreqqgUjfLX1D4Z6t7kvOBw4+P9CxUdTDVc512gTvy4kQfGHOOyA+2CHnCgFKZ2x/XDqmbpmJw5D1AKODERr9ETsYF3Syd963Yi3Fws7pS/jGvP40Sdiv/kCPRx/8bNj5SMJyKYvZPRTce4AZf1N+NQ3bVPpRw/69yMbo5XxCnDLEwDAgMBAAECggEATq49FnMej0RtWMDhkkLtGPKUOFMfTR1/XnCw8dC+tAaX6V19Rb2+7oG7OFfo5eLQeoMhtRyjFgIFk/E1fIzUR9zRF0h3tjjwwMQKMddrmKMQ2fsF4A0605rd1HX91uQl/WmTjPQfUdf+AOw0Mb9ScBVIZcAQcYxLtQ2QjTta8ipnKufUxXCvGu+dH92mR8bP1XJ38B2Cz4SI3GiHzyj4xYmbohai6kZX7NHO5v7e2sPobT8v1ZgqevUo5izq6LBkCUu8sMpBNA/eQIM8MvcA8WkAb4EjTLk0M4VWBIMwgmOuzN2QJE9LZuGUPi63lCUbkbrbQvUiaLoEKiaBXGpjmQKBgQDTwtmJX+7MrUxCjx0MCFEp//9yVrx/aAuCpCL8xP3n5OrwZTrn1XrbHaxeBTX1Rk76HKBH4BaTRwaBgAmordN9hOaRhnLo6NM0Q6YTk0WsW95zRuESJLZnHdD0T/dAAwUBbNfbebQ9ec+FNwBvoxt8gxiLJaw7wQKyCr7siPHCtwKBgQDScyAXhrtFgZ1bY/Sg+1klESdrD5hsTgDeN8RtDqmJALp3U15Wwl0ymCmyPzz+0ydIdSF+OyeqYy3H18apXW33sciNzbgpIFdIE069AxNi3MIJ0CEgw+yxJ4om1ZDAI37jWMiPZ1e4mZK2eAxhL1joGLqsucKTi/1/HaUhRQRFFQKBgQCDDZCxixRvyURr4MQaQT9x3cPKkFFiDBMri8c3Zfa5QBwCILQe7Ch3WNrm6RSmsheIhJTRRqbSCN/G32Wa5dEAWnKTV4DgEc88Bi3O6ZLyA30dHJ2IK/5SvMonmSGslPHRGvpQEvbwIOXETPDRJkGJglx7KRp5dI7lfu7/1hTA6wKBgBOPJZ1qJT+Zg1F6IcNQeQGL7ZjysxzlxwjgL/5ezXzxN2NduTfhCp5oK//oBrg8UbtXP4ym3NHmM9wN/uXAzDaoLFaZlxMjcVk+iiPhBE087T/SOzH7Y6U3YoynbrOc2O8yUjmZxjpe85bH44aoyt+PZNIm1aG28hF9ZNqJupLdAoGASDkG271xvOQLyMv9sCNyEH4JHs4fqCKRH6FAtCg9jFZxqiCXRgZjpNsygp12DyX2J8NQL0/eeeVHgmp4fbcaLRq2We164SwjJPqjx0LI+hjBxPZ6Sw2cipg9/x2XfgP+MYO7IJJySWDqdkUeZCZl2t3FwqyotbfbuXjN98xD7fQ=';

//登入注冊公鑰(登入,注冊,私鑰不能放前端)
const LoginRegistpublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv9PdHGOpTtDJWj6W9AFpXXPehVgFCCNwtEDru/WarfCCRaAIaMoUq2/RBMci+ULyf+2MKjqx70IqDonW9lJdlOgYBExI/0otIMwmCqW+yV3F4MLgRRN8YEjffGZTQIJoEgYwvYBjIRGQSC4ce98q/50nX+7Ne9QbuxO2FtBjUwrFMxdtcsrgo70hxWbtDgD678aDJRgonbldm1RqCwUb1ye8FSFlk5AXU2BETx2vT5eXyqGg8dwuAOw09Y0yjrWjd18Z+gufulLJ4SrlWFMAVeNfuCmRvLJlbNr/lgpyPuzcSc+I0gMRPcHM+vJXSxHT6nzg30zeDROGDHazalrP6wIDAQAB';


// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPrivateKey(privateKey); // 设置私钥
  return encryptor.decrypt(txt); // 对数据进行解密
}


// 登入注冊加密
export function LoginRegistencrypt(txt) {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(LoginRegistpublicKey); // 设置公钥
  return encryptor.encrypt(txt); // 对数据进行加密
}