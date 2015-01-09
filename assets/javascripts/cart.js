var Lists = Backbone.Collection.extend({
  url: function() {
    return '/cart.json'
  }
});

var ListView = Backbone.View.extend({
  tagName: 'tr',

  events: {
    'click .js-remove-item': 'removeItem',
    'click .js-number-control': 'changeQuantity'
  },  

  render: function() {
    this.$el.html(_.template($('#cart-item').html())(this.model.toJSON()));
    return this;
  },

  removeItem: function() {
    this.$el.fadeOut(150, function() {
      $(this).remove();
    });
    return false;
  },

  changeQuantity: function(event) {
    var $numberQuantity = this.$el.find('.js-number-quantity');

    var
      price = this.model.get('item').price,
      quantity = parseInt($numberQuantity.text());
      
    var numberAction = $(event.currentTarget).data('action');

    if (numberAction == 'down') {
     if (quantity > 1) {
       quantity--;
     }
    } else if (numberAction == 'up') {
     quantity++;
    }

    $numberQuantity.text(quantity);

    return false;
  }
});

var ListsView = Backbone.View.extend({
  el: '#cart-list',

  initialize: function() {
    this.collection = new Lists();
    var _this = this;
    this.collection.fetch({cache: false}).then(function() {
      _this.render();
    });
  },
  
  render: function() {
    this.collection.each(this.addOne, this);
    return this;
  },
  
  addOne: function(model) {
    var view = new ListView({model: model});
    var item = view.render().el;
    this.$el.append(item);
  }
});