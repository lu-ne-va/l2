<?php
if($_POST) {
    $to = 'urla48@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Письмо с сайта LU-NE-VA'; //Загаловок сообщения
    $message = '
                <html>
                    <head>
                        <title>' . $subject . '</title>
                    </head>
                    <body>
                        <p>Имя: ' . $_POST['name'] . '</p>
                        <p>Email: ' . $_POST['email'] . '</p>
                        <p>Сообщение: ' . $_POST['message'] . '</p>
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: <mail-box@lu-ne-va.ru>\r\n"; //Наименование и почта отправителя
    mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>