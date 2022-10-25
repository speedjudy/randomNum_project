<!DOCTYPE html>
<html lang="en">

<head>
    <title>Setting</title>
    @include('layout.head')
</head>

<body>

    <div class="container">
        <div class="jumbotron">
            <div class="row">
                <div class="col-sm-4 col-lg-3 col-md-3"></div>
                <div class="col-sm-4 col-lg-6 col-md-6">
                    <h2>Setting</h2>
                    <div id="enter_form">
                        <div class="form-group">
                            <label for="waiting_time">Guest pool list waiting seconds:</label>
                            <input type="number" disabled max="1000" class="form-control" id="waiting_time">
                        </div>
                        <div class="form-group">
                            <label for="countdown_time">Count down seconds:</label>
                            <input type="number" disabled max="1000" class="form-control" id="countdown_time">
                        </div>
                        <br>
                        <button type="button" id="save" class="btn btn-primary">Save</button>
                        <button type="button" id="format" class="btn btn-danger">Clear</button>
                    </div>
                </div>
                <div class="col-sm-4 col-lg-3 col-md-3"></div>
            </div>
        </div>

    </div>
    <script>
        $("#save").click(function() {
            save();
        });
        $("#format").click(function() {
            if (confirm("Really clear the data?")) {
                $.get(
                    "/setting/clear", {},
                    function(res) {
                        toastr.success("Cleared success.");
                    }
                );
            }
        });
        getData();

        function save() {
            $.get(
                "/setting/save", {
                    waiting_time: $("#waiting_time").val(),
                    countdown_time: $("#countdown_time").val()
                },
                function(res) {
                    toastr.success("Success.");
                    getData();
                }
            );
        }

        function getData() {
            $.get(
                "/setting/getdata", {},
                function(res) {
                    $("#waiting_time").val(res.waiting_time);
                    $("#countdown_time").val(res.countdown_time);
                }, "json"
            );
        }
    </script>
</body>

</html>