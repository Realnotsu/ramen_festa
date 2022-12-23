
/************************************
フロートボタン用
*************************************/
$(function () {
  //その場から
  $(".ft_check").on("inview", function (event, isInView) {
    if (isInView) {
      $('.ft_btn').removeClass("show");
    }else{
      $('.ft_btn').addClass("show");
    }
  });
  inview()

  $(window).on('load', function() {
    add_class_when_visible($('.ft_check'));
});

// function add_class_when_visible(target) {
//     var scrollTop = $(window).scrollTop();
//     var scrollBtm = scrollTop + $(window).height();
//     var targetTop = 100;
//     // var targetTop = target.offset().top;
//     var targetBtm = targetTop + target.height();
//     if(scrollBtm > targetTop ) {
//       $('.ft_btn').removeClass("show");
//     } else {
//       $('.ft_btn').addClass("show");
//     }
// }
});
$(function() {
  $(window).scroll(function() {
    let scroll = $(this).scrollTop();
    if(scroll < 200 ) {
      $('.ft_btn').removeClass("show");
    } else {
      $('.ft_btn').addClass("show");
    }
   });
  });

/************************************
スムーズスクロール
*************************************/
// ページトップ
$("#js-pagetop").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    500
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

function pageScroll(headerHeight) {
  /* 固定されたヘッダーに対応したスムーズスクロール */
  $(function () {
    $('a[href^="#"]').on("click", function () {
      var target = $($(this).attr("href"));
      smoothScroll(target, headerHeight);
      return false;
    });
  });
  /* 別ページ用ページ内リンク */
  $(function () {
    var urlHash = location.hash; //URLのハッシュタグを取得
    if (urlHash) {
      //ハッシュタグが有る場合
      var target = $(urlHash);
      $("body,html").scrollTop(0);
      smoothScroll(target, headerHeight);
    }
  });
}

function smoothScroll(target, headerHeight) {
  var animeSpeed = 500;
  setTimeout(function () {
    //無くてもいいが有ると動作が安定する
    $("body,html")
      .stop()
      .animate(
        {
          scrollTop: target.offset().top - headerHeight,
        },
        animeSpeed
      );
  }, 0);
}

/************************************
inview
*************************************/
function inview() {
  //下から上
  $(".act-view01").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("fadeInDown");
    }
  });

  //左から右
  $(".act-view02").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("fadeInLeft");
    }
  });

  //右から左
  $(".act-view03").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("fadeInRight");
    }
  });

  //上から下
  $(".act-view04").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("fadeInTop");
    }
  });

  //その場から
  $(".act-view05").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("fadeInStay");
    }
  });

  //その場から
  $(".is-action").on("inview", function (event, isInView) {
    if (isInView) {
      //表示領域に入った時
      $(this).addClass("on");
    }
  });
}
/************************************
タイマー　時刻で表示切り替え
*************************************/

  $(".set_show_hide").each(function(index, target) {
    var startDate = '';
    var endDate = '2022/10/2 19:00';
    var nowDate = new Date();

    if (startDate) {
      startDate = new Date(startDate);
    } else {
      startDate = nowDate;
    }
    if (endDate) {
      endDate = new Date(endDate);
    }

    if (startDate <= nowDate && (!endDate || nowDate <= endDate)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });


