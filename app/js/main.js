$(function () {
    var Popup = function(selector) {

        var obj = {
            $el: $(selector),
            init: function () {
                var t = this;
                this.$el.find('.close, .pop-up__overlay').on('click', function () {
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
        galleryPopup.$el.find('.gallery__img').attr('src', $(this).data('img'));
        galleryPopup.show();
    });
    var successPopup = new Popup('.pop-up_success');

    var validate = {
        checkData: function ($form) {
            this.$form = $form;
            var t = this;
            this.valid = true;

            this.$form.find('.form__input').each(function(){
                t.checkInput($(this));
            });

            return this.valid;
        },

        checkInput: function ($input) {
            if($input.val() == ''){
                this.showTooltip($input);
                this.addError($input);
                this.valid = false;
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
        },

        clearOne: function ($input) {
            $input.closest('.form__group').find('.tooltip').css({'display': 'none'});
            $input.removeClass('error');
        }
    };

    var $form = $('.form');

    $form.on('submit', function (e) {
        e.preventDefault();
        if(validate.checkData($(this))) {
            addProjectPopup.hide();
            successPopup.show();
        }
    });
    $form.on('reset', function () {
        validate.clearAll($(this))
    });

    $('.form__input').on('keyup', function () {
        validate.checkInput($(this))
    });
});

