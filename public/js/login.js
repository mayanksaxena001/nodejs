$(function () {
    $('#signup').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:9000/signup',
            success: function (data) {
                console.log('success');
                window.location = "http://localhost:9000/signup";
            }
        });
    });
});