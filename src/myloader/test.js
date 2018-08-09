class People {
  constructor (name) {
    this.name = name
  }

  sayName () {
    console.log(`Hello there, I'm ${this.name}`)
  }
}

const imweb = new People('imweb')
imweb.sayName()
