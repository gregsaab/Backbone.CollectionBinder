Backbone.CollectionBinder
=========================
This library offers an easy way to bind models in a collection to a view.

All you have to do is instantiate a CollectionBinder, passing in the view, collection and template for each model. Any items in the collection will automatically be bound (and drawn) and any added or removed items will be added or removed from the respective element.
```javascript
var binder = new CollectionBinder(myView, collection, '<p><a class="label" data-id="<%= name %>"><%= name %></a></p>');
```

Binding is handled by adding an attribute to the top level element in the template.


#Example:

```javascript

define ['backbone', 'underscore','cs!collectionbinder'], (Backbone, _, CollectionBinder) ->
    Backbone.View.extend
        el: "#here"

        initialize: () ->
            collect = Backbone.Collection.extend()
            @collection = new collect()
            @binder = new CollectionBinder(@, @collection, '<p><a class="label" data-id="<%= name %>"><%= name %></a></p>')
            @binder.bind()

        events:
            "click #add" : "add"
            "click .label" : "remove"

        template: '<input type="text" id="newLabel"></label><a id="add">add</a><br/><br/>'

        render: () ->
            @$el.html _.template @template

        add: () ->
            @collection.add
                name: Backbone.$("#newLabel").val()

        remove: (e) ->
            models = @collection.where
                name: Backbone.$(e.currentTarget).data "id"

            @collection.remove models[0]


```

