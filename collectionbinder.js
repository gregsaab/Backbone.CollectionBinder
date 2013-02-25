(function() {

  define(['backbone', 'underscore'], function(Backbone, _) {
    var CollectionBinder;
    if (!(Backbone != null)) {
      throw "Backbone's gotta be loaded first, brah";
    }
    if (!(_ != null)) {
      throw "Underscore is quintessential, load it first";
    }
    return CollectionBinder = (function() {

      function CollectionBinder(view, collection, template) {
        this.view = view;
        this.collection = collection;
        this.template = template;
      }

      CollectionBinder.prototype.bind = function() {
        var model, _i, _len, _ref,
          _this = this;
        _ref = this.collection.models;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          bindModel(model);
        }
        this.collection.on("add", function(model) {
          return _this.bindModel(model);
        });
        return this.collection.on("remove", function(model) {
          return _this.removeModel(model);
        });
      };

      CollectionBinder.prototype.uniqueId = function(length) {
        var id;
        if (length == null) {
          length = 8;
        }
        id = "";
        while (id.length < length) {
          id += Math.random().toString(36).substr(2);
        }
        return id.substr(0, length);
      };

      CollectionBinder.prototype.bindModel = function(model) {
        var modelEl;
        model.bindIdentifier = this.uniqueId();
        modelEl = Backbone.$(_.template(this.template, model.toJSON()));
        modelEl.attr("data-bindid", model.bindIdentifier);
        return this.view.$el.append(modelEl);
      };

      CollectionBinder.prototype.removeModel = function(model) {
        return Backbone.$(this.topLevelElement + '[data-bindid="' + model.bindIdentifier + '"]').remove();
      };

      return CollectionBinder;

    })();
  });

}).call(this);
