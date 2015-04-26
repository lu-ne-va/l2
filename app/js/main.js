var Popup = function (selector) {
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


var validate = {
    /**
     * Проверка всех инпутов формы
     * @param $form
     * @returns {boolean}
     */
    checkData: function ($form) {
        this.$form = $form;
        var t = this;
        this.valid = true;

        this.$form.find('.form__input').each(function () {
            t.checkInput($(this));
        });

        return this.valid;
    },

    /**
     * Проверка одного инпута
     * @param $input
     */
    checkInput: function ($input) {
        if ($input.val() == '') {
            this.showTooltip($input);
            this.addError($input);
            this.valid = false;
        } else {
            this.clearOne($input);
        }
    },

    /**
     * Показать тултип
     * @param $input
     */
    showTooltip: function ($input) {
        $input.closest('.form__group').find('.tooltip').css({'display': 'inline-block'});
    },

    /**
     * Показать ошибку в инпуте
     * @param $input
     */
    addError: function ($input) {
        $input.addClass('error');
    },

    /**
     * Очистить все поля от ошибок
     * @param $form
     */
    clearAll: function ($form) {
        this.$form = $form;
        var t = this;

        this.$form.find('.form__input').each(function () {
            t.clearOne($(this))
        });
    },

    /**
     * Очистить одно поле от ошибок
     * @param $input
     */
    clearOne: function ($input) {
        $input.closest('.form__group').find('.tooltip').css({'display': 'none'});
        $input.removeClass('error');
    }
};

$(function () {

    //Попап добавления проекта
    var addProjectPopup = new Popup('.pop-up_add');
    $('.add').on('click', function () {
        addProjectPopup.show();
    });

    //Попап просмотра проектов
    var galleryPopup = new Popup('.pop-up_gallery');
    $('.portfolio__img-hover').on('click', function () {
        galleryPopup.$el.find('.gallery__img').attr('src', $(this).data('img'));
        galleryPopup.show();
    });

    //Попап успеха)
    var successPopup = new Popup('.pop-up_success');


    //Форма авторизации
    var $formLogin = $('#login-form');
    $formLogin.on('submit', function (e) {
        e.preventDefault();
        if (validate.checkData($(this))) {
            //todo luneva сделать авторизацию
        }
    });

    //Форма добавления проекта
    var $formAddProject = $('#add-project-form');
    $formAddProject.on('submit', function (e) {
        e.preventDefault();
        if (validate.checkData($(this))) {
            addProjectPopup.hide();
            successPopup.show();
        }
    });

    //Форма обратной связи
    var $formSend = $('#massage-form');
    $formSend.on('submit', function (e) {
        e.preventDefault();
        if (validate.checkData($(this))) {
            var form_data = $(this).serialize(); //собераем все данные из формы
            $.ajax({
                type: "POST", //Метод отправки
                url: "php/send.php", //путь до php фаила отправителя
                data: form_data,
                success: function () {
                    alert("Ваше сообщение отпрвлено!");
                    location.href = "index.html"; // переадресовываем на главную
                }
            })
        }
    });

    //Очистка форм
    $formSend.on('reset', function () {
        validate.clearAll($(this))
    });

    //Валидация изменений в инпутах формы
    $('.form__input').on('keyup', function () {
        validate.checkInput($(this))
    });
});

