let firebaseConfig = {
  apiKey: "AIzaSyAzpnkmJ5G3yF0wx25Rgjqdq7GDMomuxNk",
  authDomain: "tanabata-5380a.firebaseapp.com",
  databaseURL: "https://tanabata-5380a.firebaseio.com",
  projectId: "tanabata-5380a",
  storageBucket: "tanabata-5380a.appspot.com",
  messagingSenderId: "532544675239",
  appId: "1:532544675239:web:710da3967111eb99ecaa82",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

let wishesId = [];
let checkId = {};
let data = {};
let tone = {
  red: "#fe6961",
  white: "snow",
  violet: "#cb99c9",
  blue: "#aec6cf",
  yellow: "#fdfd96",
};
$(document).ready(() => {
  $("#opt").on("click", () => {
    // console.log("eiei");
    $("#wishopt").prop("checked", true);
  });

  $(".readmore").on("click", () => {
    // console.log("click");
    $("#more").slideDown(2000);
    $(".readmore").hide();
    $(".closereadmore").show();
  });

  $(".closereadmore").on("click", () => {
    $("#more").slideUp(1500);
    $(".readmore").show();
    $(".closereadmore").hide();
  });

  db.collection("wishes").onSnapshot((snap) => {
    for (let i = 0; i < snap.docs.length; i++) {
      let id = snap.docs[i].id;
      if (id in checkId) {
      } else {
        checkId[id] = 1;
        wishesId.push(id);
        $(".wishes").text(wishesId.length + " wishes");
        db.collection("wishes")
          .doc(id)
          .onSnapshot((doc) => {
            // console.log(doc.data());
            data[id] = {
              color: doc.data().color,
              wish: doc.data().wish,
              name: doc.data().name,
            };
          });
      }
    }
  });
  $(".card").on("click", () => {
    $(".card").hide();
  });
  $(".bamboo").on("click", () => {
    // console.log(wishesId);
    let i = Math.round(Math.random() * wishesId.length);
    if (i >= wishesId.length) i = 0;
    let id = wishesId[i];
    if (id == undefined) {
      alert("We are loading <3");
    } else {
      $(".card").show();
      // console.log(data[id]);
      $(".wname").text(data[id].name);
      $(".wwish").text(data[id].wish);

      $(".card").css("background-color", tone[data[id].color]);
    }
  });
  let myWish = "";
  //pls optimize
  $("#label1").on("click", () => {
    if ($("#label1").attr("lang") != "thai") {
      $("#label1").attr("lang", "thai");
      $("#label1").text("ขอให้มีความสุข");
    } else {
      $("#label1").attr("lang", "jap");
      $("#label1").text("幸せになりますように。");
    }
  });
  $("#label2").on("click", () => {
    if ($("#label2").attr("lang") != "thai") {
      $("#label2").attr("lang", "thai");
      $("#label2").text("ขอให้มีสุขภาพแข็งแรง");
    } else {
      $("#label2").attr("lang", "jap");
      $("#label2").text("健康でありますように。");
    }
  });
  $("#label3").on("click", () => {
    if ($("#label3").attr("lang") != "thai") {
      $("#label3").attr("lang", "thai");
      $("#label3").text("ขอให้เจอเนื้อคู่");
    } else {
      $("#label3").attr("lang", "jap");
      $("#label3").text("運命の人に出会えますように。");
    }
  });
  $("#label4").on("click", () => {
    if ($("#label4").attr("lang") != "thai") {
      $("#label4").attr("lang", "thai");
      $("#label4").text("ขอให้ปีนี้เป็นปีที่ดีเยี่ยม");
    } else {
      $("#label4").attr("lang", "jap");
      $("#label4").text("素晴らしい年になりますように。");
    }
  });
  $("#label5").on("click", () => {
    if ($("#label5").attr("lang") != "thai") {
      $("#label5").attr("lang", "thai");
      $("#label5").text("ขอให้โลกสงบสุข");
    } else {
      $("#label5").attr("lang", "jap");
      $("#label5").text("せかいがへいわになりますように。");
    }
  });
  $("#my-form").submit((e) => {
    e.preventDefault();
    let wishlist = [
      "#wish1",
      "#wish2",
      "#wish3",
      "#wish4",
      "#wish5",
      "#wishopt",
    ];
    let color = "";
    for (i in wishlist) {
      let wishId = wishlist[i];
      if ($(wishId).prop("checked")) {
        if (wishId != "#wishopt") {
          myWish = $(wishId).val();
          break;
        } else {
          myWish = $("#opt").val();
          break;
        }
      }
    }
    color = $("#color").val();
    let name = $("#name").val();
    if (myWish == "") {
      alert("Please enter your wish =)");
    } else {
      // console.log(myWish, color);
      db.collection("wishes")
        .add({
          name: name,
          color: color,
          wish: myWish,
        })
        .then(() => {
          alert("Success!");
          // console.log("Added");
        });
    }
  });
});
