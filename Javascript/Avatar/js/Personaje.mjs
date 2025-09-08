export class Personaje {
  static contador = 0;

  constructor(nombre, imagen, vidas, corazones, ataque) {
    this._id = ++Personaje.contador;
    this._nombre = nombre;
    this._imagen = imagen;
    this._vidas = vidas;
    this._corazones = corazones;
    this._ataque = ataque;
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get imagen() {
    return this._imagen;
  }

  set imagen(imagen) {
    this._imagen = imagen;
  }

  get vidas() {
    return this._vidas;
  }

  set vidas(vidas) {
    this._vidas = vidas;
  }

  get corazones() {
    return this._corazones;
  }

  set corazones(corazones) {
    this._corazones = corazones;
  }

  get ataque() {
    return this._ataque;
  }

  set ataque(ataque) {
    this._ataque = ataque;
  }

  atacar(personaje) {
    console.log(`Ataque del personaje ${personaje}`);
  }

  toString() {
    return `
  --------- Personaje ---------
    ID: ${this._id}
    Nombre: ${this._nombre}
    Imagen: ${this._imagen}
    Vidas: ${this._vidas}
    Corazones: ${this._corazones}
    Ataque: ${this._ataque}
  -----------------------------
  `;
  }
}
