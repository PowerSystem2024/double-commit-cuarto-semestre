import pygame
import random
import sys

# -----------------------------
# CONFIGURACIÓN INICIAL
# -----------------------------
pygame.init()
pygame.mixer.init()

ANCHO, ALTO = 800, 600
pantalla = pygame.display.set_mode((ANCHO, ALTO))
pygame.display.set_caption("Amenaza Fantasma: Renacimiento")

# -----------------------------
# RECURSOS
# -----------------------------
fondo1 = pygame.image.load("assets/img/fondo1.png").convert()
fondo2 = pygame.image.load("assets/img/fondo2.png").convert()
fondo_actual = fondo1

sonido_disparo = pygame.mixer.Sound("assets/snd/disparo.wav")
sonido_explosion = pygame.mixer.Sound("assets/snd/explosion.wav")

# -----------------------------
# CLASES
# -----------------------------
class Nave(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("assets/img/nave.png").convert_alpha()
        self.rect = self.image.get_rect(center=(ANCHO // 2, ALTO - 80))
        self.velocidad = 6
        self.lasers = pygame.sprite.Group()
        self.vida = 3

    def update(self, teclas):
        if teclas[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= self.velocidad
        if teclas[pygame.K_RIGHT] and self.rect.right < ANCHO:
            self.rect.x += self.velocidad
        if teclas[pygame.K_UP] and self.rect.top > 0:
            self.rect.y -= self.velocidad
        if teclas[pygame.K_DOWN] and self.rect.bottom < ALTO:
            self.rect.y += self.velocidad

    def disparar(self):
        laser = Laser(self.rect.centerx, self.rect.top)
        self.lasers.add(laser)
        sonido_disparo.play()

class Laser(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((5, 20))
        self.image.fill((0, 255, 255))
        self.rect = self.image.get_rect(center=(x, y))
        self.velocidad = -9

    def update(self):
        self.rect.y += self.velocidad
        if self.rect.bottom < 0:
            self.kill()

class Enemigo(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("assets/img/enemigo.png").convert_alpha()
        self.rect = self.image.get_rect(center=(random.randint(40, ANCHO - 40), -50))
        self.velocidad = random.randint(2, 5)

    def update(self):
        self.rect.y += self.velocidad
        if self.rect.top > ALTO:
            self.kill()

class Explosion(pygame.sprite.Sprite):
    def __init__(self, centro):
        super().__init__()
        self.frames = [
            pygame.image.load("assets/img/explosion/exp1.png").convert_alpha(),
            pygame.image.load("assets/img/explosion/exp2.png").convert_alpha(),
            pygame.image.load("assets/img/explosion/exp3.png").convert_alpha(),
        ]
        self.frame_index = 0
        self.image = self.frames[self.frame_index]
        self.rect = self.image.get_rect(center=centro)
        self.frame_rate = 80  # milisegundos
        self.ultimo_update = pygame.time.get_ticks()

    def update(self):
        ahora = pygame.time.get_ticks()
        if ahora - self.ultimo_update > self.frame_rate:
            self.ultimo_update = ahora
            self.frame_index += 1
            if self.frame_index >= len(self.frames):
                self.kill()
            else:
                self.image = self.frames[self.frame_index]

# -----------------------------
# FUNCIONES AUXILIARES
# -----------------------------
def mostrar_texto(texto, tam, color, x, y, centrado=True):
    fuente = pygame.font.Font(None, tam)
    superficie = fuente.render(texto, True, color)
    rect = superficie.get_rect(center=(x, y)) if centrado else superficie.get_rect(topleft=(x, y))
    pantalla.blit(superficie, rect)

# -----------------------------
# INICIALIZACIÓN DE GRUPOS
# -----------------------------
jugador = Nave()
enemigos = pygame.sprite.Group()
explosiones = pygame.sprite.Group()
todos = pygame.sprite.Group(jugador)

# -----------------------------
# VARIABLES DE JUEGO
# -----------------------------
puntos = 0
nivel = 1
clock = pygame.time.Clock()
jugando = True
cambio_fondo = 250

# -----------------------------
# BUCLE PRINCIPAL
# -----------------------------
while True:
    clock.tick(60)

    for evento in pygame.event.get():
        if evento.type == pygame.QUIT:
            pygame.quit()
            sys.exit()
        elif evento.type == pygame.KEYDOWN and jugando:
            if evento.key == pygame.K_SPACE:
                jugador.disparar()
        elif evento.type == pygame.KEYDOWN and not jugando:
            if evento.key == pygame.K_r:
                # Reinicio del juego
                jugador = Nave()
                enemigos.empty()
                explosiones.empty()
                todos.empty()
                todos.add(jugador)
                puntos = 0
                nivel = 1
                fondo_actual = fondo1
                jugando = True

    teclas = pygame.key.get_pressed()

    if jugando:
        # Spawnear enemigos
        if random.random() < 0.02 + (nivel * 0.001):
            enemigo = Enemigo()
            enemigos.add(enemigo)
            todos.add(enemigo)

        # Actualizaciones
        jugador.update(teclas)
        jugador.lasers.update()
        enemigos.update()
        explosiones.update()

        # Colisiones
        colisiones = pygame.sprite.groupcollide(enemigos, jugador.lasers, True, True)
        for enemigo in colisiones:
            puntos += 10
            sonido_explosion.play()
            explosion = Explosion(enemigo.rect.center)
            explosiones.add(explosion)
            todos.add(explosion)

        # Colisión jugador-enemigo
        impacto = pygame.sprite.spritecollide(jugador, enemigos, True)
        if impacto:
            jugador.vida -= 1
            sonido_explosion.play()
            explosion = Explosion(jugador.rect.center)
            explosiones.add(explosion)
            todos.add(explosion)
            if jugador.vida <= 0:
                jugando = False

        # Aumento de nivel
        if puntos >= cambio_fondo * nivel:
            nivel += 1
            fondo_actual = fondo2 if nivel % 2 == 0 else fondo1

        # Dibujo
        pantalla.blit(fondo_actual, (0, 0))
        todos.draw(pantalla)
        jugador.lasers.draw(pantalla)
        mostrar_texto(f"Puntos: {puntos}", 30, (255, 255, 255), 70, 30, centrado=False)
        mostrar_texto(f"Vida: {jugador.vida}", 30, (255, 255, 255), 70, 60, centrado=False)
        mostrar_texto(f"Nivel: {nivel}", 30, (255, 255, 255), 70, 90, centrado=False)
    else:
        pantalla.blit(fondo_actual, (0, 0))
        mostrar_texto("GAME OVER", 80, (255, 0, 0), ANCHO // 2, ALTO // 2 - 40)
        mostrar_texto("Presiona R para reiniciar", 40, (255, 255, 255), ANCHO // 2, ALTO // 2 + 40)

    pygame.display.flip()
