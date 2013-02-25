define ['backbone', 'underscore'], (Backbone, _) ->
  throw "Backbone's gotta be loaded first, brah" if not Backbone?
  throw "Underscore is quintessential, load it first" if not _?

  class CollectionBinder
    constructor: (@view, @collection, @template) ->
	  regex = new RegExp "^[\\s\\w]*<([\\w]+)"
      @topLevelElement = regex.exec(@template)[1]

    bind: () ->
      bindModel model for model in @collection.models
      @collection.on "add", (model) =>
        @bindModel model
      @collection.on "remove", (model) =>
        @removeModel model

    uniqueId : (length=8) ->
      id = ""
      id += Math.random().toString(36).substr(2) while id.length < length
      id.substr 0, length

    bindModel: (model) ->
      model.bindIdentifier = @uniqueId()

      modelEl = Backbone.$(_.template @template, model.toJSON())
      modelEl.attr "data-bindid", model.bindIdentifier
      @view.$el.append modelEl

    removeModel: (model) ->
      Backbone.$(@topLevelElement + '[data-bindid="' + model.bindIdentifier + '"]').remove()

