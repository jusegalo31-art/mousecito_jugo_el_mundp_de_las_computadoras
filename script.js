/**
 * ============================================================================
 * MOUSECITO Y LA CIUDAD DE LAS COMPUTADORAS
 * Motor del Videojuego Educativo para 1° de Primaria (6-7 años)
 * Vanilla JavaScript (100% Offline, Sintetizador Web Audio API, Sin Dependencias)
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. SISTEMA DE AUDIO LOCAL (WEB AUDIO API - 100% SINTETIZADO OFFLINE)
     ========================================================================== */
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return !this.isMuted;
    }

    // Clic amigable tipo pop de madera
    playClick() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    }

    // Campanada de éxito / logro infantil (Arpegio C mayor)
    playSuccess() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.1;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    }

    // Sonido al pintar (bloop jugoso)
    playPaint() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.14);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    }

    // Nota musical por letra pulsada en el teclado
    playKeyType(noteIndex = 0) {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
      const freq = scale[noteIndex % scale.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    }

    // Tambor / Batería
    playDrum() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    }

    // Campana de cristal
    playBell() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now); // A6
      osc.frequency.exponentialRampToValueAtTime(1750, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    }

    // Piano melódico
    playPiano() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const notes = [440, 554.37, 659.25]; // Acorde A mayor suave
      const now = this.ctx.currentTime;

      notes.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);
      });
    }

    // Palmas rítmicas
    playClap() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Síntesis de ruido blanco filtrado para palmas
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1100;
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(now);
    }

    // Ring telefónico amigable
    playPhoneRing() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      [0, 0.14].forEach((offset) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(853, now + offset);
        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });
    }

    // Fanfarria triunfal de fin de juego
    playFanfare() {
      if (this.isMuted) return;
      this.init();
      if (!this.ctx) return;

      const melody = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.15 }, // E5
        { f: 783.99, d: 0.15 }, // G5
        { f: 1046.50, d: 0.35 }, // C6
        { f: 880.00, d: 0.15 }, // A5
        { f: 1046.50, d: 0.55 }  // C6 sostenido
      ];

      let elapsed = 0;
      melody.forEach((note) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + elapsed;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.32, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + note.d);

        elapsed += note.d * 0.85;
      });
    }
  }

  /* ==========================================================================
     2. SISTEMA DE CONFETI Y PARTÍCULAS FESTIVAS (CANVAS 2D)
     ========================================================================== */
  class ConfettiSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animationId = null;
      this.colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#fffa65', '#a55eea', '#ff78b9'];

      if (this.canvas) {
        this.resize();
        window.addEventListener('resize', () => this.resize());
      }
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(count = 70) {
      if (!this.canvas || !this.ctx) return;
      this.resize();

      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 4;
        this.particles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: Math.random() * 9 + 6,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          gravity: 0.18,
          opacity: 1,
          decay: Math.random() * 0.008 + 0.006
        });
      }

      if (!this.animationId) {
        this.render();
      }
    }

    render() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.render());
      } else {
        this.animationId = null;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  /* ==========================================================================
     3. ESTADO GLOBAL DEL JUEGO Y MÁQUINA DE NAVEGACIÓN
     ========================================================================== */
  const audio = new SoundEngine();
  const confetti = new ConfettiSystem('particle-canvas');

  const GameState = {
    currentScreen: 'title',
    unlockedLevels: [1], // Nivel 1 desbloqueado al inicio
    completedLevels: new Set(),
    activeHelpHint: '',
    
    // Nivel 2: Colores usados
    level2: {
      activeColor: '#ff4757',
      usedColors: new Set()
    },

    // Nivel 3: Teclado y Palabras
    level3: {
      targetWord: 'SOL',
      targetIcon: '☀️',
      currentIndex: 0,
      wordsCompleted: 0
    },

    // Nivel 4: Video y Música
    level4: {
      isPlayingVideo: false,
      videoProgress: 0,
      videoInterval: null,
      instrumentsExplored: new Set()
    },

    // Nivel 5: Retos
    level5: {
      memoryFlipped: [],
      memoryMatched: 0,
      dragMatches: 0
    },

    // Reto Final Plaza
    finalChallenge: {
      selectedCitizen: null,
      matchesCount: 0
    }
  };

  /* Metadatos y Textos de los 6 Niveles Educativos */
  const LevelMeta = {
    1: {
      tag: 'NIVEL 1',
      title: 'La Biblioteca Mágica',
      screen: 'screen-level1',
      help: 'Toca los tres libros para descubrir animales, planetas y cuentos. ¡Luego responde la pregunta de Mousecito!'
    },
    2: {
      tag: 'NIVEL 2',
      title: 'El Taller de Colores',
      screen: 'screen-level2',
      help: 'Elige un color en la paleta y toca las partes del dibujo. ¡Usa al menos 3 colores diferentes para terminar tu obra!'
    },
    3: {
      tag: 'NIVEL 3',
      title: 'La Escuela de Letras',
      screen: 'screen-level3',
      help: 'Mira la palabra en la pantalla y pulsa las teclas en el orden correcto. ¡Si te equivocas, la letra correcta brillará!'
    },
    4: {
      tag: 'NIVEL 4',
      title: 'El Estudio Musical',
      screen: 'screen-level4',
      help: 'Toca los instrumentos para escuchar su sonido y presiona ▶ Reproducir para ver el video musical animado.'
    },
    5: {
      tag: 'NIVEL 5',
      title: 'El Parque de los Retos',
      screen: 'screen-level5',
      help: '¡Juega a encontrar las parejas iguales o arrastra cada objeto hasta su destino con el mouse!'
    },
    6: {
      tag: 'NIVEL 6',
      title: 'La Casa de los Abrazos',
      screen: 'screen-level6',
      help: 'Inicia la videollamada para hablar con los abuelitos y toca los botones de saludar o enviar abrazos virtuales.'
    },
    'final': {
      tag: 'GRAN RETO',
      title: 'La Plaza Central',
      screen: 'screen-final',
      help: 'Toca a un habitante de la ciudad y luego toca el lugar que le puede ayudar con el computador.'
    }
  };

  /* ==========================================================================
     4. CONTROLADOR DE PANTALLAS Y HUD
     ========================================================================== */
  function showScreen(screenId) {
    document.querySelectorAll('.game-screen').forEach((screen) => {
      screen.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }

    const hud = document.getElementById('game-hud');
    if (screenId === 'screen-title' || screenId === 'screen-celebration') {
      hud.classList.add('hidden');
    } else {
      hud.classList.remove('hidden');
    }

    GameState.currentScreen = screenId;
    audio.playClick();
  }

  function updateHUD(levelKey) {
    const meta = LevelMeta[levelKey];
    if (meta) {
      document.getElementById('hud-level-tag').textContent = meta.tag;
      document.getElementById('hud-level-title').textContent = meta.title;
      GameState.activeHelpHint = meta.help;
    }

    // Actualizar ranuras de estrellas ganadas
    const starSlots = document.querySelectorAll('.star-slot');
    starSlots.forEach((slot, index) => {
      const starIndex = index + 1;
      if (GameState.completedLevels.has(starIndex)) {
        slot.classList.add('earned');
      } else {
        slot.classList.remove('earned');
      }
    });
  }

  function completeLevel(levelNum, rewardMessage) {
    GameState.completedLevels.add(levelNum);
    
    // Desbloquear siguiente nivel
    const nextLevel = levelNum + 1;
    if (nextLevel <= 6 && !GameState.unlockedLevels.includes(nextLevel)) {
      GameState.unlockedLevels.push(nextLevel);
    } else if (GameState.completedLevels.size >= 6) {
      // Si completó los 6 niveles, desbloquear la Gran Plaza Final
      if (!GameState.unlockedLevels.includes('final')) {
        GameState.unlockedLevels.push('final');
      }
    }

    updateMapNodes();
    updateHUD(levelNum);
    audio.playSuccess();
    confetti.burst(50);

    // Actualizar globo de Mousecito
    const bubble = document.getElementById(`bubble-level${levelNum}`);
    if (bubble && rewardMessage) {
      bubble.textContent = rewardMessage;
    }

    // Ofrecer volver al mapa con botón destacado
    setTimeout(() => {
      alertCelebration(levelNum);
    }, 1200);
  }

  function alertCelebration(levelNum) {
    const modal = document.getElementById('modal-help');
    const title = document.getElementById('help-title');
    const text = document.getElementById('help-modal-text');
    
    if (modal && title && text) {
      title.textContent = '⭐ ¡Estrella de Explorador Obtenida!';
      text.textContent = `¡Excelente trabajo! Completaste la misión del nivel ${levelNum}. ¡Un nuevo lugar se ha desbloqueado en el mapa de la ciudad!`;
      modal.classList.remove('hidden');

      const okBtn = document.getElementById('btn-help-ok');
      const originalHandler = okBtn.onclick;
      okBtn.onclick = () => {
        modal.classList.add('hidden');
        showScreen('screen-map');
        okBtn.onclick = originalHandler;
      };
    }
  }

  /* ==========================================================================
     5. MAPA INTERACTIVO DE LA CIUDAD
     ========================================================================== */
  function updateMapNodes() {
    for (let i = 1; i <= 6; i++) {
      const node = document.getElementById(`dest-${i}`);
      if (!node) continue;

      if (GameState.unlockedLevels.includes(i)) {
        node.classList.remove('node-locked');
        node.classList.add('node-active');
        const badge = node.querySelector('.node-status-badge');
        if (badge) {
          if (GameState.completedLevels.has(i)) {
            badge.innerHTML = '<span class="status-star">⭐</span>';
          } else {
            badge.innerHTML = '<span class="status-new">✨</span>';
          }
        }
      } else {
        node.classList.add('node-locked');
        node.classList.remove('node-active');
        const badge = node.querySelector('.node-status-badge');
        if (badge) badge.innerHTML = '<span class="lock-icon">🔒</span>';
      }
    }

    // Plaza Central
    const plazaNode = document.getElementById('dest-plaza');
    if (plazaNode) {
      if (GameState.unlockedLevels.includes('final')) {
        plazaNode.classList.remove('node-locked');
        plazaNode.classList.add('node-active');
        const badge = plazaNode.querySelector('.node-status-badge');
        if (badge) badge.innerHTML = '<span class="status-crown">👑</span>';
      } else {
        plazaNode.classList.add('node-locked');
        plazaNode.classList.remove('node-active');
      }
    }
  }

  function initMapNavigation() {
    for (let i = 1; i <= 6; i++) {
      const node = document.getElementById(`dest-${i}`);
      if (!node) continue;

      node.addEventListener('click', () => {
        if (!GameState.unlockedLevels.includes(i)) {
          audio.playClick();
          showHelpModal(`¡Primero debes completar el nivel anterior para abrir este lugar! Mousecito te acompaña paso a paso.`);
          return;
        }

        // Mover avatar en el mapa
        const avatar = document.getElementById('map-mousecito-avatar');
        if (avatar) {
          const rect = node.getBoundingClientRect();
          const mapRect = document.querySelector('.map-container').getBoundingClientRect();
          avatar.style.left = `${rect.left - mapRect.left + 20}px`;
          avatar.style.top = `${rect.top - mapRect.top - 30}px`;
        }

        setTimeout(() => {
          showScreen(LevelMeta[i].screen);
          updateHUD(i);
        }, 350);
      });
    }

    // Gran Plaza Central
    const plaza = document.getElementById('dest-plaza');
    if (plaza) {
      plaza.addEventListener('click', () => {
        if (!GameState.unlockedLevels.includes('final')) {
          audio.playClick();
          showHelpModal(`¡Completa primero los 6 lugares de la ciudad para desbloquear el Gran Reto de la Plaza Central!`);
          return;
        }
        showScreen('screen-final');
        updateHUD('final');
      });
    }
  }

  /* ==========================================================================
     6. NIVEL 1: LA BIBLIOTECA MÁGICA
     ========================================================================== */
  function initLevel1() {
    const btnAnimals = document.getElementById('btn-book-animals');
    const btnPlanets = document.getElementById('btn-book-planets');
    const btnStory = document.getElementById('btn-book-story');

    const pageAnimals = document.getElementById('page-animals');
    const pagePlanets = document.getElementById('page-planets');
    const pageStory = document.getElementById('page-story');

    function switchBook(activeBtn, activePage) {
      [btnAnimals, btnPlanets, btnStory].forEach(b => b.classList.remove('active'));
      [pageAnimals, pagePlanets, pageStory].forEach(p => p.classList.add('hidden'));

      activeBtn.classList.add('active');
      activePage.classList.remove('hidden');
      audio.playClick();
    }

    btnAnimals.addEventListener('click', () => switchBook(btnAnimals, pageAnimals));
    btnPlanets.addEventListener('click', () => switchBook(btnPlanets, pagePlanets));
    btnStory.addEventListener('click', () => switchBook(btnStory, pageStory));

    // Animales interactivos
    document.querySelectorAll('.animal-card').forEach((card) => {
      card.addEventListener('click', () => {
        audio.playClick();
        card.style.transform = 'scale(1.1) translateY(-6px)';
        setTimeout(() => { card.style.transform = ''; }, 300);
      });
    });

    // Planetas interactivos
    document.querySelectorAll('.planet-interactive').forEach((planet) => {
      planet.addEventListener('click', () => {
        audio.playBell();
        const fact = planet.getAttribute('data-fact');
        const bubble = document.getElementById('planet-fact-bubble');
        if (bubble && fact) {
          bubble.textContent = `🪐 ${fact}`;
          bubble.style.animation = 'speechBounce 0.3s ease';
        }
      });
    });

    // Mini Reto de Aprendizaje: ¿Dónde vive el león?
    document.querySelectorAll('.quiz-option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const answer = btn.getAttribute('data-answer');
        if (answer === 'savanna') {
          btn.classList.add('correct');
          completeLevel(1, '¡Exacto! El computador nos ayuda a aprender, hacer tareas y descubrir cosas nuevas sobre el mundo.');
        } else {
          btn.classList.add('wrong');
          audio.playClick();
          setTimeout(() => btn.classList.remove('wrong'), 800);
          const bubble = document.getElementById('bubble-level1');
          if (bubble) {
            bubble.textContent = '¡Casi! Toca la tarjeta del León arriba en la pantalla para ver su hábitat cálido.';
          }
        }
      });
    });
  }

  /* ==========================================================================
     7. NIVEL 2: EL TALLER DE COLORES
     ========================================================================== */
  function initLevel2() {
    const pots = document.querySelectorAll('.color-pot-btn');
    const brushChip = document.getElementById('brush-color-chip');
    const colorsCount = document.getElementById('art-colors-count');
    const regions = document.querySelectorAll('.paintable-region');
    const btnClear = document.getElementById('btn-art-clear');
    const btnFinish = document.getElementById('btn-art-finish');

    // Selección de Color
    pots.forEach((pot) => {
      pot.addEventListener('click', () => {
        pots.forEach(p => p.classList.remove('active'));
        pot.classList.add('active');

        const color = pot.getAttribute('data-color');
        GameState.level2.activeColor = color;
        if (brushChip) brushChip.style.backgroundColor = color;
        audio.playClick();
      });
    });

    // Colorear región del dibujo SVG
    regions.forEach((region) => {
      region.addEventListener('click', () => {
        const color = GameState.level2.activeColor;
        region.setAttribute('fill', color);
        audio.playPaint();

        // Efecto rebote visual
        region.style.transition = 'transform 0.2s ease';
        region.style.transformOrigin = 'center';

        if (color !== '#ffffff') {
          GameState.level2.usedColors.add(color);
        }
        if (colorsCount) {
          colorsCount.textContent = GameState.level2.usedColors.size;
        }
      });
    });

    // Limpiar dibujo
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        regions.forEach(r => r.setAttribute('fill', '#ffffff'));
        GameState.level2.usedColors.clear();
        if (colorsCount) colorsCount.textContent = '0';
        audio.playClick();
      });
    }

    // Terminar Obra de Arte
    if (btnFinish) {
      btnFinish.addEventListener('click', () => {
        if (GameState.level2.usedColors.size >= 3) {
          completeLevel(2, '¡Qué obra de arte tan hermosa! Con el computador podemos dibujar y pintar sin gastar papel ni ensuciarnos.');
        } else {
          audio.playClick();
          const bubble = document.getElementById('bubble-level2');
          if (bubble) {
            bubble.textContent = '¡Tu dibujo va genial! Usa al menos 3 colores diferentes para que se vea súper alegre.';
          }
          showHelpModal('¡Usa al menos 3 colores en el dibujo! Elige otro color de la paleta y toca el sol, las flores o el techo.');
        }
      });
    }
  }

  /* ==========================================================================
     8. NIVEL 3: LA ESCUELA DE LETRAS
     ========================================================================== */
  function initLevel3() {
    const targetPill = document.getElementById('word-target-text');
    const targetIcon = document.getElementById('word-target-icon');
    const slotsRow = document.getElementById('word-slots-row');
    const feedback = document.getElementById('typing-status');
    const keys = document.querySelectorAll('.key-btn:not(#btn-key-backspace)');
    const backspace = document.getElementById('btn-key-backspace');
    const wordSelectors = document.querySelectorAll('.word-choice-btn');

    function setupWord(word, icon = '☀️') {
      GameState.level3.targetWord = word;
      GameState.level3.targetIcon = icon;
      GameState.level3.currentIndex = 0;

      if (targetPill) targetPill.textContent = word;
      if (targetIcon) targetIcon.textContent = icon;

      // Crear ranuras
      if (slotsRow) {
        slotsRow.innerHTML = '';
        for (let i = 0; i < word.length; i++) {
          const slot = document.createElement('div');
          slot.className = 'letter-slot';
          slot.dataset.slot = i;
          slot.textContent = '_';
          slotsRow.appendChild(slot);
        }
      }

      if (feedback) feedback.textContent = `¡Presiona la primera letra "${word[0]}" en el teclado grande!`;
      highlightExpectedKey();
    }

    function highlightExpectedKey() {
      keys.forEach(k => k.classList.remove('target-hint'));
      const expectedChar = GameState.level3.targetWord[GameState.level3.currentIndex];
      if (!expectedChar) return;

      keys.forEach(k => {
        if (k.getAttribute('data-key') === expectedChar) {
          k.classList.add('target-hint');
        }
      });
    }

    keys.forEach((keyBtn) => {
      keyBtn.addEventListener('click', () => {
        const pressedChar = keyBtn.getAttribute('data-key');
        const expectedChar = GameState.level3.targetWord[GameState.level3.currentIndex];

        // Animación de tecla pulsada
        keyBtn.classList.add('key-pressed');
        setTimeout(() => keyBtn.classList.remove('key-pressed'), 140);

        if (pressedChar === expectedChar) {
          // Acierto
          audio.playKeyType(GameState.level3.currentIndex);
          const currentSlot = slotsRow.children[GameState.level3.currentIndex];
          if (currentSlot) {
            currentSlot.textContent = pressedChar;
            currentSlot.classList.add('filled');
          }

          GameState.level3.currentIndex++;

          // ¿Palabra terminada?
          if (GameState.level3.currentIndex >= GameState.level3.targetWord.length) {
            if (feedback) feedback.textContent = `🎉 ¡Completaste la palabra "${GameState.level3.targetWord}"!`;
            audio.playSuccess();
            confetti.burst(35);

            GameState.level3.wordsCompleted++;

            if (GameState.level3.wordsCompleted >= 1) {
              completeLevel(3, '¡Lo lograste! Con el teclado del computador podemos escribir letras, palabras y mensajes para todo el mundo.');
            }
          } else {
            const nextChar = GameState.level3.targetWord[GameState.level3.currentIndex];
            if (feedback) feedback.textContent = `¡Muy bien! Ahora pulsa la letra "${nextChar}".`;
            highlightExpectedKey();
          }
        } else {
          // Letra equivocada
          audio.playClick();
          if (feedback) feedback.textContent = `Busca la letra "${expectedChar}". ¡Mira cómo brilla en el teclado!`;
          highlightExpectedKey();
        }
      });
    });

    if (backspace) {
      backspace.addEventListener('click', () => {
        if (GameState.level3.currentIndex > 0) {
          GameState.level3.currentIndex--;
          const slot = slotsRow.children[GameState.level3.currentIndex];
          if (slot) {
            slot.textContent = '_';
            slot.classList.remove('filled');
          }
          audio.playClick();
          highlightExpectedKey();
        }
      });
    }

    // Botones de selección de palabras
    wordSelectors.forEach((btn) => {
      btn.addEventListener('click', () => {
        wordSelectors.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const word = btn.getAttribute('data-word');
        const icon = btn.getAttribute('data-icon');
        setupWord(word, icon);
        audio.playClick();
      });
    });

    // Iniciar con SOL
    setupWord('SOL', '☀️');
  }

  /* ==========================================================================
     9. NIVEL 4: EL ESTUDIO MUSICAL
     ========================================================================== */
  function initLevel4() {
    const instDrum = document.getElementById('btn-inst-drum');
    const instBell = document.getElementById('btn-inst-bell');
    const instPiano = document.getElementById('btn-inst-piano');
    const instClap = document.getElementById('btn-inst-clap');

    const btnPlayPause = document.getElementById('btn-video-play-pause');
    const playIcon = document.getElementById('video-ctrl-icon');
    const progressFill = document.getElementById('video-progress-fill');
    const timeLabel = document.getElementById('video-time-label');
    const bandMembers = document.querySelectorAll('.band-member');
    const btnFinishMusic = document.getElementById('btn-finish-music-level');

    // Instrumentos
    instDrum.addEventListener('click', () => {
      audio.playDrum();
      GameState.level4.instrumentsExplored.add('drum');
      instDrum.classList.add('playing');
      setTimeout(() => instDrum.classList.remove('playing'), 200);
    });

    instBell.addEventListener('click', () => {
      audio.playBell();
      GameState.level4.instrumentsExplored.add('bell');
      instBell.classList.add('playing');
      setTimeout(() => instBell.classList.remove('playing'), 200);
    });

    instPiano.addEventListener('click', () => {
      audio.playPiano();
      GameState.level4.instrumentsExplored.add('piano');
      instPiano.classList.add('playing');
      setTimeout(() => instPiano.classList.remove('playing'), 200);
    });

    instClap.addEventListener('click', () => {
      audio.playClap();
      GameState.level4.instrumentsExplored.add('clap');
      instClap.classList.add('playing');
      setTimeout(() => instClap.classList.remove('playing'), 200);
    });

    // Reproductor de Video
    function toggleVideo() {
      GameState.level4.isPlayingVideo = !GameState.level4.isPlayingVideo;
      if (GameState.level4.isPlayingVideo) {
        if (playIcon) playIcon.textContent = '⏸';
        bandMembers.forEach(m => m.classList.add('dancing'));
        audio.playBell();

        // Temporizador de avance de video
        GameState.level4.videoInterval = setInterval(() => {
          GameState.level4.videoProgress += 4;
          if (GameState.level4.videoProgress > 100) {
            GameState.level4.videoProgress = 0;
          }

          if (progressFill) progressFill.style.width = `${GameState.level4.videoProgress}%`;
          const seconds = Math.floor((GameState.level4.videoProgress / 100) * 15);
          if (timeLabel) timeLabel.textContent = `0:${seconds < 10 ? '0' : ''}${seconds}`;

          // Sonido de fondo cada 20%
          if (GameState.level4.videoProgress % 20 === 0) {
            audio.playPiano();
          }
        }, 300);
      } else {
        if (playIcon) playIcon.textContent = '▶';
        bandMembers.forEach(m => m.classList.remove('dancing'));
        if (GameState.level4.videoInterval) {
          clearInterval(GameState.level4.videoInterval);
        }
      }
    }

    if (btnPlayPause) {
      btnPlayPause.addEventListener('click', toggleVideo);
    }

    // Finalizar Nivel Musical
    if (btnFinishMusic) {
      btnFinishMusic.addEventListener('click', () => {
        completeLevel(4, '¡Qué divertido! El computador nos permite escuchar música maravillosa y reproducir videos.');
      });
    }
  }

  /* ==========================================================================
     10. NIVEL 5: EL PARQUE DE LOS RETOS
     ========================================================================== */
  function initLevel5() {
    const tabMemory = document.getElementById('btn-tab-memory');
    const tabDrag = document.getElementById('btn-tab-drag');
    const gameMemory = document.getElementById('game-mode-memory');
    const gameDrag = document.getElementById('game-mode-drag');

    // Pestañas
    tabMemory.addEventListener('click', () => {
      tabMemory.classList.add('active');
      tabDrag.classList.remove('active');
      gameMemory.classList.remove('hidden');
      gameDrag.classList.add('hidden');
      audio.playClick();
    });

    tabDrag.addEventListener('click', () => {
      tabDrag.classList.add('active');
      tabMemory.classList.remove('active');
      gameDrag.classList.remove('hidden');
      gameMemory.classList.add('hidden');
      audio.playClick();
    });

    // Reto A: Memoria de Parejas
    const memCards = document.querySelectorAll('.mem-card');
    const memSuccess = document.getElementById('memory-success-banner');

    memCards.forEach((card) => {
      card.addEventListener('click', () => {
        if (card.classList.contains('flipped') || GameState.level5.memoryFlipped.length >= 2) {
          return;
        }

        card.classList.add('flipped');
        audio.playClick();
        GameState.level5.memoryFlipped.push(card);

        if (GameState.level5.memoryFlipped.length === 2) {
          const [card1, card2] = GameState.level5.memoryFlipped;
          const type1 = card1.getAttribute('data-card');
          const type2 = card2.getAttribute('data-card');

          if (type1 === type2) {
            // Pareja encontrada
            audio.playSuccess();
            GameState.level5.memoryMatched += 2;
            GameState.level5.memoryFlipped = [];

            if (GameState.level5.memoryMatched >= memCards.length) {
              if (memSuccess) memSuccess.classList.remove('hidden');
              completeLevel(5, '¡Excelente! Con el computador también podemos jugar, ejercitar la memoria y aprender.');
            }
          } else {
            // No coinciden
            setTimeout(() => {
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              GameState.level5.memoryFlipped = [];
            }, 900);
          }
        }
      });
    });

    // Reto B: Arrastrar a su Lugar (Drag & Drop + Clic accesible para niños)
    const draggables = document.querySelectorAll('.draggable-item');
    const dropzones = document.querySelectorAll('.drop-zone');
    const dragSuccess = document.getElementById('drag-success-banner');

    let draggedElement = null;
    let selectedForMove = null;

    // Drag HTML5 clásico
    draggables.forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        draggedElement = item;
        item.classList.add('dragging');
        e.dataTransfer.setData('text/plain', item.getAttribute('data-target'));
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedElement = null;
      });

      // Accesibilidad para niños de 6 años: Clic para seleccionar
      item.addEventListener('click', () => {
        draggables.forEach(d => d.style.borderColor = '');
        selectedForMove = item;
        item.style.borderColor = '#ff4757';
        audio.playClick();
      });
    });

    dropzones.forEach((zone) => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('zone-hover');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('zone-hover');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('zone-hover');
        const targetType = e.dataTransfer.getData('text/plain');
        checkDropMatch(targetType, zone, draggedElement);
      });

      // Clic para soltar el elemento seleccionado
      zone.addEventListener('click', () => {
        if (selectedForMove) {
          const targetType = selectedForMove.getAttribute('data-target');
          checkDropMatch(targetType, zone, selectedForMove);
          selectedForMove = null;
        }
      });
    });

    function checkDropMatch(targetType, zone, element) {
      const accepted = zone.getAttribute('data-accept');
      if (targetType === accepted) {
        audio.playSuccess();
        zone.classList.add('zone-matched');
        if (element) {
          element.style.display = 'none';
        }
        GameState.level5.dragMatches++;

        if (GameState.level5.dragMatches >= 3) {
          if (dragSuccess) dragSuccess.classList.remove('hidden');
          completeLevel(5, '¡Fantástico! Con el computador podemos mover objetos, jugar y organizar cosas.');
        }
      } else {
        audio.playClick();
        showHelpModal('¡Mira bien a dónde pertenece cada objeto! El pajarito va al nido, la llave al cofre y el pincel al caballete.');
      }
    }
  }

  /* ==========================================================================
     11. NIVEL 6: LA CASA DE LOS ABRAZOS
     ========================================================================== */
  function initLevel6() {
    const btnStartCall = document.getElementById('btn-start-call');
    const stepStart = document.getElementById('call-step-start');
    const stepActive = document.getElementById('call-step-active');

    const btnWave = document.getElementById('btn-send-wave');
    const btnHug = document.getElementById('btn-send-hug');
    const btnMsg = document.getElementById('btn-send-message');
    const btnFinishCall = document.getElementById('btn-finish-call');
    const speech = document.getElementById('grandparents-speech');
    const flyingHearts = document.getElementById('flying-hearts');

    if (btnStartCall) {
      btnStartCall.addEventListener('click', () => {
        audio.playPhoneRing();
        stepStart.classList.add('hidden');
        stepActive.classList.remove('hidden');
        audio.playSuccess();
      });
    }

    if (btnWave) {
      btnWave.addEventListener('click', () => {
        audio.playClick();
        if (speech) speech.textContent = '👵👴 "¡Hola Mousecito! ¡Te vemos clarito por la pantalla!"';
        createFloatingHeart('👋');
      });
    }

    if (btnHug) {
      btnHug.addEventListener('click', () => {
        audio.playBell();
        if (speech) speech.textContent = '👵👴 "¡Qué abrazo tan calientito nos llegó por el computador!"';
        createFloatingHeart('💖');
        createFloatingHeart('✨');
      });
    }

    if (btnMsg) {
      btnMsg.addEventListener('click', () => {
        audio.playPiano();
        if (speech) speech.textContent = '👵👴 "¡Nosotros también te amamos con todo el corazón, explorador!"';
        createFloatingHeart('💌');
      });
    }

    function createFloatingHeart(emoji) {
      if (!flyingHearts) return;
      const heart = document.createElement('span');
      heart.textContent = emoji;
      heart.style.position = 'absolute';
      heart.style.fontSize = '32px';
      heart.style.left = `${Math.random() * 80 + 10}%`;
      heart.style.bottom = '20px';
      heart.style.animation = 'heroBreathing 1.5s ease-out forwards';
      flyingHearts.appendChild(heart);
      setTimeout(() => heart.remove(), 1600);
    }

    if (btnFinishCall) {
      btnFinishCall.addEventListener('click', () => {
        completeLevel(6, '¡Qué emocionante! Con el computador podemos comunicarnos y sentirnos cerquita de quienes queremos.');
      });
    }
  }

  /* ==========================================================================
     12. GRAN RETO FINAL: LA PLAZA CENTRAL
     ========================================================================== */
  function initFinalChallenge() {
    const citizens = document.querySelectorAll('.citizen-card');
    const places = document.querySelectorAll('.place-target-card');
    const counter = document.getElementById('final-matches-count');

    // Selección de habitante
    citizens.forEach((cit) => {
      cit.addEventListener('click', () => {
        citizens.forEach(c => c.classList.remove('selected'));
        cit.classList.add('selected');
        GameState.finalChallenge.selectedCitizen = cit;
        audio.playClick();
      });
    });

    // Emparejar con lugar del computador
    places.forEach((place) => {
      place.addEventListener('click', () => {
        const selected = GameState.finalChallenge.selectedCitizen;
        if (!selected) {
          showHelpModal('¡Primero toca a un habitante en la izquierda y luego toca el lugar que le puede ayudar!');
          return;
        }

        const citizenNeed = selected.getAttribute('data-need');
        const placeMatch = place.getAttribute('data-match');

        if (citizenNeed === placeMatch) {
          // Acierto
          audio.playSuccess();
          selected.classList.add('matched');
          selected.classList.remove('selected');
          place.classList.add('matched');
          GameState.finalChallenge.selectedCitizen = null;

          GameState.finalChallenge.matchesCount++;
          if (counter) counter.textContent = GameState.finalChallenge.matchesCount;

          if (GameState.finalChallenge.matchesCount >= 6) {
            setTimeout(triggerGrandCelebration, 800);
          }
        } else {
          // Fallo comprensivo
          audio.playClick();
          showHelpModal('¡Casi! Piensa bien qué necesita esa persona. Por ejemplo: para pintar vamos al Taller de Colores.');
        }
      });
    });
  }

  function triggerGrandCelebration() {
    audio.playFanfare();
    confetti.burst(120);
    showScreen('screen-celebration');
  }

  /* ==========================================================================
     13. MODALES DE AYUDA Y RESUMEN PEDAGÓGICO
     ========================================================================== */
  function showHelpModal(message) {
    const modal = document.getElementById('modal-help');
    const text = document.getElementById('help-modal-text');
    if (modal && text) {
      text.textContent = message || GameState.activeHelpHint || '¡Toca los objetos brillantes para jugar!';
      modal.classList.remove('hidden');
    }
  }

  function initModals() {
    // Modal Ayuda
    const helpModal = document.getElementById('modal-help');
    const btnHelpClose = document.getElementById('btn-close-help');
    const btnHelpOk = document.getElementById('btn-help-ok');
    const btnHudHelp = document.getElementById('btn-hud-help');

    if (btnHudHelp) {
      btnHudHelp.addEventListener('click', () => {
        audio.playClick();
        showHelpModal();
      });
    }

    [btnHelpClose, btnHelpOk].forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (helpModal) helpModal.classList.add('hidden');
          audio.playClick();
        });
      }
    });

    // Modal Resumen "Lo que Aprendimos"
    const summaryModal = document.getElementById('modal-summary');
    const btnSummaryClose = document.getElementById('btn-close-summary');
    const btnSummaryBottom = document.getElementById('btn-summary-close-bottom');
    const btnVictorySummary = document.getElementById('btn-victory-summary');

    if (btnVictorySummary) {
      btnVictorySummary.addEventListener('click', () => {
        if (summaryModal) summaryModal.classList.remove('hidden');
        audio.playClick();
      });
    }

    [btnSummaryClose, btnSummaryBottom].forEach((btn) => {
      if (btn) {
        btn.addEventListener('click', () => {
          if (summaryModal) summaryModal.classList.add('hidden');
          audio.playClick();
        });
      }
    });
  }

  /* ==========================================================================
     14. BOTONES GLOBALES Y REINICIO DE PARTIDA
     ========================================================================== */
  function initGlobalControls() {
    // Comenzar Aventura desde Portada
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        audio.playClick();
        showScreen('screen-map');
      });
    }

    // Botón Volver al Mapa desde HUD
    const btnHudMap = document.getElementById('btn-hud-map');
    if (btnHudMap) {
      btnHudMap.addEventListener('click', () => {
        showScreen('screen-map');
      });
    }

    // Control de Sonido Global
    const btnHudSound = document.getElementById('btn-hud-sound');
    const btnTitleSound = document.getElementById('btn-title-sound');
    const soundIcon = document.getElementById('hud-sound-icon');
    const soundLabel = document.getElementById('title-sound-label');

    function toggleSoundGlobal() {
      const isSoundOn = audio.toggleMute();
      if (soundIcon) soundIcon.textContent = isSoundOn ? '🔊' : '🔇';
      if (soundLabel) soundLabel.textContent = isSoundOn ? 'Activado' : 'Silenciado';
    }

    if (btnHudSound) btnHudSound.addEventListener('click', toggleSoundGlobal);
    if (btnTitleSound) btnTitleSound.addEventListener('click', toggleSoundGlobal);

    // Reiniciar Partida
    const btnReset = document.getElementById('btn-reset-progress');
    const btnVictoryRestart = document.getElementById('btn-victory-restart');
    const btnVictoryMap = document.getElementById('btn-victory-map');

    function resetGame() {
      GameState.unlockedLevels = [1];
      GameState.completedLevels.clear();
      GameState.finalChallenge.matchesCount = 0;
      updateMapNodes();
      updateHUD(1);
      showScreen('screen-title');
      audio.playClick();
    }

    if (btnReset) btnReset.addEventListener('click', resetGame);
    if (btnVictoryRestart) btnVictoryRestart.addEventListener('click', resetGame);
    if (btnVictoryMap) {
      btnVictoryMap.addEventListener('click', () => {
        showScreen('screen-map');
      });
    }
  }

  /* ==========================================================================
     15. ARRANQUE DEL JUEGO
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initGlobalControls();
    initMapNavigation();
    initModals();
    initLevel1();
    initLevel2();
    initLevel3();
    initLevel4();
    initLevel5();
    initLevel6();
    initFinalChallenge();

    updateMapNodes();
    showScreen('screen-title');
  });

})();
