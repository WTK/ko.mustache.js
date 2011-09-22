#ko.mustache.js

ko.mustache.js is a template engine for [knockoutjs](http://knockoutjs.com). It enables you to use [mustache.js](https://github.com/janl/mustache.js/) template library in place of jQuery.tmpl.

Tested with knockout v1.2.1, jQuery 1.4.2 and mustache.js v0.4.0-dev.

##Notes

Main problem I've encountered while creating this engine is fact that knockout is assuming that any templating library is going to provide a way for embedding and
executing inline javascript from the templates. This is not the case with mustache.js, so for now I was forced to use an *eval* to make it work.
**Attention** - until I come up with a better solution, keep in mind, that this library can be vulnerable to XSS attacks unless used with care and proper user-data escaping.

##Installation

Embed following resources in head section of your page:

    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="/js/mustache.js"></script>
    <script type="text/javascript" src="/js/knockout-1.2.1.js"></script>
    <script type="text/javascript" src="/js/ko.mustache.js"></script>

**Important** - set default template engine to be used by knockoutjs. Make sure you do that **before** of your custom knockout.js related code (like creating observables, applying bindings etc.).

    // set ko.mustache.js as a template engine for knockout
    ko.setTemplateEngine(new mustacheTemplateEngine());

##Example

    <html>
        <head>
            <title>ko.mustache.js example</title>
            <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
            <script type="text/javascript" src="/js/mustache.js"></script>
            <script type="text/javascript" src="/js/knockout-1.2.1.js"></script>
            <script type="text/javascript" src="/js/ko.mustache.js"></script>
            <script>
                ko.setTemplateEngine(new mustacheTemplateEngine());
            </script>
        </head>
        <body>
            <!-- place for rendered template -->
            <div data-bind='template: "personTemplate"'> </div>

            <!-- mustache template -->
            <script id='personTemplate' type='text/html'>
                {{ name }} is {{ age }} y
                <button data-bind='click: makeOlder'>Make</button>
            </script>

            <!-- knockout model and bindings -->
            <script type='text/javascript'>
                var viewModel = {
                    name: 'Martin',
                    age: ko.observable(78),
                    makeOlder: function() {
                        this.age(this.age() + 1);
                    }
                };
                ko.applyBindings(viewModel);
            </script>
        </body>
    </html>

##Copyright

Copyright (c) 2011 Marcin Wtorkowski. License: MIT (http://www.opensource.org/licenses/mit-license.php)