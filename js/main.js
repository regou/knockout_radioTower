var $id = function(idname){
    return document.getElementById(idname);
};

;(function(ko){
    var radioTower = new ko.subscribable();

    ko.subscribable.fn.pub = function(topic) {
        this.subscribe(function(newValue) {
            radioTower.notifySubscribers(newValue, topic);
        });
        return this; //support chaining
    };
    ko.subscribable.fn.sub = function(topic,call,vm) {
        var target = vm || null;
        var cb = call || this; //如果没有call，那么直接捆绑原始数据
        radioTower.subscribe(cb, target, topic);

        return this;  //support chaining
    };
})(ko);




var dateViewModel = function(){
    var self = this;
    this.startMonth = ko.observable("2013-10");
    this.endMonth = ko.observable("2014-08");
    this.length = ko.observable(0);

    this.length.sub("ulist",function(val){
       self.length(val.length);
    });

    this.sum = ko.computed(function() {
        return this.startMonth() + " " + this.endMonth() +" length:"+this.length();
    }, this);
};


var dateVm = new dateViewModel();

ko.applyBindings(dateVm,$id('a'));


var ulistModel = function(){
    var self =this;
    var li = [
        {name:"wx",age:1},
        {name:"fds",age:2},
        {name:"aaa",age:3}
    ];

    self.li = ko.observableArray([]).pub("ulist");

    self.li(li);


    self.del = function(d,evt){
        var li = self.li();
        console.log('li',li);
        var index = li.findIndex(function(element, index, array){
            return element.name == d.name;
        });
        console.log('index',index);
        var res = li.splice(index, 1);
        self.li(li);

    }

};

ko.applyBindings(new ulistModel(),$id('b'));

