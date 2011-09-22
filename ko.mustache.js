/*!
 * Mustache Template Engine for Knockout
 * http://github.com/WTK/ko.mustache.js
 *
 * Copyright Marcin Wtorkowski
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */
mustacheTemplateEngine = function () {
    this.getTemplateNode = function (template) {
        var templateNode = document.getElementById(template);
        if (templateNode == null)
            throw new Error("Cannot find template with ID=" + template);
        return templateNode;
    }

    this.renderTemplate = function (templateId, data, options) {
        /*
         * Combine passed data with list of references with callbacks added previously by
         * #createJavaScriptEvaluatorBlock
         */
        data = combineObjects(data, codeBlocks);       
        // render with mustache (they return string so we have to parse it to list of nodes since knockout.js expects us to do so)
        renderedMarkup = Mustache.to_html(this.getTemplateNode(templateId).text, data);
        //since knockout js has jQuery as a dependency anyway, we can use it to parse that text into a document fragment using jQuery.clean().
        return jQuery.clean([renderedMarkup], document);
    }

    this.isTemplateRewritten = function (templateId) {
        return this.getTemplateNode(templateId).isRewritten === true;
    }

    this.rewriteTemplate = function (template, rewriterCallback) {
        var templateNode = this.getTemplateNode(template);
        var rewritten = rewriterCallback(templateNode.text);
        
        templateNode.text = rewritten;
        templateNode.isRewritten = true;
    }

    /*
     *  Since mustache.js doesn't support inline javascript into templates
     *  and knockout.js assumes otherwise we have to return a named simple tag and
     *  keep reference to the function under that name.
     *  That named function gets then called by mustache.js while rendering.
     *  It's **double evil** because not only using *eval* but also *with* without
     *  any parameter parsing.
     *
     *  @TODO: Come up with a way of doing it without eval, probably a some kind of parser.
     *  @TODO: Come up with a better way of storing references to functions, later on called
     *  by mustache.
     **/
    this.createJavaScriptEvaluatorBlock = function (script) {
        var codeBlockName = "_ko_mustache_block"+codeBlocksCount,
            codeBlockTag = "{{{"+codeBlockName+"}}}";

        // save reference to function to call when rendering template with mustache
        codeBlocks[codeBlockName] = function() {
            return eval("with(this) {"+script+"}");
        };
        // increase number of blocks kept
        codeBlocksCount++;
        
        return codeBlockTag;
    }

    // privates to mustacheTemplateEngine
    var codeBlocksCount = 0,
        codeBlocks = {},
        combineObjects = function(input, to_merge) {
            for (name in to_merge) {
                input[name] = to_merge[name];
            }
            return input;
        };
};
mustacheTemplateEngine.version = '0.8.0'
mustacheTemplateEngine.prototype = new ko.templateEngine();