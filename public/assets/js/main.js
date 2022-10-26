$(document).ready(function () {
    
    var cycle_minutes = 120000; //120000
    $.get(
        "/run_server/active",
        {
            flag: "active",
            date: Date.now()
        }, function (res) {
            console.log(res);
            if (res.length == 1) {
                var check = setInterval(() => {
                    set();
                }, cycle_minutes);
                window.onbeforeunload = function() {
                    console.log('event');
                    $.get(
                        "/run_server/active",
                        {
                            flag: "deactive",
                            date: Date.now()
                        }, function (res) {

                        },"json"
                    );
                }
            } else {
                console.log(Date.now()-res[0]['date']*1);
                var chance = Date.now()-res[0]['date']*1;
                if (chance > cycle_minutes) {
                    console.log(chance % cycle_minutes)
                    var timeout = chance % cycle_minutes;
                } else {
                    var timeout = cycle_minutes - chance;
                }
                console.log(timeout);
                setTimeout(function(){
                    getData();
                    var check = setInterval(() => {
                        getData();
                    }, cycle_minutes);
                }, timeout);
            }
        },"json"
    );
    
    function set() {
        $.get(
            "/run_server/push",
            {
                date: Math.floor(Date.now() / 1000),
            },
            function (res) {
                getData();
            }
        );
    }
    // getData();
    var i_temp = 1;
    sessionStorage.setItem("set-top-animation", "");
    sessionStorage.setItem("first_time", "");
    sessionStorage.setItem("second_time", "");
    sessionStorage.setItem("third_time", "");
    sessionStorage.setItem("fourth_time", "");
    var setMins = 600;
    if (sessionStorage.getItem("first_time")) {
        var timeVal1 = getMin(sessionStorage.getItem("first_time") * 1 + setMins - Math.floor(Date.now() / 1000));
        $(".first_time").text(timeVal1);
    }
    if (sessionStorage.getItem("second_time")) {
        var timeVal2 = getMin(sessionStorage.getItem("second_time") * 1 + setMins - Math.floor(Date.now() / 1000));
        $(".second_time").text(timeVal2);
    }
    if (sessionStorage.getItem("third_time")) {
        var timeVal3 = getMin(sessionStorage.getItem("third_time") * 1 + setMins - Math.floor(Date.now() / 1000));
        $(".third_time").text(timeVal3);
    }
    if (sessionStorage.getItem("fourth_time")) {
        var timeVal4 = getMin(sessionStorage.getItem("fourth_time") * 1 + setMins - Math.floor(Date.now() / 1000));
        $(".fourth_time").text(timeVal4);
    }
    setInterval(function () {
        if (sessionStorage.getItem("first_time")) {
            var timeVal1 = getMin(sessionStorage.getItem("first_time") * 1 + setMins - Math.floor(Date.now() / 1000));
            $(".first_time").text(timeVal1);
        }
        if (sessionStorage.getItem("second_time")) {
            var timeVal2 = getMin(sessionStorage.getItem("second_time") * 1 + setMins - Math.floor(Date.now() / 1000));
            $(".second_time").text(timeVal2);
        }
        if (sessionStorage.getItem("third_time")) {
            var timeVal3 = getMin(sessionStorage.getItem("third_time") * 1 + setMins - Math.floor(Date.now() / 1000));
            $(".third_time").text(timeVal3);
        }
        if (sessionStorage.getItem("fourth_time")) {
            var timeVal4 = getMin(sessionStorage.getItem("fourth_time") * 1 + setMins - Math.floor(Date.now() / 1000));
            $(".fourth_time").text(timeVal4);
        }
    }, 1000);
    function getData() {
        $.get(
            "/score/getdata",
            {},
            function (res) {
                if (res[0].length > 0) {
                    
                    var line = res[2];
                    var tbNum = res[1];
                    var res = res[0];
                    $(".top_layer").css("visibility", "hidden");
                    $(".top")
                        .prepend(`<div class="text-white rounded-3 top_layer_temp">
                        <span class="display-5 table_order_num" style="float: right;">TABLE<br> <span class="table_num"></span></span>
                        <span class="top_rows_layer display-1"><span id="top_step_first_order">READY TO</span><br> <span id="top_step_second_order">PLAY</span></span>
                    </div>`);
                    $(".top_layer_right").css("visibility", "hidden");
                    $(".top")
                        .append(`<div class="text-white rounded-3 top_layer_right_temp">
                        <span class=" display-5 table_order_num" style="float: left;">TABLE<br> <span class="table_num_right"></span></span>
                        <span class="top_rows_layer display-1"><span id="top_step_first_order_right">READY TO</span><br> <span id="top_step_second_order_right">PLAY</span></span>
                    </div>`);
                    setTimeout(function () {
                        $(".top_layer_temp").remove();
                        $(".top_layer_right_temp").remove();
                        // $(".lines").first().remove();
                    }, 1900);
                    $(".top").addClass("removed");
                    $(".top").removeClass("top");
                    setTimeout(function () {
                        var next = $(".lines").children()[i_temp];
                        // $(next).css("position", "absolute");
                        // $(next2).css("position", "absolute");
                        // $(next3).css("position", "absolute");
                        // $(next4).css("position", "absolute");
                        $(next).removeClass("mt-4");
                        $(next).animate({ marginTop: "-174px" }, 1500);
                        $(next)
                            .find(".time_div")
                            .animate({ display: "none" }, 1500);
                        setTimeout(function () {
                            $(next).addClass("top");
                            // $(".top").children().css("position", "absolute");
                            var four_bottom = $(".top").html();
                            var three_bottom_content =
                                $(".lines").children()[i_temp].innerHTML;
                            var three_bottom = $(".lines").children()[i_temp];
                            var two_bottom_content =
                                $(".lines").children()[i_temp + 1].innerHTML;
                            var two_bottom = $(".lines").children()[i_temp + 1];
                            var one_bottom_content =
                                $(".lines").children()[i_temp + 2].innerHTML;
                            var one_bottom = $(".lines").children()[i_temp + 2];
                            $(".top").children().remove();
                            $(three_bottom).children().remove();
                            $(two_bottom).children().remove();
                            $(one_bottom).children().remove();
                            var new_item =
                                $(`<div class="text-white rounded-3 top_layer">
                                    <span class="display-5 table_order_num" style="float: right;">TABLE<br> <span class="table_num"></span></span>
                                    <span class="top_rows_layer display-1"><span id="top_step_first_order">READY TO</span><br> <span id="top_step_second_order">PLAY</span></span>
                                </div>
                                <div style="width:2.5rem;">
                                    <div class="start text-white display-3">DÉMARRER</div>
                                </div>
                                <div class="text-white rounded-3 top_layer_right">
                                    <span class=" display-5 table_order_num" style="float: left;">TABLE<br> <span class="table_num_right"></span></span>
                                    <span class="top_rows_layer display-1"><span id="top_step_first_order_right">READY TO</span><br> <span id="top_step_second_order_right">PLAY</span></span>
                                </div>`).hide();
                            $(".top").append(new_item);
                            $(three_bottom).append(four_bottom);
                            $(two_bottom).append(three_bottom_content);
                            $(one_bottom).append(two_bottom_content);
                            var new_item3 = $(four_bottom).hide();
                            var new_item2 = $(three_bottom_content).hide();
                            var new_item1 = $(one_bottom_content).hide();

                            new_item.fadeIn(1500);
                            new_item3.fadeIn(1500);
                            new_item2.fadeIn(1500);
                            new_item1.fadeIn(1500);
                            var bottom_new_item =
                                $(`<div class="row mt-4"><div class="col-xs-2 col-sm-2 col-lg-2 col-md-2 text-white rounded-3 push_lists first_step_div" style="width:13%;">
                                        <span class="rows_layer first_step"><span id="first_step_first_order">READY TO</span><br> <span id="first_step_second_order">PLAY</span></span>
                                    </div>
                                    <div class="col-xs-8 col-sm-8 col-lg-8 col-md-8 text-center time_div" style="width:74%;">
                                        <span class="display-6 timing first_time text-white"></span>
                                    </div>
                                    <div class="col-xs-2 col-sm-2 col-lg-2 col-md-2 text-white rounded-3 push_lists first_step_div" style="text-align:right;width:13%;">
                                        <span class="rows_layer first_step"><span id="first_step_first_order_right">READY TO</span><br> <span id="first_step_second_order_right">PLAY</span></span>
                                    </div></div>`).hide();
                            $(".lines").append(bottom_new_item);
                            bottom_new_item.fadeIn(2000);
                            if (line % 2 == 1) {
                                $(".first_step_div").css("background-color: #009CDA;");
                                $(".second_step_div").css("background-color:#004884;");
                                $(".third_step_div").css("background-color: #009CDA;");
                                $(".fourth_step_div").css("background-color:#004884;");

                                $(".first_step_div").removeClass("animate_blue");
                                $(".first_step_div").addClass("animate_lightblue");
                                $(".second_step_div").removeClass("animate_lightblue");
                                $(".second_step_div").addClass("animate_blue");
                                $(".third_step_div").removeClass("animate_blue");
                                $(".third_step_div").addClass("animate_lightblue");
                                $(".fourth_step_div").removeClass("animate_lightblue");
                                $(".fourth_step_div").addClass("animate_blue");
                                $(".fourth_step_div_right").removeClass("animate_lightblue");
                                $(".fourth_step_div_right").addClass("animate_blue");
                            } else {
                                $(".first_step_div").css("background-color: #004884;");
                                $(".second_step_div").css("background-color:#009CDA;");
                                $(".third_step_div").css("background-color: #004884;");
                                $(".fourth_step_div").css("background-color:#009CDA;");

                                $(".first_step_div").removeClass("animate_lightblue");
                                $(".first_step_div").addClass("animate_blue");
                                $(".second_step_div").removeClass("animate_blue");
                                $(".second_step_div").addClass("animate_lightblue");
                                $(".third_step_div").removeClass("animate_lightblue");
                                $(".third_step_div").addClass("animate_blue");
                                $(".fourth_step_div").removeClass("animate_blue");
                                $(".fourth_step_div").addClass("animate_lightblue");
                                $(".fourth_step_div_right").removeClass("animate_blue");
                                $(".fourth_step_div_right").addClass("animate_lightblue");
                            }
                            if (tbNum["left_num"] != 0) {
                                $(".table_num").text(tbNum["left_num"]);
                                $(".table_num_right").text(tbNum["right_num"]);
                            }
                            for (var i = 0; i < res.length; i++) {
                                console.log(res[i]["date"] * 1 +setMins - Math.floor(Date.now() / 1000));
                                var number = res[i]["number"];
                                if (number.length == 1) {
                                    number = "000" + number;
                                } else if (number.length == 2) {
                                    number = "00" + number;
                                } else if (number.length == 3) {
                                    number = "0" + number;
                                }
                                if (number == "OPEN") {
                                    number = "OPEN";
                                }
                                console.log();
                                if (res[i]["step"] == 1) {
                                    sessionStorage.setItem(
                                        "first_time",
                                        res[i]["date"]
                                    );
                                    if (res[i]["order_num"] == 1) {
                                        console.log("step 1");
                                        $("#first_step_first_order").text(number);
                                    } else if (res[i]["order_num"] == 2) {
                                        $("#first_step_second_order").text(number);
                                    } else if (res[i]["order_num"] == 3) {
                                        $("#first_step_first_order_right").text(number);
                                    } else if (res[i]["order_num"] == 4) {
                                        $("#first_step_second_order_right").text(
                                            number
                                        );
                                    }
                                } else if (res[i]["step"] == 2) {
                                    sessionStorage.setItem(
                                        "second_time",
                                        res[i]["date"]
                                    );
                                    if (res[i]["order_num"] == 1) {
                                        $("#second_step_first_order").text(number);
                                    } else if (res[i]["order_num"] == 2) {
                                        $("#second_step_second_order").text(number);
                                    } else if (res[i]["order_num"] == 3) {
                                        $("#second_step_first_order_right").text(
                                            number
                                        );
                                    } else if (res[i]["order_num"] == 4) {
                                        $("#second_step_second_order_right").text(
                                            number
                                        );
                                    }
                                } else if (res[i]["step"] == 3) {
                                    sessionStorage.setItem(
                                        "third_time",
                                        res[i]["date"]
                                    );
                                    if (res[i]["order_num"] == 1) {
                                        $("#third_step_first_order").text(number);
                                    } else if (res[i]["order_num"] == 2) {
                                        $("#third_step_second_order").text(number);
                                    } else if (res[i]["order_num"] == 3) {
                                        $("#third_step_first_order_right").text(number);
                                    } else if (res[i]["order_num"] == 4) {
                                        $("#third_step_second_order_right").text(
                                            number
                                        );
                                    }
                                } else if (res[i]["step"] == 4) {
                                    var time =res[i]["date"] * 1 +setMins - Math.floor(Date.now() / 1000);
                                    console.log(time);
                                    sessionStorage.setItem(
                                        "fourth_time",
                                        res[i]["date"]
                                    );
                                    if (res[i]["order_num"] == 1) {
                                        $("#fourth_step_first_order").text(number);
                                    } else if (res[i]["order_num"] == 2) {
                                        $("#fourth_step_second_order").text(number);
                                    } else if (res[i]["order_num"] == 3) {
                                        $("#fourth_step_first_order_right").text(
                                            number
                                        );
                                    } else if (res[i]["order_num"] == 4) {
                                        $("#fourth_step_second_order_right").text(
                                            number
                                        );
                                    }
                                } else if (res[i]["step"] == 5) {
                                    setTimeout(function () {
                                        sessionStorage.setItem("set-top-animation","active");
                                        format();
                                    }, 2000);
                                    if (res[i]["order_num"] == 1) {
                                        $(".top #top_step_first_order").text(number);
                                    } else if (res[i]["order_num"] == 2) {
                                        $(".top #top_step_second_order").text(number);
                                    } else if (res[i]["order_num"] == 3) {
                                        $(".top #top_step_first_order_right").text(
                                            number
                                        );
                                    } else if (res[i]["order_num"] == 4) {
                                        $(".top #top_step_second_order_right").text(
                                            number
                                        );
                                    }
                                }
                            }
                        }, 700);
                        i_temp++;
                    }, 1700);
                    if ($(".lines").children().length==7) {
                        $(".lines").children()[1].remove();
                        i_temp--;
                    }
                }
            },
            "json"
        );
    }
    function getMin(timeP) {
        var min = Math.floor(timeP / 60);
        var sec = timeP % 60;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        return min + ":" + sec;
    }
    function format() {
        // $(".first_time").text("EN ATTENTE");
        // $("#first_step_first_order").text("READY TO");
        // $("#first_step_first_order_right").text("READY TO");
        // $("#first_step_second_order").text("PLAY");
        // $("#first_step_second_order_right").text("PLAY");
        // $(".second_time").text("EN ATTENTE");
        // $("#second_step_first_order").text("READY TO");
        // $("#second_step_first_order_right").text("READY TO");
        // $("#second_step_second_order").text("PLAY");
        // $("#second_step_second_order_right").text("PLAY");
        // $(".third_time").text("EN ATTENTE");
        // $("#third_step_first_order").text("READY TO");
        // $("#third_step_first_order_right").text("READY TO");
        // $("#third_step_second_order").text("PLAY");
        // $("#third_step_second_order_right").text("PLAY");
        // $(".fourth_time").text("EN ATTENTE");
        // $("#fourth_step_first_order").text("READY TO");
        // $("#fourth_step_first_order_right").text("READY TO");
        // $("#fourth_step_second_order").text("PLAY");
        // $("#fourth_step_second_order_right").text("PLAY");
        // $("#top_step_first_order").text("READY TO");
        // $("#top_step_first_order_right").text("READY TO");
        // $("#top_step_second_order").text("PLAY");
        // $("#top_step_second_order_right").text("PLAY");
        if (sessionStorage.getItem("set-top-animation") == "active") {
            $(".top_layer").addClass("top-animation");
            $(".top_layer_right").addClass("top-animation");
        } else {
            $(".top_layer").removeClass("top-animation");
            $(".top_layer_right").removeClass("top-animation");
        }
    }
});
