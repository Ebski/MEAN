/**
 * Created by Ebbe on 20-05-2016.
 */
var car = {
    brand: "BMW",
    getBrand: function () {
        console.log(this.brand);
    }
}
var getCarBrand = car.getBrand.bind(car);
getCarBrand();


var o = {
    prop: 37,
    f: function () {
        return this.prop;
    }
};
console.log(o.f());