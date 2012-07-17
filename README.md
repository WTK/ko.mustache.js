#ko.mustache.js

ko.mustache.js is a template engine for [knockoutjs](http://knockoutjs.com). It enables you to use [mustache.js](https://github.com/janl/mustache.js/) template library in place of jQuery.tmpl.

Tested with Knockout v2.1 and mustache.js v0.5.1-dev.

##Notes

Main problem I've encountered while creating this engine is fact that knockout is assuming that any templating library is going to provide a way for embedding and
executing inline javascript from the templates. This is not the case with mustache.js, so for now I was forced to use an *eval* to make it work (which is potentially very evil function to be used ;)).
**Beware** - until I come up with a better solution, please keep in mind, that this library can be vulnerable to XSS attacks unless used with care and proper user-data escaping. You've been warned.

##Usage


Set default template engine to be used by Knockout. Make sure you do that **before** of your custom Knockout related code (like creating observables, applying bindings etc.).

	// Set ko.mustache.js as a template engine for knockout
	ko.setTemplateEngine(new mustacheTemplateEngine());

##Example

	<html>
	<head>
		<title>ko.mustache.js example</title>
		<script type="text/javascript" src="lib/mustache.js"></script>
		<script type="text/javascript" src="lib/knockout-2.1.0.js"></script>
		<script type="text/javascript" src="ko.mustache.js"></script>
		<script>
			ko.setTemplateEngine(new mustacheTemplateEngine());
		</script>
	</head>
	<body>
		<!-- place for rendered template -->
		<div data-bind='template: "personTemplate"'></div>

		<!-- mustache template -->
		<script id='personTemplate' type='text/html'>
			{{ name }} is {{ age }}
			<button data-bind='click: makeOlder'>Make Older</button>
		</script>
	
		<!-- knockout model and bindings -->
		<script type='text/javascript'>
			var viewModel = {
				name: 'Martin',
				age: ko.observable(78),
				makeOlder: function () {
					this.age(this.age() + 1);
				}
			};
			ko.applyBindings(viewModel);
		</script>
	</body>
	</html>


##Copyright

Copyright (c) 2011 Marcin Wtorkowski. License: MIT (http://www.opensource.org/licenses/mit-license.php)
