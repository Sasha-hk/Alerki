class X {
  constructor() {
    console.log('init')
  }

  get NAME() {
    console.log('NAME')
  }

  static get NAME() {
    console.log('Static NAME')
    return new this().NAME
  }
}


const z = X.NAME
