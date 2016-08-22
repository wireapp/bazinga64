var World;
(function (World) {
    var Person = (function () {
        function Person(name) {
            this.name = name;
        }
        Person.prototype.greet = function () {
            return "Hello, my name is " + this.name + ".";
        };
        return Person;
    }());
    World.Person = Person;
})(World || (World = {}));
