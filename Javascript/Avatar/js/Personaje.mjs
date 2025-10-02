export class Personaje {
  static contador = 0;

  constructor(nombre, imagen, vidas, corazones, ataque) {
    this._id = ++Personaje.contador;
    this._nombre = nombre;
    this._imagen = imagen;
    this._vidasMaximas = vidas;
    this._vidas = vidas;
    this._corazonesOriginales = [...corazones];
    this._corazones = [...corazones];
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

  // Método para recibir daño
  recibirDanio(cantidad = 1) {
    this._vidas = Math.max(0, this._vidas - cantidad);
    
    // Remover corazones según el daño recibido
    for (let i = 0; i < cantidad; i++) {
      if (this._corazones.length > 0) {
        this._corazones.pop();
      }
    }
    
    return this._vidas;
  }

  // Método para verificar si está vivo
  estaVivo() {
    return this._vidas > 0;
  }

  // Método para verificar si está derrotado
  estaDerrotado() {
    return this._vidas <= 0;
  }

  // Método para restaurar vidas
  restaurarVidas() {
    this._vidas = this._vidasMaximas;
    this._corazones = [...this._corazonesOriginales];
  }

  // Método estático para determinar el ganador de un combate
  static determinarGanador(ataqueJugador, ataqueEnemigo) {
    if (ataqueJugador === ataqueEnemigo) {
      return 'empate';
    }

    const combinacionesGanadoras = {
      'Puño 👊': 'Barrida 🦶',
      'Barrida 🦶': 'Patada 🦵',
      'Patada 🦵': 'Puño 👊'
    };

    if (combinacionesGanadoras[ataqueJugador] === ataqueEnemigo) {
      return 'jugador';
    }

    return 'enemigo';
  }

  // Método para procesar un combate entre dos personajes
  static procesarCombate(jugador, enemigo, ataqueJugador, ataqueEnemigo) {
    const resultado = Personaje.determinarGanador(ataqueJugador, ataqueEnemigo);
    
    const combateInfo = {
      resultado,
      ataqueJugador,
      ataqueEnemigo,
      jugador: {
        nombre: jugador.nombre,
        imagen: jugador.imagen,
        vidasRestantes: jugador.vidas,
        corazones: [...jugador.corazones]
      },
      enemigo: {
        nombre: enemigo.nombre,
        imagen: enemigo.imagen,
        vidasRestantes: enemigo.vidas,
        corazones: [...enemigo.corazones]
      }
    };

    if (resultado === 'jugador') {
      enemigo.recibirDanio();
    } else if (resultado === 'enemigo') {
      jugador.recibirDanio();
    }

    // Actualizar info después del daño
    combateInfo.jugador.vidasRestantes = jugador.vidas;
    combateInfo.enemigo.vidasRestantes = enemigo.vidas;
    combateInfo.jugador.corazones = [...jugador.corazones];
    combateInfo.enemigo.corazones = [...enemigo.corazones];

    // Verificar si hay ganador final
    if (jugador.estaDerrotado()) {
      combateInfo.ganadorFinal = 'enemigo';
    } else if (enemigo.estaDerrotado()) {
      combateInfo.ganadorFinal = 'jugador';
    }

    return combateInfo;
  }

  // Método para obtener un ataque aleatorio
  ataqueAleatorio() {
    const ataques = ['Puño 👊', 'Patada 🦵', 'Barrida 🦶'];
    return ataques[Math.floor(Math.random() * ataques.length)];
  }

  // Método para atacar a otro personaje
  atacar(personajeObjetivo, tipoAtaque) {
    if (!personajeObjetivo || !(personajeObjetivo instanceof Personaje)) {
      console.error('Objetivo de ataque inválido');
      return null;
    }

    if (this.estaDerrotado()) {
      console.warn(`${this.nombre} está derrotado y no puede atacar`);
      return null;
    }

    const ataqueEnemigo = personajeObjetivo.ataqueAleatorio();
    return Personaje.procesarCombate(this, personajeObjetivo, tipoAtaque, ataqueEnemigo);
  }

  toString() {
    return `
  --------- Personaje ---------
    ID: ${this._id}
    Nombre: ${this._nombre}
    Imagen: ${this._imagen}
    Vidas: ${this._vidas}/${this._vidasMaximas}
    Corazones: ${this._corazones.join(' ')}
    Ataque: ${this._ataque}
    Estado: ${this.estaVivo() ? 'Vivo' : 'Derrotado'}
  -----------------------------
  `;
  }
}