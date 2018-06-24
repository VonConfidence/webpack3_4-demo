import * as _ from 'lodash'


console.log(_.chunk([1,2,3,4,5,6,7], 2))

const num = 45;

interface Cat {
  name: String,
  sex: String
}

function Cat(cat: Cat) {
  console.log('Hello TS: ', cat.name);
}

Cat({
  name: 'Foo',
  sex: 'male'
})