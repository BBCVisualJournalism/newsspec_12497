define(['bootstrap', 'facewall'], function (news, Facewall) {

    var facewall = new Facewall();
    facewall.init();

    // ###################################################################################################
    // The following is example code and can/should be used where required.
    // ###################################################################################################

    // news.hostPageSetup('' +
    //     'document.body.id = "hostPageCallbackWorks";' +
    //     'document.body.style.background = "lime";'
    // );

    // setTimeout(function () {
    //     news.pubsub.emit('istats', ['panel-clicked', 'newsspec-interaction', 3]);
    // }, 500);
    // setTimeout(function () {
    //     news.pubsub.emit('istats', ['quiz-end', 'newsspec-interaction', true]);
    // }, 2000);

    // var isInTheNewsApp = news.isInTheNewsApp();

    // var sharetools = new ShareTools({
    //     label: 'Share this page',
    //     holderEl: $('.tempShareToolsHolder'),
    //     messages: {
    //         twitter: 'Custom message #BBCNewsGraphics',
    //         facebook: {
    //             title: 'Facebook share message',
    //             description: 'Further detailed information here', //Optional
    //             image: 'http://bbc.co.uk/some-image.png' //Optional
    //         },
    //         email: {
    //             subject: 'SUPER IMPORTANT EMAIL',
    //             message: 'BBC News has new bespoke'
    //         },
    //         app: {
    //             title: 'Shiny new app',
    //             text: 'Hello world'
    //         }
    //     },
    //     shareUrl: document.referrer,
    //     isInTheNewsApp: isInTheNewsApp,
    //     template: 'dropdown'
    // });

    // Example: how to set the iframe to be a constant static height
    // news.setStaticIframeHeight(10000);

    // ###################################################################################################
    // The only code necessary for the iframe scaffold to WORK is below this line.
    // ###################################################################################################

    news.pubsub.emit('pageLoaded');
});
