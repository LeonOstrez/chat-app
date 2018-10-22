var socket = io();

function scrollToBottom () {
    //selectors
    var messages = jQuery('#messages');
    var newMessage =  messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

socket.on('connect', function () {
    console.log('connected to server');
    var params = jQuery.deparam(window.location.search);
    params.room = "SWINGERS";
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log('no error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    
    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var template = jQuery('#location-message-template').html();
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: `).append(`<a href="${message.url}" target="_blank">Location</a>`);

    // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('');
    });
});


var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location'); 
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location'); 
        alert('Unable to fetch location');
    });
});