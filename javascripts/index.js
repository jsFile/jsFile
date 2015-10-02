(function (window, document) {
    var activeClass = 'is-active';
    var $tabs = [].slice.call(document.querySelectorAll('.mdl-layout__tab'), 0);
    var $tabPanels = document.querySelectorAll('.mdl-layout__tab-panel');
    var routes = [];

    $tabs.forEach(function (tab) {
        var hash = tab.attributes.href.value;
        routes.push(hash);
        tab.addEventListener('click', function () {
            location.hash = hash;
        }, false);
    });

    checkHash();
    window.addEventListener("hashchange", checkHash, false);

    function checkHash () {
        var activeTabIndex = routes.indexOf(location.hash);
        if (activeTabIndex < 0) {
            activeTabIndex = 0;
        }

        $tabs.some(function (tab, i) {
            if (tab.classList.contains(activeClass)) {
                tab.classList.remove(activeClass);
                $tabPanels[i].classList.remove(activeClass);
                return true;
            }
        });

        $tabs[activeTabIndex].classList.add(activeClass);
        $tabPanels[activeTabIndex].classList.add(activeClass);
    }
}(window, document, location));