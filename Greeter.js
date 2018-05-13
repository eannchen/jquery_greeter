// 分號避免上個 library 的結尾忘記加
;
// 利用 IIFE 設定專屬且安全的 scope
(function (global, $) {

  // 利用此讓使用 library 更方便，不須使用 new
  var Greeter = function (firstName, lastName, language) {
    return new Greeter.init(firstName, lastName, language);
  }

  var supportLangs = [
    'en',
    'zh-TW'
  ];
  var greetings = {
    en: 'Hello',
    ['zh-TW']: '你好'
  }
  var formalGreetings = {
    en: 'Greetings',
    ['zh-TW']: '問候'
  }
  var logMessages = {
    en: 'Logged in',
    ['zh-TW']: '登入'
  }

  Greeter.prototype = {
    _fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },
    _validate: function () {
      if (supportLangs.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },
    _greeting: function () {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    _formalGreetings: function () {
      return formalGreetings[this.language] + ' ' + this._fullName() + '!';
    },
    greet: function (formal) {
      var msg;
      if (formal) {
        msg = this._formalGreetings();
      } else {
        msg = this._greeting();
      }
      // 在 IE 較舊版本沒有 console
      if (console) {
        console.log(msg);
      }
      // 回傳 this 讓此方法結束後，可以接續
      return this;
    },
    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this._fullName());
      }
      return this;
    },
    setLang: function (lang) {
      this.language = lang;
      this._validate();
      return this;
    },
    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }
      if (!selector) {
        throw 'Missing jQuery selector'
      }
      var msg;
      if (formal) {
        msg = this._formalGreetings();
      } else {
        msg = this._greeting();
      }
      if (console) {
        console.log(msg);
      }
      $(selector).html(msg);
      return this;
    }
  }

  // 建構函式
  Greeter.init = function (firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';
    this._validate();
  }

  // 讓物件建構時，能使用 Greeter 原型內的 method
  Greeter.init.prototype = Greeter.prototype;

  // 使用者可以 Greeter 或 G$ 取用
  global.Greeter = global.G$ = Greeter;
}(window, jQuery))