$(document).ready(function() {
    $("#get-involved-btn").click(function() {
        $("#modal-inactive").attr({'id': 'modal-active'});
        $(".wrapper").attr({'id': 'wrapper-modal'});
    });
    $('#arvaio-btn').click(function() {
        window.open('http://arva.io', '_BLANK');
    })
});