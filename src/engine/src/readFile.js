(function () {
    self.onmessage = function (e) {
        var fileEntry = e.data || {};
        var encoding = fileEntry.encoding;
        var method = fileEntry.method || 'readAsText';
        var file = fileEntry.file;
        var args = [file];
        var reader = new FileReaderSync();

        if (encoding && method === 'readAsText') {
            args.push(encoding);
        }

        try {
            var result = reader[method].apply(reader, args);
            self.postMessage({
                result: result
            });
        } catch (error) {
            self.postMessage({
                error: error
            });
        }
    };
}());
