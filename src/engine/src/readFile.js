(function () {
    self.onmessage = function (e) {
        var fileEntry = e.data || {};
        var encoding = fileEntry.encoding;
        var method = fileEntry.method || 'readAsText';
        var file = fileEntry.file;
        var args = [file];
        var reader = new FileReader();

        if (encoding && method === 'readAsText') {
            args.push(encoding);
        }

        reader.onload = function (e) {
            self.postMessage({
                result: e.target.result
            });
        };

        reader.onerror = function (error) {
            self.postMessage({
                error: error
            });
        };

        reader[method].apply(reader, args);
    };
}());