module.exports = {
  '/api': {
    target: 'https://cnodejs.org', // https会表示证书无效
    changeOrigin: true, // 如果此项不设置, 那么请求就会报错
    logLevel: 'debug', // 设置查看详细的代理信息
  },
  '/cgi-bin': {
    target: 'https://fudao.qq.com/',
    changeOrigin: true,
    headers: {
      origin: 'https://fudao.qq.com/pc/course.html',
      referer: 'https://fudao.qq.com/pc/course.html?course_id=12748',
      dnt: 1,
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      cookie: 'pgv_pvi=272781312; RK=nPGeXiPvuq; tvfe_boss_uuid=ca7433346d4ec606; mobileUV=1_1600d2213c4_d7bee; pgv_pvid=8865894656; pgv_si=s9825168384; ptcz=04a36eb8612a430132d13b169c80f298d6f9b9ce3b6ad8a7f891aba1a5f90e1c; pgv_info=ssid=s9131647348&pgvReferrer=; eas_sid=61U541q5T962i0b1n6W9B4q3c3; pac_uid=1_1554799901; user_id=446256354; session_id=d5607c8ed33063d249dd8fdb; qqmusic_uin=1554799901; qqmusic_fromtag=6; qqmusic_guid=1554799901; rv2=804565F97DC9C95F5D553E19149FDFD6A4E500A3C43715988E; property20=25A2168B1E9FFBA0C354FB68394E1F573F254E9815ACB7825B00F038D6FDF586F94670BC3CD49CA6; qqmusic_key=@0nKQZn3hF; qqmusic_vkey=39E72D75EDE9EA38EFC421DA88CD74519A24405166C84882247072D12865DEFC12D4859DF43342208DA8F50DCE3DA6838169BB171FD54BF5; o_cookie=1070309568; ptui_loginuin=1554799901; ptisp=ctc; IED_LOG_INFO2=userUin%3D1554799901%26nickName%3DI%252BBELIEVE%26userLoginTime%3D1531055112; pt2gguin=o1070309568; luin=o1070309568; from_source=none; _qpsvr_localtk=0.16652252352429842; uin=o1070309568; skey=@8RzvboqIU; lskey=0001000021831966efed59b1d9ec7e723a55a243c626bfe3d929e51e1007fc01320e64cf69a999eefcbfe040; p_uin=o1070309568; pt4_token=HCQbhfPKQYyMWs-nXHjfK3TftODOzfFUc3aeUCqWjIY_; p_skey=WBqCdHx3Oo5W4DOM6N1TH9rE8jzlv53AMH0GPQqv1dw_; p_luin=o1070309568; p_lskey=000400005d3b5df53000e3791155494a33b83359fde9f4d0ae2eaad85669eaa663141ca2427045aa51cc032a; plCache=discover.hotcourse_0_0',
    },
  },
  '/.+': {
    target: 'https://cnodejs.org', // https会表示证书无效
    changeOrigin: true, // 如果此项不设置, 那么请求就会报错
    pathRewrite: {
      '^/topics': '/api/v1/topics',
    },
  },
}
