/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

/* This test suite tests to make sure that the allFeeds variable has been defined and that it is not empty. */
    describe('RSS Feeds', function() {
          it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* This test suite tests to make sure that a url has been defined and the it functions loops through each feed in
         * the allFeeds object and ensures it has a URL defined and that the URL is not empty. */

            it('should have a URL', function() {
                allFeeds.forEach(function(feeds) {
                    expect(feeds.url).toBeDefined();
                    expect(feeds.url).not.toBe(0);
                    expect(feeds.url).not.toEqual('');
            });
        });
        /* This is a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.*/

            it('should have a name', function() {
               allFeeds.forEach(function(feeds) {
                   expect(feeds.name).toBeDefined();
                   expect(feeds.name).not.toBe(0);
                   expect(feeds.name).not.toEqual('');
            });
        });
    });
    /* This test suite named "The menu" deals with visibility*/

    describe('The Menu', function() {
        /* This test ensures that the menu element is
         * hidden by default. */

        it('menu hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* This test ensures that the menu changes visibility when the menu icon is clicked.*/

        it('menu changes visibility when menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* This test stuite test that when the loadFeed function is called and completes its work,
     * there is at least a single .entry element within the .feed. container. */

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('should have atleast one entry', function(done) {
            expect($('.entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* This test suite ensures when a new feed is loaded by the loadFeed function, that the content actually changes. */

    describe('New Feed Selection', function() {
        var firstContent;
        var secondContent;
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                firstContent = $('.feed').html();
                loadFeed(1, done);
            });
        });
        it('ensures the new feed is loaded and the content changes', function(done) {
            secondContent = $('.feed').html();
            expect(firstContent).not.toEqual(secondContent);
            done();
        });
        afterAll(function(done) {
            loadFeed(0, done);
        });

    });

}());