;

(function () {
    var origin = 'https://events.webinar.ru';

    if (window.WBNR) {
        return;
    }

    window.WBNR = {};

    WBNR.Frame = function (id, options) {
        if (!options.src) {
            throw new Error('Specify src')
        }

        if (!options.swfUrl) {
            throw new Error('Specify swfUrl')
        }

        var toReplace = document.getElementById(id);

        var iframe = document.createElement('iframe');
        var iframeWindow;

        iframe.src = options.src;
        iframe.width = options.width || 1280;
        iframe.height = options.height || 800;
        iframe.frameborder = 0;
        iframe.allowfullscreen = true;
        iframe.style = 'border:none; overflow: hidden;';

        iframe.addEventListener('load', function () {
            iframeWindow = iframe.contentWindow;
        });

        toReplace.parentElement.replaceChild(iframe, toReplace);

        this.src = options.src;

        window.addEventListener("message", function (event) {
            if (
                event.origin !== origin ||
                event.source !== iframeWindow ||
                event.data !== 'inited'
            ) {
                return;
            }

            iframeWindow.postMessage(options.swfUrl, origin);
        });
    };
})();
