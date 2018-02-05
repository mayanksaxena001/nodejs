$(function () {
    $('#logout').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8081/logout',
            success: function (data) {
                console.log('success');

// Sets the new location of the current window.
window.location = "http://localhost:8081/login";
            }
        });
    });
});