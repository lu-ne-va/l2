$(function () {
    var Popup = function(selector) {

        var obj = {
            $el: $(selector),
            init: function () {
                var t = this;
                this.$el.find('.window-pop__close, .pop-up__overlay').on('click', function () {
                    t.hide();
                });
            },
            show: function () {
                this.$el.css({'display': 'block'});
            },
            hide: function () {
                this.$el.css({'display': 'none'});
            }
        };

        obj.init();
        return obj;
    };

    var addProjectPopup = new Popup('.pop-up_add');

    $('.add').on('click', function () {
        addProjectPopup.show();
    });

    var galleryPopup = new Popup('.pop-up_gallery');

    $('.portfolio__img-hover').on('click', function () {
        galleryPopup.show();
    });

    var validate = {
        checkData: function ($form) {
            this.$form = $form;
            var t = this;

            this.$form.find('.form__input').each(function(){
                t.checkInput($(this));
            });

            return false;
        },

        checkInput: function ($input) {
            if($input.val() == ''){
                this.showTooltip($input);
                this.addError($input);
            } else {
                this.clearOne($input);
            }
        },

        showTooltip: function ($input) {
            $input.closest('.form__group').find('.tooltip').css({'display': 'inline-block'});
        },
        addError: function ($input) {
            $input.addClass('error');
        },

        clearAll: function ($form) {
            this.$form = $form;
            var t = this;

            this.$form.find('.form__input').each(function(){
                t.clearOne($(this))
            });

            return false;
        },

        clearOne: function ($input) {

            $input.closest('.form__group').find('.tooltip').css({'display': 'none'});
            $input.removeClass('error');

        }
    };

    var $form = $('.form');

    $form.on('submit', function (e) {
        if(!validate.checkData($(this))) {
            e.preventDefault();
        }
    });
    $form.on('reset', function () {
        validate.clear($(this))
    });

    $('.form__input').on('keyup', function () {
        validate.checkInput($(this))
    });

    $('.window-pop__close, .pop-up__overlay').on('click', function () {

    });

});

