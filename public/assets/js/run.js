$(document).ready(function () {
    // var cycle_minutes = 120000;
    // var check = setInterval(() => {
    //     set();
    // }, cycle_minutes);
    // function set() {
    //     $.get(
    //         "/run_server/push",
    //         {
    //             date: Math.floor(Date.now() / 1000)
    //         }, function (res) {
    //             // getData();
    //         }
    //     );
    // }
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
                // console.log(Date.now()-res[0]['date']*1);
                // var chance = Date.now()-res[0]['date']*1+1000;
                // if (chance > cycle_minutes) {
                //     console.log(chance % cycle_minutes)
                //     var timeout = chance % cycle_minutes;
                // } else {
                //     var timeout = cycle_minutes - chance;
                // }
                // console.log(timeout);
                // setTimeout(function(){
                //     getData();
                //     var check = setInterval(() => {
                //         getData();
                //     }, cycle_minutes);
                // }, timeout);
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
                // getData();
            }
        );
    }




});